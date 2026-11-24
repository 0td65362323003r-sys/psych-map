// 日本語の改行位置をそろえる。
// iPhoneのSafariは「言葉の切れ目で改行する」CSS（word-break: auto-phrase）に対応していないため、
// ビルド時に BudouX（Chromeと同じ仕組み）で文節に分け、文節の途中では改行しないようにする。
import { loadDefaultJapaneseParser } from 'budoux';
import { parseHTML } from 'linkedom';

const parser = loadDefaultJapaneseParser();
// 行頭に来てはいけない文字・行末に来てはいけない文字
const NO_BEFORE = /^[、。，．・）」』”！？〜ー々ぁぃぅぇぉっゃゅょ]/;
const NO_AFTER = /[（「『“]$/;
const JA = /[぀-ヿ一-鿿]/;
// 文節に分ける要素（ナビやフォームの選択肢には使わない）
const TARGETS = 'h1, h2, h3, p, dd, dt, li, blockquote, figcaption, .btn';

export function phrases(text: string): string[] {
  const out: string[] = [];
  for (const p of parser.parse(text)) {
    const prev = out.at(-1);
    const joinPrev =
      prev !== undefined &&
      (NO_BEFORE.test(p) || NO_AFTER.test(prev) || (/[」』）]$/.test(prev) && /^[ぁ-ん]/.test(p)) || /^(いった|いう)/.test(p));
    if (joinPrev) out[out.length - 1] += p;
    else out.push(p);
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
        // 長すぎる文節は包まない（狭い画面ではみ出さないように）
        if (p.length > 14 || !JA.test(p)) {
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
