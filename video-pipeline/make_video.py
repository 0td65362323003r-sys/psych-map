#!/usr/bin/env python3
"""台本（YAML）と素材（写真・短い動画）から Instagram リール用の縦型動画を作る。

使い方:
  python3 make_video.py <project.yaml> [--media 素材フォルダ] [--out 出力ファイル]

- 出力: 1080x1920 / 30fps / H.264 高ビットレート / 無音トラック付き（BGMは Instagram アプリで付ける）
- iPhone の HDR（HLG/PQ）動画は自動で SDR に変換する（そのままだと Instagram で白飛び・色あせする）
- ズーム・パンは 2倍に拡大してから動かし、最後に縮小する（ガタつき防止）
- テロップは ASS 字幕で焼き込む。スタイルは gothic（白太字ゴシック＋黒縁）/ mincho（白明朝＋影）
"""
import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

import yaml

W, H, FPS = 1080, 1920, 30
SS = 2  # 動きをつけるときの拡大倍率
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".heic", ".webp"}

# 参考動画1本目: 白太字ゴシック＋黒縁、上から3〜4割 / 2本目: 白明朝＋影、上から約半分
STYLES = {
    "gothic": dict(font="Noto Sans CJK JP Black", size=84, outline=7, shadow=0, y=0.36),
    "mincho": dict(font="Noto Serif CJK JP", size=66, outline=0, shadow=4, y=0.47, bold=True),
}

MOVES = {  # (開始ズーム, 終了ズーム, 横位置 開始→終了 0=左端 1=右端)
    "none": (1.0, 1.0, 0.5, 0.5),
    "zoom_in": (1.0, 1.08, 0.5, 0.5),
    "zoom_out": (1.08, 1.0, 0.5, 0.5),
    "pan_left": (1.10, 1.10, 0.8, 0.2),
    "pan_right": (1.10, 1.10, 0.2, 0.8),
}


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"失敗: {' '.join(map(str, cmd))}\n{r.stderr[-3000:]}")
    return r.stdout


def is_hdr(path):
    out = run(["ffprobe", "-v", "error", "-select_streams", "v:0",
               "-show_entries", "stream=color_transfer", "-of", "json", str(path)])
    streams = json.loads(out).get("streams", [])
    return bool(streams) and streams[0].get("color_transfer") in ("arib-std-b67", "smpte2084")


def cut_filter(dur, move, hdr):
    z0, z1, x0, x1 = MOVES[move]
    frames = max(1, round(dur * FPS))
    p = f"min(n/{frames - 1 if frames > 1 else 1},1)"  # 0→1 の進み具合
    f = []
    if hdr:
        # npl=203（HDRの基準白）＋hable が肉の霜降りやビールの色を一番自然に残した（mobius は赤が飽和した）
        f.append("zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,"
                 "tonemap=tonemap=hable:desat=2,zscale=t=bt709:m=bt709:r=tv,format=yuv420p")
    f += [
        f"fps={FPS}",
        # 画面いっぱいに拡大して中央で切り抜き（2倍サイズ）
        f"scale={W*SS}:{H*SS}:force_original_aspect_ratio=increase:flags=lanczos",
        f"crop={W*SS}:{H*SS}",
    ]
    if move != "none":
        z = f"({z0}+({z1}-{z0})*{p})"
        f += [
            f"scale=w='trunc({W*SS}*{z}/2)*2':h='trunc({H*SS}*{z}/2)*2':eval=frame:flags=bicubic",
            f"crop={W*SS}:{H*SS}:x='(iw-ow)*({x0}+({x1}-{x0})*{p})':y='(ih-oh)/2'",
        ]
    f += [f"scale={W}:{H}:flags=lanczos", "setsar=1", "format=yuv420p"]
    return ",".join(f)


def normalize_photo(src, dst):
    """iPhone の写真を ffmpeg で扱える形にする。HEIC を読み、EXIF の回転を反映（ffmpeg は無視して横倒しになる）"""
    from PIL import Image, ImageOps
    try:
        import pillow_heif
        pillow_heif.register_heif_opener()
    except ImportError:
        if src.suffix.lower() == ".heic":
            sys.exit("HEIC を読むには pip install pillow-heif が必要")
    with Image.open(src) as im:
        ImageOps.exif_transpose(im).convert("RGB").save(dst)
    return dst


