// 日本語の改行位置をそろえる。
// iPhoneのSafariは「言葉の切れ目で改行する」CSS（word-break: auto-phrase）に対応していないため、
// ビルド時に BudouX（Chromeと同じ仕組み）で文節に分け、文節の途中では改行しないようにする。
import { loadDefaultJapaneseParser } from 'budoux';
import { parseHTML } from 'linkedom';

const parser = loadDefaultJapaneseParser();
// 行頭に来てはいけない文字・行末に来てはいけない文字（U+2060 は「1⁠か⁠月」をつなぐ記号）
const NO_BEFORE = /^[、。，．・）」』”！？〜ー々ぁぃぅぇぉっゃゅょ⁠]/;
const NO_AFTER = /[（「『“⁠]$/;
const JA = /[぀-ヿ一-鿿]/;
// 文節に分ける要素（ナビやフォームの選択肢には使わない）
const TARGETS = 'h1, h2, h3, p, dd, dt, li, blockquote, figcaption, .btn';
// おおよその幅（全角1、半角0.55）。20を超える文節は狭い画面に収まらないので、改行できるままにする
const est = (s: string) => [...s].reduce((n, c) => n + (/[\x20-\x7e ]/.test(c) ? 0.55 : 1), 0);

export function phrases(text: string): string[] {
  const out: string[] = [];
  // 半角スペースは改行してよい位置としてそのまま残し、それ以外を BudouX に渡す
  for (const chunk of text.split(/( +)/)) {
    if (!chunk) continue;
    const parts = /^ +$/.test(chunk) ? [chunk] : parser.parse(chunk);
    for (const part of parts) {
      if (/^ +$/.test(part)) {
        out.push(part);
        continue;
      }
      // 長い文節は、『』の後のカタカナの前、「兼」の後、括弧の前後でさらに分ける
      const subs = est(part) > 20 ? part.split(/(?<=』)(?=[ァ-ヿ])|(?<=兼)|(?=（)|(?<=）)/) : [part];
      for (const p of subs) {
        const prev = out.at(-1);
        const joinPrev =
          prev !== undefined &&
          !/ $/.test(prev) &&
          (NO_BEFORE.test(p) ||
            NO_AFTER.test(prev) ||
            (/[」』）]$/.test(prev) && /^[ぁ-ん]/.test(p)) ||
            /^(いった|いう)/.test(p) ||
            (/[A-Za-z0-9]$/.test(prev) && /^(にて|で|に|の|を|が|は|と|へ)/.test(p)));
        if (joinPrev) out[out.length - 1] += p;
        else out.push(p);
      }
    }
  }
  return out;
}

export function phraseHTML(html: string): string {
  const { document } = parseHTML(html);
  if (document.documentElement.getAttribute('lang') !== 'ja') return html;
  for (const el of document.querySelectorAll(TARGETS)) {
    const walker: Node[] = [];
    const collect = (n: Node) => {
      for (const c of [...n.childNodes]) {
        if (c.nodeType === 3) walker.push(c);
        else if (c.nodeType === 1 && !['SCRIPT', 'STYLE', 'SVG'].includes((c as Element).tagName) && !(c as Element).classList.contains('ph')) collect(c);
      }
    };
    collect(el);
    for (const t of walker) {
      const text = t.textContent ?? '';
      if (!JA.test(text)) continue;
      const frag = document.createDocumentFragment();
      for (const p of phrases(text)) {
        // スペースと、幅が広すぎる文節は包まない（狭い画面ではみ出さないように）
        if (/^ +$/.test(p) || est(p) > 20) {
          frag.appendChild(document.createTextNode(p));
        } else {
          const span = document.createElement('span');
          span.className = 'ph';
          span.textContent = p;
          frag.appendChild(span);
        }
      }
      t.parentNode!.replaceChild(frag, t);
    }
  }
  return '<!doctype html>' + document.documentElement.outerHTML;
}
