#!/usr/bin/env bash
# 参考動画を分析する: メタ情報 / カット検出 / コマ切り出し / 一覧画像 / スペクトログラム / 文字起こし
# 使い方: ./analyze_reference.sh <動画ファイル> [出力先ディレクトリ]
set -euo pipefail

IN="$1"
OUT="${2:-./ref_analysis/$(basename "${IN%.*}")}"
mkdir -p "$OUT/frames"

echo "== メタ情報"
ffprobe -v error -show_entries format=duration:stream=codec_type,width,height,r_frame_rate -of default=nw=1 "$IN" | tee "$OUT/meta.txt"

echo "== カット検出（秒）"
ffmpeg -v info -i "$IN" -vf "select='gt(scene,0.25)',showinfo" -f null - 2>&1 \
  | grep -o "pts_time:[0-9.]*" | cut -d: -f2 | tee "$OUT/cuts.txt"

echo "== コマ切り出し（4fps）と一覧画像"
ffmpeg -v error -y -i "$IN" -vf "fps=4,scale=360:-2" "$OUT/frames/%03d.jpg"
N=$(ls "$OUT/frames" | wc -l)
for ((s=1; s<=N; s+=16)); do
  ffmpeg -v error -y -start_number "$s" -i "$OUT/frames/%03d.jpg" -vf "tile=8x2" -frames:v 1 "$OUT/sheet_$(printf %03d "$s").jpg"
done

echo "== 音声"
ffmpeg -i "$IN" -vn -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume" | tee "$OUT/volume.txt" || true
ffmpeg -v error -y -i "$IN" -lavfi "showspectrumpic=s=1600x500:legend=1:scale=log:fscale=log" "$OUT/spectrogram.png" || true

echo "== 文字起こし（faster-whisper）"
ffmpeg -v error -y -i "$IN" -vn -ac 1 -ar 16000 "$OUT/audio.wav"
if python3 -c "import faster_whisper" 2>/dev/null || pip install -q faster-whisper; then
  python3 - "$OUT/audio.wav" "$OUT/transcript.txt" <<'PY' || echo "文字起こし失敗（上のエラーを確認。モデルのダウンロードがネットワーク設定でブロックされている可能性もあり）"
import sys, wave
import numpy as np
from faster_whisper import WhisperModel
# PyAV のバージョン差で decode_audio が落ちることがあるので、16kHz mono wav を自前で読んで配列で渡す
with wave.open(sys.argv[1]) as w:
    audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
model = WhisperModel("small", device="cpu", compute_type="int8")
segments, info = model.transcribe(audio, language="ja", vad_filter=True)
with open(sys.argv[2], "w") as f:
    for s in segments:
        line = f"[{s.start:6.2f} - {s.end:6.2f}] {s.text.strip()}"
        print(line)
        f.write(line + "\n")
PY
fi

echo "== 完了: $OUT"
