# 要約トピックを「同じidのまま原文全文で上書き」するルール(全エージェント共通)

## 目的
ナレッジ(MCP: mcp__1656f16b-f369-4403-b9ae-bab0645c7bc6__*)には、要約・抜粋・言い換えしか入っていないトピックがある。ユーザーの指示は「新しいトピックを増やすな。今あるトピックの中身を原文全文にしろ。リンクは不要(元データが消えたら使えない)。全文を一か所(ナレッジ)にまとめろ」。確認不要・自動実行。

## ツール
ToolSearch で読み込む:
- "select:mcp__1656f16b-f369-4403-b9ae-bab0645c7bc6__add_knowledge,mcp__1656f16b-f369-4403-b9ae-bab0645c7bc6__get_knowledge,mcp__1656f16b-f369-4403-b9ae-bab0645c7bc6__list_knowledge"
- "select:mcp__Google_Drive__search_files,mcp__Google_Drive__read_file_content,mcp__Google_Drive__get_file_metadata"
- "select:mcp__Notion__notion-search,mcp__Notion__notion-fetch"
参考資料(このフォルダ docs/knowledge-migration/):
- pending.md(未処理トピック一覧)

## 手順(担当トピックごと)
1. get_knowledge で現在の中身(name, category, source_type, items, 出典)を確認。
2. 原文の在りかを決める。優先順:
   a. ナレッジ内に同じ原本の全文トピック(id が -full / -full-N で終わるもの、kougi-20XX-NN-full 等)がある → get_knowledge でその本文を取得し、担当トピックが扱う箇所(節・範囲)を**そのまま**切り出す。
   b. map_*.tsv の fileId/pageId → read_file_content / notion-fetch で原本を読む。
   c. 無ければ search_files(fullText contains '特徴的な語句')・notion-search で探す。
3. 担当トピックが扱う範囲(出典の該当節。トピックが原本全体の要約なら原本全体)の原文を、**語彙・言い回し・語尾・誤字を一切変えずに**転記する。要約・言い換え・並べ替え・「〜など」での省略は禁止。書き起こしの改行つなぎ、`**`・バックスラッシュ・文字化け絵文字の除去だけは可。
4. add_knowledge を overwrite=true で呼び、**同じ id** に上書きする(新しい id は作らない)。
   - id: 既存と同じ / name: 既存の name の末尾に「【原文全文】」を付ける(既に付いていればそのまま)
   - category: 既存と同じ / source_type: 原文の出所に合わせる(本人の一次資料=本人、他者=外部、AIの清書文=AI生成)
   - summary: 1〜2文の概要 +「原本: <Drive/Notion のファイル名>」。URLやリンクは書かない。
   - items: 原文を見出し/段落単位で分割。1 item あたり 15,000 字以内目安。source に「Google Drive『ファイル名』§見出し」等。
   - items は普通の JSON 配列で渡す(文字列化したJSONは不可)。PLACEHOLDER 等の仮文字列は絶対に入れない。
5. add_knowledge は**1回ずつ順番に**呼ぶ(同時に複数呼ばない)。

## 省略(本文から外し、その位置に〔省略: 理由〕と書く。それ以外は全部残す)
- 性的に露骨な描写・セリフ
- 実在の第三者を特定しうる個人情報(実名・連絡先・勤務先)
- 相手の弱さ(自己肯定感の低さ・トラウマ等)を狙う話、不安・恐怖を煽って誘いを通す話、拒否を押し切る話
- 「支配」「飼いならす」「服従」「依存させる」など支配・依存づくりの推奨、威嚇
- 詐欺・なりすまし
原本の中心テーマ自体が上記(おおむね3割超)なら上書きせず「要約のまま維持」として報告。

## 上書きしないケース
- 原本がどこにも見つからない(Drive/Notion/ナレッジ内の全文トピックすべて) → 触らずに「未発見」と報告(何で検索したかも)。
- 原本が画像・音声のみで本文が取れない → 触らずに報告。

## 最終返信(短く)
- 上書きした id 一覧(原本名・item数・省略箇所数)
- 未発見 / 要約のまま維持 の id と理由
本文の引用はしない。
