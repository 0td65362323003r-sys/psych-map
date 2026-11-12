// 画面の文言。事実は docs/REQUIREMENTS.md に合わせる（ここにない事実は書かない）

export type Lang = 'ja' | 'en';

export const ui = {
  ja: {
    site: 'KURUMI',
    // キャッチコピー「KURUMIを纏い、世界を彩る。」は胡桃さんが検討中。決まるまでTOPには理念を出す
    philosophy: '和を日常に。和で繋ぐ世界。',
    nav: [
      { href: 'story/', label: 'ストーリー' },
      { href: 'designer/', label: 'デザイナー' },
      { href: 'collection/', label: '作品' },
      { href: 'order/', label: 'オーダー' },
      { href: 'journal/', label: 'お知らせ' },
      { href: 'contact/', label: 'お問い合わせ' },
    ],
    cta: 'オーダーのご相談',
    // スマホのヘッダーに入る短い表記
    ctaShort: 'ご相談',
    langSwitch: 'English',
    skip: '本文へ移動',
    footer: { company: '会社情報', privacy: 'プライバシーポリシー', copyright: '© 2026 合同会社Kurumi&Co.' },
    menu: 'メニュー',
    close: '閉じる',
    palette: { label: '配色の比較（確認用）', name: '配色', black: '黒×金', brown: '茶×金' },

    home: {
      heroSub: '西陣織や紅型など、和の生地で仕立てるオーダーメイドのドレスとジャケット',
      conceptTitle: '和の生地を、洋服で日常に',
      conceptBody:
        'KURUMIは、西陣織や紅型、ちりめんなどの和の生地を使い、ドレスやジャケットを一から仕立てています。着物をリメイクせず、一着ずつ新しく作っているので、ほかにはないデザインが生まれます。',
      storyTitle: '和の服で、世界に笑顔を広げたい',
      storyBody: '和のものを見ると、日本の人も海外の人も「素敵！」と笑顔になります。KURUMIの服が世界に広がれば、笑顔も広がり、世の中が少し仲良くなると考えています。',
      storyMore: 'ブランドストーリーを読む',
      collectionTitle: '作品',
      collectionBody: '2026年2月のMilan GX Fashion Week 2026で発表した作品を中心にご紹介します。',
      collectionMore: '作品を見る',
      swatchLabel: '生地から作品を見る',
      designerTitle: 'デザイナー 横山 胡桃',
      designerBody: 'モデルとしての経験から、着る人が美しく見える色とシルエットのバランスを大切にしています。',
      designerMore: 'デザイナーについて',
      orderTitle: 'すべてオーダーメイドで仕立てます',
      orderBody: '採寸は東京で、対面で行います。出張採寸や、海外にお住まいの方からのご依頼もご相談ください。採寸からおよそ1\u2060か\u2060月〜1\u2060か\u2060月\u2060半でお渡しします。',
      orderMore: 'オーダーについて',
      voicesTitle: 'お客様の声',
      finalTitle: 'オーダーのご相談',
      finalBody: '登壇や会食、パーティーなど、着ていく場面をお聞かせください。お好みに合わせて、柄の見せ方やシルエットをご一緒に決めてまいります。',
    },

    prices: [
      { item: 'ジャケット', price: '30万円〜' },
      { item: 'ドレス', price: '35万円〜' },
      { item: 'スーツ', price: '38万円〜' },
    ],
    priceNote: '価格はすべて税別です。生地やデザインによって変わります。ワンピースとコートは、デザインに合わせてお見積もりします。',

    story: {
      title: '和を日常に。和で繋ぐ世界。',
      sections: [
        {
          h: 'ブランドを始めたきっかけ',
          p: [
            '私の家族はみんな仲がよく、昔から笑顔の絶えない家庭でした。そんな家族が、私の誇りです。',
            'ラジオの仕事をしていたころ、ファンの方が「朝からくるみんの元気な声を聞いて、一日頑張ろうと思えた」と笑顔で話してくれました。それがとても嬉しくて、太陽のように、いろいろな人に元気と笑顔を届けたいと思うようになりました。',
            'モデルやタレントとして人前に立つうちに、自分がいちばん笑顔になれるのは、素敵な服を着ているときだと気づきました。それなら着る人が笑顔になれる服を自分で作ろうと思い、2025年7月にKURUMIを立ち上げました。',
          ],
        },
        {
          h: 'なぜ「和」なのか',
          p: [
            '和のものは、言葉が分からなくても伝わります。日本の人も海外の人も、和の装いを見ると「素敵！」と笑顔になります。',
            '和のお洋服は、世界の共通言語になれると思っています。KURUMIの服が世界に広がれば笑顔も広がり、世の中が少し仲良くなっていくと信じています。だから、和を取り入れたブランドにしました。',
          ],
        },
        {
          h: '沖縄で考えたこと',
          p: [
            '中学生のときから沖縄で暮らし、平和について考える機会がたくさんありました。',
            '人と人が笑顔でつながれば、世の中はもっと穏やかになるのではないか。お洋服がそのきっかけになれたら、少しでも平和に近づけるかもしれない。KURUMIには、そんな願いも込めています。',
          ],
        },
        {
          h: 'KURUMIの服づくり',
          p: [
            'KURUMIでは着物をリメイクせず、一着ずつ新しく仕立てています。西陣織を中心に、紅型、ちりめん、シルクなどの和の生地を、レースやレザー、英国やイタリアのスーツ生地と組み合わせます。',
            '洋服の形で、日常やパーティーで和を楽しんでいただくための服です。',
          ],
        },
      ],
      valuesTitle: '大切にしていること',
      values: [
        { h: 'バランス', p: '色やシルエットのバランスを見て、着る人が美しく見えるかどうかを確かめます。' },
        { h: 'デザイン', p: 'レザーやレースなどの異素材と組み合わせ、面白いと思えるデザインかどうかを考えます。' },
        { h: '笑顔が広がること', p: '着る人も、それを見た人も「素敵」と笑顔になれる服を、これからも作っていきます。' },
      ],
      milanTitle: 'ミラノでの発表',
      milanAlt: 'Milan GX Fashion Week 2026のランウェイ',
      milan: [
        '2026年2月25日、Milan GX Fashion Week 2026で、ドレス6着、ジャケット・スーツ3着、コート1着の計10着を発表しました。',
        'ショーのテーマは「繋がる」です。和の服をミラノで発表し、日本と世界をつなぐことを目指しました。紅型のドレスは、イタリア国旗の色で表現しています。',
      ],
      futureTitle: 'これから',
      future: [
        '3年後には日本に、5年後には海外にもお店を出したいと考えています。',
        '「日本のブランド」と聞いたときに、国内だけでなく海外でもKURUMIを思い浮かべてもらえるよう、少しずつ広げていきます。',
      ],
    },

    designer: {
      name: '横山 胡桃',
      kana: 'よこやま くるみ',
      role: 'デザイナー',
      photoCaption: 'KURUMIの作品（Milan GX Fashion Week 2026）',
      profile: [
        '神奈川県生まれ。中学生のときに家族で沖縄へ移り、モデル・タレントとして活動を始める。テレビ、ラジオ、CM、舞台、司会など幅広く出演し、東京に拠点を移してからも活動を続ける。',
        '2025年7月にブランドKURUMIを立ち上げ、2026年2月にMilan GX Fashion Week 2026でコレクションを発表。一般社団法人 日本オーダースーツ技能認定協会（JOSSCA）より、フィッターとして「マイスター」「ミドルマイスター」の認定を受ける。',
      ],
      viewTitle: 'デザインの視点',
      view: [
        '着物が身近にない環境で育ったため、和を外から自由な目で見ることができます。大河ドラマ『江』で描かれた女性の強さや奥ゆかしさにも惹かれてきました。',
        'モデルとして「どうすれば美しく見えるか」を考えてきた経験を、シルエットとバランスづくりに活かしています。',
      ],
      careerTitle: '主な実績',
      career: [
        { h: '資格', p: '一般社団法人 日本オーダースーツ技能認定協会（JOSSCA）フィッター「マイスター」（2025年3月）/「ミドルマイスター」（2025年5月）' },
        { h: '受賞', p: 'MISS GOLF 2023 沖縄大会 グランプリ / MISS GOLF 2023 全国大会 準グランプリ / MISS ORIENTAL 2022 福岡大会 グランプリ / JAPAN WOMEN\'S COLLECTION 2020 沖縄大会 グランプリ' },
        { h: 'ラジオ', p: 'FMヨコハマ 神奈川スバルキャンペーンリポート（2022〜2024年）/ RBCiラジオ ラジオカーリポート 金曜日レギュラー（2019〜2022年）/ RBCiラジオ サタデーマグネット アシスタントMC（2019〜2021年）' },
        { h: 'テレビ', p: 'ゴルフ番組『GOLFBEAT』プロデューサー兼ディレクター兼出演（琉球放送、2021〜2023年）/ JTAカップ（沖縄テレビ）/ NAHAマラソン（琉球放送）/ Aランチ（琉球放送）ほか（2016年〜）' },
        { h: 'CM', p: '沖縄食糧「愛を米守礼」アンバサダー（2021〜2024年）/ イオン琉球「火水ぴか市」/ ATSUGI ほか8本（2018年〜）' },
        { h: 'ドラマ', p: '『しに怖い夜』（2019年）/ 『闘牛戦士ワイドー』（2018年）' },
        { h: '舞台', p: '『団地ング・ヒーロー』（2024年・東京）/ 『こと〜築地寿司物語〜明日への轍』『てっちゃんの写真館』（2023年・東京）/ 『こと〜築地寿司物語〜百年の絆』（2022年・東京）/ 『ニライカナイからの贈り物』（2019年・沖縄）' },
        { h: 'モデル', p: 'ANA Web CM / ダンロップ / ことりっぷ / BE-PAL / かりゆしMAJUN / イオン広告 / ウェディングショー ほか（2018年〜）' },
        { h: '司会', p: 'FMヨコハマ箱根イベント / Numero Neuf発表会（2025年）/ FMヨコハマゴルフコンペ（2023・2024年）/ 琉球海炎祭 ほか（2018年〜）' },
      ],
    },

    collection: {
      title: '作品',
      lead: '2026年2月のMilan GX Fashion Week 2026で発表した作品を中心にご紹介します。西陣織、紅型、ちりめん、シルクなどの和の生地に、レースやレザー、英国やイタリアのスーツ生地を組み合わせています。どの作品も、デザインをもとにオーダーでお仕立てできます。',
      all: 'すべて',
      filterLabel: '作品の種類で絞り込む',
      filterStatus: (n: number) => `${n}点の作品を表示しています`,
      orderFromThis: 'この作品でオーダーを相談',
      fillBody: 'どの作品も、柄の見せ方やシルエットを変えてお仕立てできます。',
      back: '作品一覧へ戻る',
      prev: '前の作品',
      next: '次の作品',
      materials: '使った生地',
      priceLabel: '参考価格',
      priceTax: '（税別）',
      priceQuote: 'デザインに合わせてお見積もり',
      orderInfo: '採寸は東京で対面。採寸からおよそ1\u2060か\u2060月〜1\u2060か\u2060月\u2060半でお渡しします。海外からのご依頼もご相談ください。',
      workDesc: 'KURUMIのオーダーメイド作品。和の生地を使い、デザインをもとにお仕立てします。',
      materialGlossaryTitle: '素材について',
      glossary: [
        { h: '西陣織', p: '京都・西陣で織られる、豪華な絵柄と金糸が特徴の織物。KURUMIで最もよく使う生地です。' },
        { h: '紅型', p: '沖縄に伝わる染め物。鮮やかな色と大胆な柄が特徴です。' },
        { h: 'ちりめん', p: '表面に細かな凹凸（シボ）がある絹織物。しなやかで、染めの色が深く出ます。' },
      ],
    },

    categories: {
      dress: 'ドレス',
      jacket: 'ジャケット',
      suit: 'スーツ',
      coat: 'コート',
    },

    order: {
      title: 'オーダーについて',
      lead: 'KURUMIの服は、すべてオーダーメイドです。お好みや着ていく場面に合わせて、柄の見せ方やシルエットをご一緒に決めてまいります。',
      priceTitle: '参考価格',
      flowTitle: 'オーダーの流れ',
      flow: [
        { h: 'お問い合わせ', p: 'フォームから、ご希望のアイテムや着用予定日をお知らせください。' },
        { h: '採寸', p: '東京にて対面で採寸し、デザインや生地をご一緒に決めてまいります。出張採寸や、海外にお住まいの方からのご依頼もご相談ください。' },
        { h: 'お渡し', p: '採寸からおよそ1\u2060か\u2060月〜1\u2060か\u2060月\u2060半でお渡しします。' },
      ],
      scenesTitle: 'こんな場面に',
      scenes: ['登壇やスピーチなど、人前に立つ日', '交流会で、さりげなく印象に残りたいとき', '大切な会食やパーティー、デート', '海外のお客様を迎えるお仕事や、海外でのパーティー'],
      voicesTitle: 'お客様の声',
      voices: [
        'ジャケットなので、会食にも普段にも着られて、とても気に入っています。',
        '1着で華やかになりました。',
        '交流会で、相手から声をかけてもらえることが増えました。',
        '海外のお客様に「素敵！」と言っていただき、会話が弾みました。',
        'デザインがとても綺麗です。',
      ],
      faqTitle: 'よくある質問',
      faq: [
        { q: 'お支払い方法は？', a: 'お振込かクレジットカードです。' },
        { q: '着物などを持ち込んで作れますか？', a: '思い出の着物などをお持ち込みいただく場合は、内容によってご相談をお受けします。' },
        { q: '採寸はどこで？', a: '東京で、対面で行います。東京以外への出張採寸もお受けします（出張費がかかる場合があります）。お問い合わせの際にご相談ください。' },
        { q: '海外からもオーダーできますか？', a: 'はい、お受けしています。来日の際に採寸するか、別の採寸方法をご相談のうえ決めます。' },
      ],
    },

    contact: {
      title: 'オーダーのご相談',
      lead: 'イメージが固まっていなくても大丈夫です。着ていく場面をお聞かせいただければ、ご一緒に考えてまいります。',
      next: '3営業日以内にメールでご返信いたします。そのうえで、採寸の日程をご相談します。参考価格はジャケット30万円〜、ドレス35万円〜、スーツ38万円〜（いずれも税別）です。海外からのご相談も承ります。',
      credential: 'デザイナーの横山胡桃は、日本オーダースーツ技能認定協会（JOSSCA）認定のフィッター（マイスター／ミドルマイスター）です。',
      aboutPiece: 'ご相談の作品：',
      required: '必須',
      fields: {
        name: 'お名前',
        email: 'メールアドレス',
        item: 'ご希望のアイテム',
        items: ['ジャケット', 'ドレス', 'スーツ', 'ワンピース', 'コート', 'その他・相談したい'],
        budget: 'ご予算',
        budgets: ['30〜40万円', '40〜60万円', '60万円以上', '相談したい'],
        date: '着用予定日（未定の場合は空欄で構いません）',
        scene: '着用シーン',
        scenes: ['登壇・スピーチ', '交流会', '会食・パーティー', '海外での場', '普段使い', 'その他'],
        fabric: 'お持ち込みの素材',
        fabrics: ['あり', 'なし', '相談したい'],
        message: 'ご要望・ご質問',
        messagePh: 'お住まいの地域（海外の方は来日のご予定も）、気になる作品など、ご自由にお書きください。',
      },
      invalid: {
        name: 'お名前を入力してください。',
        email: 'メールアドレスを正しく入力してください（例：name@example.com）。',
        item: 'ご希望のアイテムを1つ選んでください。',
      },
      submit: 'この内容で相談する',
      sending: '送信中…',
      thanks: 'お問い合わせありがとうございます。内容を確認し、3営業日以内にご連絡いたします。',
      thanksNote: 'ご返信はGmailのアドレスからお送りします。届かない場合は、迷惑メールフォルダもご確認ください。',
      thanksMore: '作品をもっと見る',
      error: '送信できませんでした。時間をおいて、もう一度お試しください。',
      errorAlt: 'うまく送れない場合は、こちらのメッセージからもご連絡いただけます：',
      notReady: 'このフォームは確認用のため、まだ送信できません。',
      privacyNote: '送信いただいた情報の取り扱いについては、こちらをご覧ください：',
    },

    company: {
      title: '会社情報',
      rows: [
        { h: '会社名', p: '合同会社Kurumi&Co.' },
        { h: '代表者', p: '代表社員 横山 胡桃' },
        { h: '設立', p: '2025年7月29日' },
        { h: '事業内容', p: 'アパレルブランド「KURUMI」の企画・製作・販売 / マーケティング事業' },
      ],
    },

    privacy: {
      title: 'プライバシーポリシー',
      body: [
        '合同会社Kurumi&Co.（以下「当社」）は、お問い合わせフォームでお預かりする個人情報（お名前、メールアドレス、ご相談内容など）を、次のとおり取り扱います。',
        '利用目的：お問い合わせへの回答、オーダーのご相談とご連絡のために利用します。',
        '第三者への提供：法令に基づく場合を除き、ご本人の同意なく第三者に提供しません。',
        '管理：お預かりした情報は、適切に管理し、不要になったものは削除します。',
        'お問い合わせ：個人情報の確認・訂正・削除のご希望は、お問い合わせフォームからご連絡ください。',
      ],
    },

    journal: { title: 'お知らせ・ブログ', empty: '記事は準備中です。最新の様子はこちらからご覧いただけます：', back: '一覧へ戻る' },

    notFound: { title: 'ページが見つかりません', body: 'お探しのページは、移動または削除された可能性があります。', home: 'トップページへ' },

    seo: {
      home: { title: 'KURUMI｜和の生地で仕立てるオーダーメイドのドレス・ジャケット', desc: '西陣織や紅型など和の生地から、ドレスやジャケットを一から仕立てるオーダーメイドブランド。Milan GX Fashion Week 2026でコレクションを発表。' },
      story: { title: 'ブランドストーリー｜KURUMI', desc: '和を日常に。和で繋ぐ世界。デザイナー横山胡桃がKURUMIを始めたきっかけと、和の生地で服を作る理由。' },
      designer: { title: 'デザイナー 横山胡桃｜KURUMI', desc: 'モデル・タレントとして活動してきた横山胡桃のプロフィールと経歴。着る人を美しく見せるデザインの考え方も紹介します。' },
      collection: { title: '作品一覧｜西陣織・紅型のドレスとジャケット｜KURUMI', desc: '和の生地で仕立てるKURUMIのドレス、ジャケット、スーツ、コート。どの作品も、デザインをもとにオーダーでお仕立てできます。' },
      order: { title: 'オーダーについて｜価格と流れ｜KURUMI', desc: 'ジャケット30万円〜（税別）。東京での対面採寸からおよそ1\u2060か\u2060月〜1\u2060か\u2060月\u2060半でお渡し。出張採寸や海外からのご依頼もご相談ください。' },
      contact: { title: 'お問い合わせ｜KURUMI', desc: 'オーダーのご相談はこちらから。着ていきたい場面をお聞かせいただければ、ご一緒に考えてまいります。' },
      journal: { title: 'お知らせ・ブログ｜KURUMI', desc: 'KURUMIのお知らせ、コレクション、制作の裏側、和の文化について。' },
      company: { title: '会社情報｜KURUMI', desc: '合同会社Kurumi&Co.の会社情報。' },
      privacy: { title: 'プライバシーポリシー｜KURUMI', desc: '合同会社Kurumi&Co.のプライバシーポリシー。' },
      notFound: { title: 'ページが見つかりません｜KURUMI', desc: 'お探しのページは見つかりませんでした。' },
    },
  },

  en: {
    site: 'KURUMI',
    philosophy: 'Japanese style for every day, and a world connected through it.',
    nav: [
      { href: 'story/', label: 'Story' },
      { href: 'designer/', label: 'Designer' },
      { href: 'collection/', label: 'Collection' },
      { href: 'order/', label: 'Order' },
      { href: 'journal/', label: 'Journal' },
      { href: 'contact/', label: 'Contact' },
    ],
    cta: 'Request a consultation',
    ctaShort: 'Inquire',
    langSwitch: '日本語',
    skip: 'Skip to content',
    footer: { company: 'Company', privacy: 'Privacy policy', copyright: '© 2026 Kurumi&Co. LLC' },
    menu: 'Menu',
    close: 'Close',
    palette: { label: 'Palette comparison (review only)', name: 'Palette', black: 'Black/gold', brown: 'Brown/gold' },

    home: {
      heroSub: 'Made-to-order dresses and jackets in Nishijin brocade, bingata and other Japanese textiles',
      conceptTitle: 'Japanese textiles, made into clothes for every day',
      conceptBody:
        'KURUMI makes each dress and jacket new, from Japanese textiles such as Nishijin brocade, Ryukyu bingata and chirimen silk. We do not remake kimono, and our designs are found nowhere else.',
      storyTitle: 'Clothes that spread smiles around the world',
      storyBody: 'People in Japan and abroad smile when they see Japanese design, even without a shared language. As KURUMI reaches more people, we believe those smiles will spread and the world will become a little friendlier.',
      storyMore: 'Read our story',
      collectionTitle: 'Collection',
      collectionBody: 'Featuring pieces shown at Milan GX Fashion Week 2026 in February 2026.',
      collectionMore: 'View the collection',
      swatchLabel: 'Browse by fabric',
      designerTitle: 'Designer Kurumi Yokoyama',
      designerBody: 'Drawing on her years as a model, she focuses on the balance of color and silhouette that makes the wearer look their best.',
      designerMore: 'About the designer',
      orderTitle: 'Every piece is made to order',
      orderBody: 'Measurements are taken in person in Tokyo. We can also come to you, and we welcome orders from outside Japan. Your piece is ready about 4 to 6 weeks after your measurements are taken.',
      orderMore: 'How to order',
      voicesTitle: 'From our clients',
      finalTitle: 'Order consultation',
      finalBody: 'Tell us where you plan to wear the piece, such as a talk, a dinner or a party. Together we will choose how the pattern is placed and how the silhouette falls.',
    },

    prices: [
      { item: 'Jackets', price: 'from ¥300,000' },
      { item: 'Dresses', price: 'from ¥350,000' },
      { item: 'Suits', price: 'from ¥380,000' },
    ],
    priceNote: 'All prices exclude tax and vary with fabric and design. Day dresses and coats are quoted per design.',

    story: {
      title: 'Japanese style for every day, and a world connected through it.',
      sections: [
        {
          h: 'How KURUMI began',
          p: [
            'I grew up in a close family that was always laughing, and I am very proud of them.',
            'When I worked in radio, a listener told me with a smile that hearing my cheerful voice in the morning made them want to give the day their best. It made me very happy, and I began to want to bring energy and smiles to many people, the way the sun does.',
            'Standing in front of people as a model and TV personality, I noticed that I smile most when I am wearing beautiful clothes. So I decided to make clothes that make the wearer smile, and launched KURUMI in July 2025.',
          ],
        },
        {
          h: 'Why wa',
          p: [
            'Wa, Japanese style and culture, comes across even without words. When people in Japan and abroad see Japanese attire, they smile and say, "How beautiful!"',
            'I think clothes with wa can be a language the whole world shares. I built KURUMI around wa in the hope that, as it reaches more people, smiles will spread and the world will become a little friendlier.',
          ],
        },
        {
          h: 'What Okinawa taught me',
          p: [
            'I moved to Okinawa in junior high school, and living there gave me many chances to think about peace.',
            'I believe that when people connect through smiles, the world becomes a gentler place, and I hope clothes can help, in a small way, toward peace. KURUMI carries that hope too.',
          ],
        },
        {
          h: 'How we make our clothes',
          p: [
            'KURUMI does not remake kimono. Each piece is newly made. We work mainly with Nishijin brocade, along with Ryukyu bingata, chirimen and silk, and combine them with lace, leather and British and Italian suiting.',
            'The pieces are Western in cut, made for enjoying wa in daily life and at parties.',
          ],
        },
      ],
      valuesTitle: 'What we value',
      values: [
        { h: 'Balance', p: 'We check the balance of color and silhouette to make sure the wearer looks beautiful.' },
        { h: 'Design', p: 'We combine Japanese textiles with leather, lace and other materials, and keep asking whether a design feels fresh.' },
        { h: 'Spreading smiles', p: 'We want to keep making clothes that make both the wearer and the people around them smile.' },
      ],
      milanTitle: 'Showing in Milan',
      milanAlt: 'The runway at Milan GX Fashion Week 2026',
      milan: [
        'On February 25, 2026, KURUMI presented ten looks at Milan GX Fashion Week 2026: six dresses, three jackets and suits, and one coat.',
        'The show was titled Connect. By presenting Japanese clothes in Milan, we set out to connect Japan with the world. One bingata dress uses the colors of the Italian flag.',
      ],
      futureTitle: 'What comes next',
      future: [
        'We hope to open a store in Japan within three years, and abroad within five.',
        'We want people in Japan and around the world to think of KURUMI when they think of a Japanese brand.',
      ],
    },

    designer: {
      name: 'KURUMI YOKOYAMA',
      kana: '',
      role: 'Designer',
      photoCaption: 'A KURUMI piece, Milan GX Fashion Week 2026',
      profile: [
        'Born in Kanagawa, Japan, Kurumi moved to Okinawa with her family in junior high school and began her career there as a model and TV personality. She has worked in television, radio, commercials and theater, and as an event host, and later moved her base to Tokyo.',
        'In July 2025 she launched KURUMI, and in February 2026 presented her collection at Milan GX Fashion Week 2026. She is a certified fitter at the Meister and Middle Meister grades, awarded by the Japan Order Suit Skill Certification Association (JOSSCA).',
      ],
      viewTitle: 'How she designs',
      view: [
        'Kimono were not part of her everyday life growing up, so she looks at wa from the outside, without fixed rules. She was also drawn to it by the historical drama Gō and the strength and grace of the women in it.',
        'As a model she spent years thinking about what makes a person look beautiful, and she uses that experience when shaping silhouette and balance.',
      ],
      careerTitle: 'Selected work',
      career: [
        { h: 'Certification', p: 'Certified fitter, Meister grade (March 2025) and Middle Meister grade (May 2025), Japan Order Suit Skill Certification Association (JOSSCA)' },
        { h: 'Awards', p: 'Grand Prix, MISS GOLF 2023 Okinawa / Runner-up, MISS GOLF 2023 Japan Final / Grand Prix, MISS ORIENTAL 2022 Fukuoka / Grand Prix, JAPAN WOMEN\'S COLLECTION 2020 Okinawa' },
        { h: 'Radio', p: 'Kanagawa Subaru campaign reporter, FM Yokohama (2022–2024) / Radio car reporter, Friday regular, RBCi Radio (2019–2022) / Assistant MC, Saturday Magnet, RBCi Radio (2019–2021)' },
        { h: 'Television', p: 'Producer, director and presenter of the golf program GOLFBEAT, Ryukyu Broadcasting (2021–2023) / JTA Cup (Okinawa Television) / NAHA Marathon (Ryukyu Broadcasting) and other programs (2016–)' },
        { h: 'Commercials', p: 'Ambassador, Okinawa Shokuryo (2021–2024) / AEON Ryukyu / ATSUGI and eight others (2018–)' },
        { h: 'Drama', p: 'Two TV dramas (2018, 2019)' },
        { h: 'Stage', p: 'Five stage productions in Tokyo (2022–2024) and Okinawa (2019)' },
        { h: 'Modeling', p: 'ANA web commercial / Dunlop / BE-PAL / Kariyushi MAJUN / AEON advertising / bridal shows and others (2018–)' },
        { h: 'Host', p: 'FM Yokohama Hakone event / Numero Neuf launch (2025) / FM Yokohama golf tournament (2023, 2024) / Ryukyu Kaiensai fireworks festival and others (2018–)' },
      ],
    },

    collection: {
      title: 'Collection',
      lead: 'Many of these pieces were shown at Milan GX Fashion Week 2026 in February 2026. Japanese textiles such as Nishijin brocade, Ryukyu bingata, chirimen and silk are combined with lace, leather and British and Italian suiting. Any of these designs can be made to order for you.',
      all: 'All',
      filterLabel: 'Filter by type',
      filterStatus: (n: number) => `Showing ${n} ${n === 1 ? 'piece' : 'pieces'}`,
      orderFromThis: 'Ask about ordering this design',
      fillBody: 'Any piece can be made to order, with the pattern placement and silhouette adjusted for you.',
      back: 'Back to the collection',
      prev: 'Previous piece',
      next: 'Next piece',
      materials: 'Materials',
      priceLabel: 'Guide price',
      priceTax: ' plus tax',
      priceQuote: 'Quoted per design',
      orderInfo: 'Measurements are taken in person in Tokyo, and your piece is ready about 4 to 6 weeks later. We welcome orders from outside Japan.',
      workDesc: 'A KURUMI made-to-order piece in Japanese textiles. This design can be made for you.',
      materialGlossaryTitle: 'About the materials',
      glossary: [
        { h: 'Nishijin brocade', p: 'A richly patterned silk woven in the Nishijin district of Kyoto, often with gold thread. The fabric KURUMI uses most.' },
        { h: 'Bingata', p: 'A traditional dyeing art from Okinawa, known for vivid colors and bold motifs.' },
        { h: 'Chirimen', p: 'A silk crepe with a finely textured surface. Soft to the touch and rich in color.' },
      ],
    },

    categories: {
      dress: 'Dresses',
      jacket: 'Jackets',
      suit: 'Suits',
      coat: 'Coats',
    },

    order: {
      title: 'Made to order',
      lead: 'Every KURUMI piece is made to order. Together we decide how the pattern is placed and how the silhouette falls, based on your taste and the occasion.',
      priceTitle: 'Pricing',
      flowTitle: 'How it works',
      flow: [
        { h: 'Inquiry', p: 'Tell us through the form what you would like and when you plan to wear it.' },
        { h: 'Measurements', p: 'We take your measurements in person in Tokyo and choose the design and fabric together. We can also come to you, or arrange a session when you visit Japan.' },
        { h: 'Completion', p: 'Your piece is ready about 4 to 6 weeks after your measurements are taken.' },
      ],
      scenesTitle: 'Occasions',
      scenes: ['Speaking on stage or in front of an audience', 'Networking events where you want to be remembered', 'Important dinners, parties and dates', 'Welcoming international guests, or parties abroad'],
      voicesTitle: 'From our clients',
      voices: [
        'It is a jacket, so I can wear it to dinners and in daily life. I really like it.',
        'One piece was all it took to make my look special.',
        'At networking events, more people start conversations with me.',
        'My international guests said "beautiful!", and it got the conversation going.',
        'The design is beautiful.',
      ],
      faqTitle: 'Questions',
      faq: [
        { q: 'How can I pay?', a: 'By bank transfer or credit card.' },
        { q: 'Can I bring my own fabric, such as a family kimono?', a: 'It depends on the fabric, and we are happy to discuss it. Please tell us about it when you inquire.' },
        { q: 'Where are measurements taken?', a: 'In person in Tokyo. We can also come to you outside Tokyo; a travel fee may apply. Please ask when you inquire.' },
        { q: 'Can I order from outside Japan?', a: 'Yes. We can take your measurements while you are in Japan, or agree on another way to do it.' },
      ],
    },

    contact: {
      title: 'Order consultation',
      lead: 'You do not need a finished idea. Tell us where you plan to wear the piece, and we will shape it with you.',
      next: 'We reply by email within three business days to arrange your measurements. Guide prices start at ¥300,000 for jackets, ¥350,000 for dresses and ¥380,000 for suits, plus tax. Inquiries from outside Japan are welcome.',
      credential: 'Designer Kurumi Yokoyama is a fitter certified at the Meister and Middle Meister grades by the Japan Order Suit Skill Certification Association (JOSSCA).',
      aboutPiece: 'Piece you are asking about: ',
      required: 'Required',
      fields: {
        name: 'Name',
        email: 'Email',
        item: 'Item',
        items: ['Jacket', 'Dress', 'Suit', 'Day dress', 'Coat', 'Other, or not sure yet'],
        budget: 'Budget',
        budgets: ['¥300,000–400,000', '¥400,000–600,000', '¥600,000 and above', 'I would like to discuss'],
        date: 'Date you plan to wear it (leave blank if not decided)',
        scene: 'Occasion',
        scenes: ['Speaking event', 'Networking', 'Dinner or party', 'Event abroad', 'Everyday', 'Other'],
        fabric: 'Bringing your own fabric',
        fabrics: ['Yes', 'No', 'I would like to discuss'],
        message: 'Anything else you would like to tell us',
        messagePh: 'Where you are based (and any plans to visit Japan), pieces you liked, or anything else.',
      },
      invalid: {
        name: 'Please enter your name.',
        email: 'Please enter a valid email address, for example name@example.com.',
        item: 'Please choose an item.',
      },
      submit: 'Send inquiry',
      sending: 'Sending…',
      thanks: 'Thank you for your inquiry. We will review it and reply within three business days.',
      thanksNote: 'Our reply comes from a Gmail address. If you do not see it, please check your spam folder.',
      thanksMore: 'See more of the collection',
      error: 'Your message could not be sent. Please try again in a little while.',
      errorAlt: 'If it still does not go through, you can also message us on',
      notReady: 'This form is a preview and cannot send yet.',
      privacyNote: 'For how we handle your information, see our',
    },

    company: {
      title: 'Company',
      rows: [
        { h: 'Company', p: 'Kurumi&Co. LLC' },
        { h: 'Representative', p: 'Kurumi Yokoyama, Representative Member' },
        { h: 'Established', p: 'July 29, 2025' },
        { h: 'Business', p: 'Design, production and sale of the fashion brand KURUMI / Marketing services' },
      ],
    },

    privacy: {
      title: 'Privacy policy',
      body: [
        'Kurumi&Co. LLC ("we") handles the personal information you provide through our contact form (such as your name, email address and inquiry) as follows.',
        'Purpose: to reply to your inquiry and to discuss and arrange your order.',
        'Sharing: we do not share your information with third parties without your consent, except where required by law.',
        'Management: we keep your information secure and delete it when it is no longer needed.',
        'Contact: to see, correct or delete your information, please reach us through the contact form.',
      ],
    },

    journal: { title: 'Journal', empty: 'Posts are coming soon. For our latest news, follow us on', back: 'Back to the journal' },

    notFound: { title: 'Page not found', body: 'The page you are looking for may have moved or been removed.', home: 'Go to the home page' },

    seo: {
      home: { title: 'KURUMI – Made-to-Order Dresses and Jackets in Japanese Textiles', desc: 'Made-to-order dresses and jackets crafted from Nishijin brocade, bingata and other Japanese textiles. Presented at Milan GX Fashion Week 2026.' },
      story: { title: 'Our Story – KURUMI', desc: 'How designer Kurumi Yokoyama started KURUMI, and why she makes clothes from Japanese textiles.' },
      designer: { title: 'Designer Kurumi Yokoyama – KURUMI', desc: 'Meet Kurumi Yokoyama, the model and TV personality turned designer behind KURUMI.' },
      collection: { title: 'Collection – Nishijin and Bingata Dresses and Jackets – KURUMI', desc: 'KURUMI dresses, jackets, suits and coats in Japanese textiles. Any design can be made to order for you.' },
      order: { title: 'Made to Order – Pricing and Process – KURUMI', desc: 'Jackets from ¥300,000 plus tax. Measured in person in Tokyo and ready in about 4 to 6 weeks. Orders from outside Japan are welcome.' },
      contact: { title: 'Contact – KURUMI', desc: 'Request an order consultation. Tell us where you plan to wear the piece.' },
      journal: { title: 'Journal – KURUMI', desc: 'News, collections, behind the scenes and Japanese culture from KURUMI.' },
      company: { title: 'Company – KURUMI', desc: 'Company information for Kurumi&Co. LLC.' },
      privacy: { title: 'Privacy Policy – KURUMI', desc: 'Privacy policy of Kurumi&Co. LLC.' },
      notFound: { title: 'Page Not Found – KURUMI', desc: 'The page you are looking for could not be found.' },
    },
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}

// 言語ごとのURL。日本語はドメイン直下、英語は /en/ の下
export function localePath(lang: Lang, path = '') {
  return (lang === 'ja' ? '/' : '/en/') + path;
}

export const INSTAGRAM_URL = 'https://www.instagram.com/kurumi_official_japan/';
export const YOUTUBE_URL = 'https://www.youtube.com/@kurumi_jp';