def render_cut(i, cut, media, tmp):
    src = media / cut["src"]
    if not src.exists():
        sys.exit(f"素材が見つからない: {src}")
    dur = float(cut["dur"])
    move = cut.get("move", "zoom_in")
    if move not in MOVES:
        sys.exit(f"move は {list(MOVES)} のどれか: {move}")
    out = tmp / f"cut_{i:03d}.mp4"
    if src.suffix.lower() in IMAGE_EXT:
        src = normalize_photo(src, tmp / f"photo_{i:03d}.png")
        inp = ["-loop", "1", "-framerate", str(FPS), "-t", f"{dur}", "-i", str(src)]
    else:
        inp = ["-ss", f"{float(cut.get('start', 0))}", "-t", f"{dur}", "-i", str(src)]
    run(["ffmpeg", "-v", "error", "-y", *inp,
         "-vf", cut_filter(dur, move, is_hdr(src)),
         "-frames:v", str(round(dur * FPS)), "-an",
         "-c:v", "libx264", "-preset", "medium", "-crf", "12", str(out)])
    return out


def ass_time(t):
    cs = round(t * 100)
    return f"{cs // 360000}:{cs // 6000 % 60:02d}:{cs // 100 % 60:02d}.{cs % 100:02d}"


def write_ass(cuts, style_name, path):
    s = STYLES[style_name]
    margin_v = round(H * s["y"])  # Alignment=8（上中央）で上からの位置を指定
    lines = [
        "[Script Info]", "ScriptType: v4.00+", f"PlayResX: {W}", f"PlayResY: {H}",
        "WrapStyle: 2", "",
        "[V4+ Styles]",
        "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, "
        "Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, "
        "Alignment, MarginL, MarginR, MarginV, Encoding",
        f"Style: T,{s['font']},{s['size']},&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,"
        f"{-1 if s.get('bold') else 0},0,0,0,100,100,2,0,1,{s['outline']},{s['shadow']},8,60,60,{margin_v},1",
        "", "[Events]",
        "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    ]
    t = 0.0
    for c in cuts:
        d = float(c["dur"])
        if c.get("text"):
            text = str(c["text"]).replace("\n", "\\N")
            lines.append(f"Dialogue: 0,{ass_time(t)},{ass_time(t + d)},T,,0,0,0,,{text}")
        t += d
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return t


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--media", help="素材フォルダ（省略時は project.yaml の media_dir、なければ yaml と同じ場所）")
    ap.add_argument("--out")
    a = ap.parse_args()

    proj_path = Path(a.project).resolve()
    proj = yaml.safe_load(proj_path.read_text(encoding="utf-8"))
    media = Path(a.media or proj.get("media_dir") or proj_path.parent).expanduser().resolve()
    out = Path(a.out or proj.get("output") or proj_path.with_suffix(".mp4")).resolve()
    style = proj.get("style", "gothic")
    if style not in STYLES:
        sys.exit(f"style は {list(STYLES)} のどれか: {style}")
    cuts = proj["cuts"]

    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        parts = []
        for i, c in enumerate(cuts):
            print(f"[{i + 1}/{len(cuts)}] {c['src']} {c.get('start', 0)}s +{c['dur']}s  {c.get('text', '')!r}")
            parts.append(render_cut(i, c, media, tmp))
        (tmp / "list.txt").write_text("".join(f"file '{p}'\n" for p in parts))
        run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(tmp / "list.txt"),
             "-c", "copy", str(tmp / "timeline.mp4")])
        total = write_ass(cuts, style, tmp / "telop.ass")
        run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp / "timeline.mp4"),
             "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
             "-vf", f"ass={tmp / 'telop.ass'}",
             "-map", "0:v", "-map", "1:a", "-t", f"{total}",
             "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-profile:v", "high", "-level", "4.2",
             "-pix_fmt", "yuv420p", "-r", str(FPS),
             "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
             "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", str(out)])
    print(f"完了: {out}（{total:.1f}秒）")


if __name__ == "__main__":
    main()
