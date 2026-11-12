#!/usr/bin/env bash
# claude.ai の確認用ページ（Artifact）に載せるための書き出し
# 使い方: scripts/build-preview.sh <出力先フォルダ>
# - 絶対パスのリンクを相対パスにし、CSSを各ページに埋め込む
# - Artifact では "_" で始まるフォルダ名が使えないので _astro を assets に変える
set -euo pipefail
out="${1:?出力先フォルダを指定してください}"
cd "$(dirname "$0")/.."
npx astro build >/dev/null
rm -rf "$out"
cp -r dist "$out"
rm -f "$out"/sitemap*.xml "$out"/robots.txt
python3 -I scripts/relink.py "$out" >/dev/null
mv "$out/_astro" "$out/assets"
find "$out" -name '*.html' -exec sed -i 's#_astro/#assets/#g' {} +
echo "書き出しました: $out"
