# 確認用ページ向けの書き換え（scripts/build-preview.sh から呼ばれる）
# claude.ai の限定公開ページ用に、絶対パスを相対パスへ書き換え、CSSを各ページに埋め込む
import os, re, sys
root = sys.argv[1]
css = {}
for dp, _, fs in os.walk(root):
    for f in fs:
        if f.endswith('.css'):
            css['/' + os.path.relpath(os.path.join(dp, f), root)] = open(os.path.join(dp, f)).read()

def rel(prefix, url):
    path = url.split('#')[0].split('?')[0]
    out = prefix + path.lstrip('/')
    if path.endswith('/') or path == '':
        out += 'index.html'
    return out or 'index.html'

for dp, _, fs in os.walk(root):
    for f in fs:
        if not f.endswith('.html'):
            continue
        p = os.path.join(dp, f)
        depth = os.path.relpath(dp, root).count(os.sep) + (0 if os.path.relpath(dp, root) == '.' else 1)
        prefix = '../' * depth
        h = open(p).read()
        h = re.sub(r'<link rel="stylesheet" href="(/_astro/[^"]+\.css)">', lambda m: '<style>' + css[m.group(1)] + '</style>', h)
        h = re.sub(r'(href|src)="(/[^"/][^"]*|/)"', lambda m: f'{m.group(1)}="{rel(prefix, m.group(2))}"', h)
        h = re.sub(r'srcset="([^"]+)"', lambda m: 'srcset="' + m.group(1).replace('/_astro/', prefix + '_astro/') + '"', h)
        if p == os.path.join(root, 'index.html'):
            # 先頭ページは公開時に枠で包まれるので、html/head/body のタグを外す
            h = re.sub(r'<!DOCTYPE html>|<!doctype html>|</?html[^>]*>|</?head>|</?body>', '', h)
            h = h.replace("document.documentElement.dataset.palette", "document.documentElement.dataset.palette")
        open(p, 'w').write(h)
for k in css:
    os.remove(os.path.join(root, k.lstrip('/')))
print('ok')
