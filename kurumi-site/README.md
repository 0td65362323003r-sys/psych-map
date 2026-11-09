# KURUMI ブランドサイト

Astro で作る静的サイトです。Cloudflare Pages で公開し、ブログは microCMS、お問い合わせは Google Apps Script で受け付けます。設計は「くるみ ブランドサイト 設計書」を参照してください。

## 開発

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に書き出す
```

Node.js 22.12 以上が必要です。

## 文言と作品の更新

| 変えたいもの | ファイル |
|---|---|
| 画面の文章（日本語・英語） | `src/i18n/ui.ts` |
| 作品の名前・生地・説明・写真 | `src/data/works.ts`（写真は `src/assets/works/`） |
| 色・フォント | `src/styles/global.css` |

`【要確認】` / `[TBC]` は胡桃さんの回答待ちの箇所です。

## 配色の比較（デザイン確認用）

画面右下の「配色」ボタン、または `?palette=brown` で茶×金に切り替わります。配色が決まったら、`src/layouts/Base.astro` の `palette-switch` と切り替えのスクリプトを消し、`global.css` の配色を1つにします。

## 環境変数（Cloudflare Pages の設定画面で入れる）

| 名前 | 中身 |
|---|---|
| `SITE_URL` | 本番のURL（例：`https://kurumi-official.com`） |
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスID |
| `MICROCMS_API_KEY` | microCMS のAPIキー（読み取り専用） |
| `PUBLIC_CONTACT_ENDPOINT` | お問い合わせ用 Google Apps Script のウェブアプリURL |
| `NODE_VERSION` | `22` |

microCMS の変数がなければ、ブログは「準備中」と表示されます。

## Cloudflare Pages の設定

- ビルドコマンド：`npm run build`
- 出力ディレクトリ：`dist`
- ルートディレクトリ：`kurumi-site`（専用リポジトリに移したら空欄）

## microCMS

API名 `journal`（リスト形式）を作り、次の項目を用意します。

| フィールドID | 種類 | 必須 |
|---|---|---|
| `title` | テキスト | ○ |
| `lang` | セレクト（`ja` / `en`） | ○ |
| `category` | テキスト | |
| `eyecatch` | 画像 | |
| `body` | リッチエディタ | ○ |
| `description` | テキスト | |

記事を公開したらサイトを作り直すよう、microCMS の Webhook に Cloudflare Pages のデプロイフックURLを登録します。

## お問い合わせフォーム

`../gas/kurumi-contact/Code.gs` を、胡桃さんのスプレッドシートの Apps Script に貼り付けます。`setup` を一度実行してから、ウェブアプリ（実行ユーザー：自分、アクセス：全員）としてデプロイし、そのURLを `PUBLIC_CONTACT_ENDPOINT` に入れます。
