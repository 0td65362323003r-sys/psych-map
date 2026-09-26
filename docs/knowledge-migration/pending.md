# ナレッジ全文化:引き継ぎメモ(2026-09-26 時点)

ナレッジ = MCP `mcp__1656f16b-f369-4403-b9ae-bab0645c7bc6__*`(全284件)。

## ユーザーの指示(厳守)
- 新しいトピックを増やさない。要約しか入っていない既存トピックを、**同じidのまま原文全文で上書き**する(`add_knowledge` の `overwrite=true`)。
- リンク・索引は不要。元データが消えても使えるよう、全文をナレッジ内に置く。
- 確認は取らずに最後まで進める。必要な情報があれば最初に一度だけまとめて聞く。
- 手順と省略ルールは `overwrite_rules.md` のとおり。
- 原文がすでにナレッジ内の別の全文トピック(`-full`)にある場合は、写さない(重複になるだけ)。

## 完了済み
- 全文で上書き済み:24件
- 全文が既存の全文トピックにあるため対応不要:55件
- 要約のまま維持(中心テーマが依存づくり・性的な内容):`aite-fuan-izon-shinri`, `samuhara-content-gpt-babao-tips-summary`, `gaibu-kinsura-netonan-senryaku`
- リンク索引5件(`genpon-link-index-*`, `drive-mihanei-*`)は中身を空にした
- `group-session-full-3` の第三者の実名・勤務先は伏せた

## 未処理:原本が見つからなかった100件
接続中の Google Drive / Notion を検索しても原本がなかった。Notion を別ワークスペース(「スザク／suzaku 恋愛コンサル」系ページがある方)に繋ぎ直したら、下記を順に探して上書きする。各トピックの現在の中身(要約)は `get_knowledge` で見られるので、特徴的な語句を拾って検索する。

### Notion発掘(suzaku恋愛コンサル体系 1〜6)53件
miseikata-tani-hook-riron, kudoki-omoroi-hanashi-tanin, henshin-speed-pacing, app-line-ikou-jouhoushuushuu, kansatsugan-training-3step, shikou-kouzouka-memory-tree, nagare-no-hanashi-ghq, kakuage-kankaku-sotai-hyouka, kotoba-reframing-hyou, kudoki-talk-shitsumon-flow-design, kikiga-kiku-hito-kotsu, manin-densha-mote-kankyo, profiling-6step-grouping, koudou-dekiru-dekinai-chigai, gentensugi-kasan-senryaku, gap-enshutsu-chuuiten, kyorokyoro-taiou-anshin-talk, shoshinsha-app-screening, yuuki-jishin-kotowarareta-taisaku, sabetsuka-dokujitaiken-hasshin, aite-zokusei-kaiji-level, fukabori-kudoki-furikaeri-mental, kiroku-kansatsu-tanpen-kaku, gensoku-dampen-ichiwari-esukoto-kaiwa, keep-kankei-uwaki-gigi-taiou, kokuhaku-tsumerareta-kaihi,
seiheki-sm-shitsumon-talk, shotaimen-icebreak-jikokaiji-anchor, ninchi-nai-aru-kankaku, kyoumizuke-2kaime-date-kadai, jikokaiji-copywriting-episode-shitate, ijiri-kansai-nori-kudoki, method-genryu-fudousan-joushi, mise-erabi-douzen-senryaku, kageki-katei-shitsumon-daisansha, toukare-goukon-sexgo-kankeisei, shinri-block-koudouka-mind, kaiwa-ma-umekata-wadai-sentaku, app-betsu-tameguchi-keigo, shitsumon-kaiwa-shudouken, shuudan-nomikai-shudouken, over-reaction-kuuki-zukuri, shadowing-warai-training, shigeki-antei-type-mikiwame, profiling-denwa-senryaku-kachikan-talk, kyokan-ondokan-gutaisei-training, josei-uke-shumi-date-taiken, josei-shihai-yokkyuu-memo-chuui, naritai-jibun-mokuhyo-memo, shitsumon-bank-tanpatsu-suzaku, episode-talk-mochineta-cancun, renraku-hindo-teika-mirai-vision, honshitsu-kakugen-otoko-onna

### 口説き教材_完成版(chapter_00〜11, appendix)14件
kudoki-7gensoku-shinka-hakken, mochineta-dan-6shu-shindo3dankai, jizen-denwa-shokai-framing-5kata, atsu-6shu-jokyo-kansatsuhome-4kata-shosai, kyomizuke-4buki-shinrigaku-riron, jikokaiji-7koka-kenkyu-uragane, kakuage-shomei-7shurui-shosai, renaishi-A-teiseki-5tejun-C-teiseki-shosai, kizu-kakikae-4kata-B-teiseki-shogai-mukoka, shime-E-teiseki-4tejun-peak-end, saishu-4shurui-F-teiseki-kotaeawase, ondo-kakunin-goihyo-5dankai-kekkon-dd, K-shitsuren-L-taito-gibu-bogyo-3te-shosai, kudoki-kyozai-yougo-jiten-teiseki-sakuin

### 東カレ攻略セミナー(スザク版)ほか 13件
16step-diagnosis, gap-riron-6, kongo-jishin, kudoki-14gihou-tora, kaotsuki-suji-noroi, iine-dm-unyou-noruhau, profiling-inkya-buki-mizugi, shinsa-toroku-senryaku, kaiwa-tenkai-tree-mirroring, jibun-rikai-13mon, denwa-30min-wadai-haibun, koui-miseikata-mirai-talk, johari-bouei-tairyoku

### Drive「テキスト.pdf」(タブ1〜10)ほか 11件
harley-sekaikan-den, smabura-yomiai-herasu, kugiri-mokuteki-ka-batsu, netsuryou-wadai-taiou, jijitsu-genzaichi-carnavi, shashin-1mai-sashikae, episode-talk-zentai-riron, umehara-kachitsuzukeru, korekara-no-marketing, un-no-shoutai, shigoto-70percent-jikan-tanka

### その他 9件
- ムーブ抽出シート #16〜21:kansatsuhome-4gata-michibikuhito, kansatsuhome-3-4gata-jissen-tips
- コーチング音声起こし:wadai-furenai-riyu-kata-app-shikoukaisuu, shounin-yokkyuu-trophy-kyoso-position-motivation
- セミナー台本 docx(全158スライド対応版):toukare-seminar-daihon-part1, toukare-seminar-daihon-part2
- 全文トピックだが一部欠落:consult-date-tactic-session-full-2(偏見トーク・MBTIより仮想質問・沈黙の使い方が無い), group-session-full-3(ファーストペンギン理論・変数と定数・リングのストーリー売り・BtoB/BtoC・転職ストーリー・back number が無い), gaibu-honkai-joshi-kankei-books-1-2(①の対処法節が途中で切れている)

## 一部の項目だけ原本が未発見(他は既存の全文トピックにある)
- mote-jiyu-shiso:項目4(誠実の哲学)
- profile-photo-strategy:項目5(写真NG7分類)
- jisseki-cases:項目1(匿名ケース5名)
- kaiwa-genri:項目1(面白い話の3要素)・項目3(相手を主役にする3原則)
- toshin-3ruikei:項目1・2(打診の3類型と2軸マトリクス)
- profiling-shojihin-koe-kyarazuke:項目1・項目3(猫とヤンキー理論)
- nokan-onna-5jiku-riron:経営者の5脳・女性の感じ方5軸
