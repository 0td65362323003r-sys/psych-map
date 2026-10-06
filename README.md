# psych-map

このリポジトリには2つのアプリが入っています。

| パス | アプリ |
|---|---|
| `/` | 心理マップ（既存） |
| `/kuchikomi` | **口コミアシスト**：店舗オーナー向け管理画面 |
| `/r/:storeId` | **口コミアシスト**：お客様向けアンケート（QRコードの遷移先） |

## 口コミアシスト

店頭のQRコードから30秒アンケートに答えてもらい、選んだ「良かった点」をもとに口コミ文の下書きをAIが作成。お客様は自分で確認・編集してから Google マップに投稿します。

### すぐ使えるWebサイト版（claude.ai）

`site/kuchikomi.html` を claude.ai のページとして公開しています。

- 表示画面（お客様用）: `https://claude.ai/artifact/FFXm8BnVFHjFzqPmEqMoX7#r-<店舗ID>`
- 管理画面: `https://claude.ai/artifact/FFXm8BnVFHjFzqPmEqMoX7#admin`

データは公開ページ内の共有データベースに保存され、AI生成は閲覧者のClaudeを使います。閲覧には claude.ai へのログインと共有設定（回答を送る人は「Contributor（利用者）」以上）が必要なため、一般のお客様向けには下のVercel版を使ってください。

### 一般のお客様向けに公開する手順（Vercel）

1. Supabase でプロジェクトを作り、SQL Editor で `supabase-kuchikomi.sql` を実行
2. https://vercel.com/new でこのリポジトリをインポート（ブランチは `claude/determined-curie-av7qfy`、またはマージ後の `main`）
3. Environment Variables に `REACT_APP_SUPABASE_URL` / `REACT_APP_SUPABASE_ANON_KEY` / `ANTHROPIC_API_KEY` を入れて Deploy
4. `https://<発行されたドメイン>/kuchikomi` を開いて店舗を登録し、QRコードを印刷

### 機能

- **複数店舗管理**：店舗ごとにアンケート項目・NGワード・特典を設定
- **業種別テンプレート**：飲食／美容／歯科・クリニック／ホテル／シーシャ／その他
- **AIアンケート**：満足度・利用シーン・良かった点（カテゴリ付き）・一言コメント → 口コミ下書きを生成（`/api/generate-review`）。APIキー未設定時はテンプレート文で生成
- **NGワードチェック**：下書き・返信文にNGワードがあると投稿ボタンを無効化
- **多言語**：日本語・英語・中国語・韓国語（ブラウザの言語で自動切替）
- **低評価の扱い**：★1〜2のお客様には「お店に直接伝える」フォームを案内しつつ、Google投稿への導線も残す
- **回答特典**：全員クーポン／抽選（Google投稿の有無に関係なく回答者全員に表示）
- **QRコード・店頭POP**：QR画像ダウンロード、POP印刷
- **ダッシュボード**：回答数・平均満足度・Google投稿率・改善要望、満足度分布、カテゴリ別評価、TOP5項目、直近14日推移
- **回答一覧**：低評価フィルター、CSV出力
- **AI返信**：Googleに届いた口コミへの返信文案（`/api/generate-reply`）
- **評価シミュレーター**：現在の★と件数から、目標★までに必要な★5件数と到達目安期間

### Googleのポリシーに沿った設計

Googleは「偽の口コミ」「口コミの見返りとしての特典」「良い評価だけをGoogleに誘導する（レビューゲーティング）」を禁止しています。そのため本システムは次のようにしています。

- 投稿は**お客様本人が自分のアカウントで行う**（自動投稿はしない）。下書きは自由に編集可能
- AIには**お客様が選んだ項目とコメントにある事実だけ**を使わせ、体験の創作を禁止
- 低評価でも Google 投稿ボタンを表示
- 特典はアンケート回答へのお礼として全員に表示

### セットアップ

```bash
npm install
npm start          # http://localhost:3000/kuchikomi
```

Supabase の環境変数が無い場合は **お試しモード（ブラウザの localStorage に保存）** で動きます。この場合、お客様のスマホからの回答は管理画面に届かないため、本番では以下を設定してください。

1. Supabase の SQL Editor で `supabase-kuchikomi.sql` を実行
2. Vercel の環境変数に設定
   - `REACT_APP_SUPABASE_URL` / `REACT_APP_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`（AIによる口コミ文・返信文の生成に使用。未設定ならテンプレート生成）
   - 任意：`ANTHROPIC_MODEL`（既定 `claude-opus-5-5`）
3. デプロイ後、`https://<your-domain>/kuchikomi` で店舗を登録し、Google口コミURL（または Place ID）を設定

> `supabase-kuchikomi.sql` のポリシーはお試し用に管理操作も公開しています。本番では Supabase Auth を入れて店舗オーナーごとに制限してください。

### ファイル構成

```
api/
  _claude.js            Claude API 呼び出し・簡易レート制限
  generate-review.js    口コミ下書き生成
  generate-reply.js     返信文案生成
src/kuchikomi/
  KuchikomiApp.js       ルーティング
  Admin.js              管理画面
  Survey.js             お客様アンケート
  presets.js            業種テンプレート・多言語文言
  reviewGen.js          AI呼び出しとテンプレート生成
  analytics.js          集計・評価シミュレーション・CSV
  storage.js            Supabase / localStorage 切替
supabase-kuchikomi.sql
```

### テスト

```bash
CI=true npx react-scripts test --watchAll=false src/kuchikomi
```
