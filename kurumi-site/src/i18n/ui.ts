// 画面の文言。事実は docs/REQUIREMENTS.md に合わせる（ここにない事実は書かない）

export type Lang = 'ja' | 'en';

export const ui = {
  ja: {
    site: 'KURUMI',
    // キャッチコピーは胡桃さんと検討中。決まるまでTOPには理念を出す
    philosophy: '和を日常に。和で繋ぐ世界。',
    nav: [
      { href: 'story/', label: 'ストーリー' },
      { href: 'designer/', label: 'デザイナー' },
      { href: 'collection/', label: '作品' },
      { href: 'order/', label: 'オーダー' },
      { href: 'journal/', label: 'お知らせ' },
      { href: 'contact/', label: 'お問い合わせ' },
    ],
    cta: 'オーダーのご相談・ご質問',
    // スマホのヘッダーに入る短い表記
    ctaShort: 'ご相談',
    langSwitch: 'English',
    skip: '本文へ移動',
    footer: { company: '会社情報', privacy: 'プライバシーポリシー', copyright: '© 2026 合同会社Kurumi&Co.' },
    menu: 'メニュー',
    close: '閉じる',

    home: {
      heroSub: '西陣織やちりめん、紅型などの和の生地で、ドレスやジャケット、スーツを一着ずつお仕立てします。',
      videoTitle: 'Milan GX Fashion Week 2026',
      videoBody: '2026年2月、ミラノで発表したコレクションのショー映像です。',
      videoLabel: 'Milan\u00a0GX\u00a0Fashion\u00a0Week\u00a02026 のショー映像',
      videoExpand: '大きく見る',
      videoPause: '映像を止める',
      videoPlay: '映像を再生',
      conceptTitle: '和の生地を、いまの装いに',
      conceptBody:
        'KURUMIは、西陣織やちりめん、紅型などの和の生地を、レースやレザー、シルクと掛け合わせ、一着ずつ新たに仕立てています。着物のリメイクではなく、和を再構築し、これからの時代にふさわしい装いとして届けること。レディースに加え、メンズのジャケットやスーツもお仕立てします。',
      storyTitle: '和という、世界の共通言語',
      storyBody: '和の装いを前にすると、国や言葉の違いを越えて、人は自然と笑顔になります。KURUMIは、その笑顔の輪を世界へ広げていくことを目指しています。',
      storyMore: 'ブランドストーリー',
      collectionTitle: '作品',
      collectionBody: 'これまでに手がけた作品の一部をご紹介します。',
      collectionMore: 'すべての作品を見る',
      designerTitle: 'デザイナー 横山 胡桃',
      designerBody: '人前に立ち続けてきた経験から、着る人をより美しく見せる色とシルエットを追求しています。',
      designerMore: 'デザイナーについて',
      orderTitle: 'すべてオーダーメイドで仕立てます',
      orderBody: '採寸は東京にて承ります。東京以外での採寸をご希望の場合は、出張費を頂戴することがございます。海外にお住まいの方からのご依頼もお受けしています。お仕立ては、採寸からおよそ1\u2060か\u2060月〜1\u2060か\u2060月\u2060半です。',
      orderMore: 'オーダーについて',
      voicesTitle: 'お客様の声',
      finalTitle: 'オーダーのご相談・ご質問',
      finalBody: 'お召しになる場面やご希望を、どうぞお聞かせください。柄の見せ方からシルエットまで、ご一緒にかたちにしてまいります。',
    },

    prices: [
      { item: 'ジャケット', price: '30万円〜' },
      { item: 'ドレス', price: '38万円〜' },
      { item: 'スーツ', price: '38万円〜' },
    ],
    priceNote: '価格はすべて税別です。生地やデザインにより変わります。ワンピースとコートは、デザインに合わせてお見積もりいたします。',

    story: {
      title: '和を日常に。和で繋ぐ世界。',
      sections: [
        {
          h: 'ブランドのはじまり',
          p: [
            'ラジオの仕事をしていた頃、リスナーの方から「朝から“くるみん”の元気な声が聞けて、一日頑張ろうと元気をもらった」と、笑顔で伝えていただいたことがあります。太陽のように、多くの方へ元気と笑顔を届けたい。その想いが、すべての原点です。',
            'モデルやタレントとして人前に立つなかで、自分が最も笑顔になれるのは、素敵な洋服を着てステージに立っているときだと気づきました。洋服には、人を笑顔にし、自信を与える力がある。そう確信し、今度は自らがつくる側へ。2025年7月、KURUMIを立ち上げました。',
          ],
        },
        {
          h: 'なぜ「和」なのか',
          p: [
            '和の美しさは、言葉を必要としません。日本の方はもちろん、海外の方も、和のものを前にすると「Beautiful」と自然に笑顔になる。和はすでに、世界の共通言語なのだと感じています。',
            'だからこそKURUMIは、和を洋服の中に溶け込ませます。見る人も着る人も笑顔になる一着が世界に広がれば、その笑顔の輪が、世の中を少しずつ穏やかに、仲良くしていくと信じています。',
            '中学生の頃から暮らした沖縄では、平和について考える機会が数多くありました。人と人が笑顔でつながることが、その一歩になると信じています。',
          ],
        },
        {
          h: 'KURUMIの服づくり',
          p: [
            '着物をリメイクするのではなく、一着ずつ新たに仕立てる。それがKURUMIの服づくりです。西陣織を中心に、ちりめんや紅型、シルクといった和の生地を、レースやレザー、英国やイタリアのスーツ生地と掛け合わせ、これまでにない表現を生み出しています。',
            '洋服のかたちだからこそ、和を日常にも、特別な場にも。KURUMIの服は、和を身近に楽しむための一着です。',
          ],
        },
      ],
      valuesTitle: '大切にしていること',
      values: [
        { h: 'バランス', p: '色とシルエットの調和を見極め、着る人が最も美しく見える一着に仕上げます。' },
        { h: 'デザイン', p: 'レザーやレースなど異素材との掛け合わせから、心が動くデザインを追求します。' },
        { h: '笑顔が広がること', p: '着る人にも、その姿を目にした人にも、自然と笑顔が生まれる服であること。' },
      ],
      milanTitle: 'ミラノでの発表',
      milanAlt: 'Milan\u00a0GX\u00a0Fashion\u00a0Week\u00a02026のランウェイ',
      milan: [
        '2026年2月25日、Milan\u00a0GX\u00a0Fashion\u00a0Week\u00a02026にて、ドレス6着、ジャケット・スーツ3着、コート1着の計10着を発表しました。',
        'テーマは「繋がる」。和の装いをミラノで披露し、日本と世界をつなぐことを目指しました。紅型のドレスは、イタリア国旗の色で表現しています。',
      ],
      futureTitle: 'これから',
      future: [
        '職人とともに、染めや織りから「KURUMIの生地」をつくり上げていきます。あわせて、セットアップやワンピースなど、日常に取り入れやすい服にも広げていく予定です。',
        '海外から日本を訪れる方が、滞在中にオーダーできるプランも準備を進めています。',
        '私たちが世界に出ていくことは、日本のものづくりそのものが世界に出ていくことでもあると考えています。ブランドが広がることで、職人の新しい仕事や雇用が生まれ、日本の技術が次の世代へと受け継がれていく。KURUMIだけが成長するのではなく、日本のものづくりが世界で選ばれ、確かに循環していくところまでつなげていきたい。それが、私たちの目指す未来です。',
      ],
    },

    designer: {
      name: '横山 胡桃',
      kana: 'よこやま くるみ',
      role: 'デザイナー',
      profile: [
        '神奈川県に生まれ、沖縄で育つ。モデル・タレントとして人前に立つなかで、素敵な洋服を着てステージに立つときこそ、自分が最も笑顔になれると気づく。洋服には人を笑顔にし、自信を与える力がある。そう確信し、自らがつくる側へ進むことを決めた。',
        '絵を描くことは得意ではなかった。それでも試行錯誤を重ねるなかで、和を取り入れたデザインに出会い、2025年7月、ブランドKURUMIを立ち上げる。',
        'ドレスを手がけた経験がないまま、ミラノでの発表の機会が訪れる。決め手は、心が躍るかどうか。挑戦を選び、2026年2月、Milan\u00a0GX\u00a0Fashion\u00a0Week\u00a02026でコレクションを発表した。',
      ],
      viewTitle: 'デザインの視点',
      view: [
        '着物が身近ではない環境で育ったからこそ、和を外側から、しがらみのない自由な目で捉えることができます。',
        'モデルとして「どうすれば美しく見えるか」を問い続けてきた経験は、シルエットとバランスへのこだわりに生きています。',
        '目指すのは、着る人をより美しく見せ、袖を通すたびに心が弾む一着です。',
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
      lead: 'これまでに手がけた作品の一部をご紹介します。西陣織、ちりめん、紅型などの和の生地に、レースやレザー、英国やイタリアのスーツ生地を掛け合わせています。いずれの作品も、デザインをもとにオーダーでお仕立てできます。レディースに加え、メンズのジャケット・スーツも承ります。',
      all: 'すべて',
      filterLabel: '作品の種類で絞り込む',
      filterStatus: (n: number) => `${n}点の作品を表示しています`,
      orderFromThis: 'この作品について相談する',
      fillBody: 'いずれの作品も、柄の見せ方やシルエットを変えてお仕立てできます。',
      back: '作品一覧へ戻る',
      prev: '前の作品',
      next: '次の作品',
      materials: '使用した生地',
      priceLabel: '価格',
      priceTax: '（税別）',
      priceQuote: 'デザインに合わせてお見積もりいたします',
      orderInfo: 'お仕立ては、採寸からおよそ1\u2060か\u2060月〜1\u2060か\u2060月\u2060半です。採寸は東京にて承ります（東京以外をご希望の場合は、出張費を頂戴することがございます）。海外からのご依頼もお受けしています。',
      workDesc: 'KURUMIのオーダーメイド作品。和の生地を用い、デザインをもとにお仕立てします。',
      materialGlossaryTitle: '素材について',
      glossary: [
        { h: '西陣織', p: '京都・西陣で織られる、豪華な絵柄と金糸が特徴の織物。KURUMIの服づくりの中心となる生地です。' },
        { h: 'ちりめん', p: '表面に細やかな凹凸（シボ）を持つ絹織物。しなやかな風合いと、深みのある発色が魅力です。' },
        { h: '紅型', p: '沖縄に伝わる染め物。鮮やかな色彩と大胆な柄が特徴です。' },
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
      lead: 'KURUMIの服は、すべてオーダーメイドです。お好みやお召しになる場面に合わせて、柄の見せ方からシルエットまで、ご一緒に決めてまいります。メンズのジャケット・スーツもお仕立てします。',
      priceTitle: '参考価格',
      flowTitle: 'オーダーの流れ',
      flow: [
        { h: 'お問い合わせ', p: 'フォームより、ご希望やお召しになるご予定の日をお知らせください。' },
        { h: '採寸', p: '東京にて採寸を行い、デザインと生地をご一緒に決めてまいります。東京以外での採寸をご希望の場合は、出張費を頂戴することがございます。海外にお住まいの方もご相談ください。' },
        { h: 'お渡し', p: '採寸からおよそ1\u2060か\u2060月〜1\u2060か\u2060月\u2060半でお渡しいたします。' },
      ],
      scenesTitle: 'お召しいただきたい場面',
      scenes: ['登壇やスピーチなど、人前に立つ日に', '交流の場で、さりげなく印象を残したいときに', '大切な会食やパーティー、特別な日のお出かけに', '海外からのお客様をお迎えする日や、海外でのパーティーに'],
      voicesTitle: 'お客様の声',
      voices: [
        'ジャケットなので、会食にも普段にも合わせやすく、とても気に入っています。',
        '一着で、装いがぐっと華やかになりました。',
        '交流会では、先方から声をかけていただく機会が増えました。',
        '海外のお客様に「素敵！」と言っていただき、自然と会話が弾みました。',
        'デザインが、本当に美しいです。',
      ],
      faqTitle: 'よくあるご質問',
      faq: [
        { q: 'お支払い方法を教えてください。', a: 'お振込、またはクレジットカードにて承ります。' },
        { q: '思い出の着物などを持ち込んで仕立てられますか？', a: '生地の状態や内容によって、ご相談を承ります。お問い合わせの際にお知らせください。' },
        { q: '採寸はどちらで行いますか？', a: '東京にて承ります。東京までお越しいただける場合、出張費はかかりません。東京以外での採寸をご希望の場合は、出張費を頂戴することがございます。' },
        { q: '海外からもオーダーできますか？', a: 'はい、承ります。ご来日の際に採寸を行うか、別の方法をご相談のうえ決めてまいります。' },
        { q: '急ぎで仕立てていただくことはできますか？', a: '採寸からお渡しまで、通常はおよそ1\u2060か\u2060月〜1\u2060か\u2060月\u2060半です。お急ぎの場合は、ご相談ください。' },
      ],
    },

    contact: {
      title: 'オーダーのご相談・ご質問',
      lead: 'オーダーをお決めになる前のご質問も、どうぞお気軽にお寄せください。イメージが固まっていなくても、ご一緒に考えてまいります。',
      next: '3営業日以内に、メールにてご返信いたします。採寸をご希望であれば、その際に日程をご相談いたします。参考価格は、ジャケット30万円〜、ドレス38万円〜、スーツ38万円〜（いずれも税別）です。海外からのご相談も承ります。',
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
        messagePh: 'お住まいの地域（海外の方はご来日のご予定も）、気になる作品など、ご自由にお書きください。',
      },
      invalid: {
        name: 'お名前を入力してください。',
        email: 'メールアドレスを正しく入力してください（例：name@example.com）。',
      },
      submit: 'この内容で相談する',
      sending: '送信中…',
      thanks: 'お問い合わせいただき、ありがとうございます。内容を確認のうえ、3営業日以内にご連絡いたします。',
      thanksNote: 'ご返信は kurumiandco@gmail.com からお送りします。届かない場合は、迷惑メールフォルダもご確認ください。',
      thanksMore: '作品をもっと見る',
      error: '送信できませんでした。恐れ入りますが、時間をおいて再度お試しください。',
      errorAlt: 'うまく送信できない場合は、こちらのメッセージからもご連絡いただけます：',
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
      home: { title: 'KURUMI｜和の生地で仕立てるオーダーメイドの服', desc: '西陣織やちりめん、紅型などの和の生地で、ドレスやジャケット、スーツを一着ずつ仕立てるオーダーメイドブランド。Milan GX Fashion Week 2026でコレクションを発表。' },
      story: { title: 'ブランドストーリー｜KURUMI', desc: '和を日常に。和で繋ぐ世界。デザイナー横山胡桃がKURUMIを始めたきっかけと、和の生地で服を作る理由。' },
      designer: { title: 'デザイナー 横山胡桃｜KURUMI', desc: 'KURUMIのデザイナー、横山胡桃。ブランドを立ち上げるまでの歩みと、着る人をより美しく見せるデザインの視点。' },
      collection: { title: '作品一覧｜和の生地のドレス・ジャケット・メンズスーツ｜KURUMI', desc: '和の生地で仕立てるKURUMIのドレス、ジャケット、スーツ、コート。メンズのジャケット・スーツも。いずれの作品もオーダーでお仕立てできます。' },
      order: { title: 'オーダーについて｜価格と流れ｜KURUMI', desc: 'ジャケット30万円〜（税別）。東京での採寸からおよそ1\u2060か\u2060月〜1\u2060か\u2060月\u2060半でお渡しいたします。東京以外での採寸や、海外からのご依頼もご相談ください。' },
      contact: { title: 'オーダーのご相談・ご質問｜KURUMI', desc: 'オーダーのご相談やご質問はこちらから。イメージが固まっていなくても、ご一緒に考えてまいります。' },
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
    cta: 'Inquiries and consultations',
    ctaShort: 'Inquire',
    langSwitch: '日本語',
    skip: 'Skip to content',
    footer: { company: 'Company', privacy: 'Privacy policy', copyright: '© 2026 Kurumi&Co. LLC' },
    menu: 'Menu',
    close: 'Close',

    home: {
      heroSub: 'Dresses, jackets and suits made to order from Nishijin brocade, chirimen, bingata and other Japanese textiles.',
      videoTitle: 'Milan GX Fashion Week 2026',
      videoBody: 'Footage of the collection shown in Milan in February 2026.',
      videoLabel: 'Show footage from Milan\u00a0GX\u00a0Fashion\u00a0Week\u00a02026',
      videoExpand: 'Watch full screen',
      videoPause: 'Pause video',
      videoPlay: 'Play video',
      conceptTitle: 'Japanese textiles, reimagined for today',
      conceptBody:
        'KURUMI pairs Japanese textiles such as Nishijin brocade, chirimen and bingata with lace, leather and silk, and makes every piece new. Rather than remaking kimono, we reinterpret wa as clothing for the way people dress now. Alongside womenswear, we also tailor jackets and suits for men.',
      storyTitle: 'Wa, a language the world already shares',
      storyBody: 'Faced with Japanese design, people smile, whatever their language. KURUMI sets out to carry that smile around the world.',
      storyMore: 'Our story',
      collectionTitle: 'Collection',
      collectionBody: 'A selection of the pieces we have made.',
      collectionMore: 'View all pieces',
      designerTitle: 'Designer Kurumi Yokoyama',
      designerBody: 'Years in front of an audience taught her what makes a person look their best, and she brings that to color and silhouette.',
      designerMore: 'About the designer',
      orderTitle: 'Every piece is made to order',
      orderBody: 'Measurements are taken in Tokyo. If you would like them taken elsewhere, a travel fee may apply. We also accept orders from outside Japan. Pieces are ready about 4 to 6 weeks after measuring.',
      orderMore: 'How to order',
      voicesTitle: 'From our clients',
      finalTitle: 'Inquiries and consultations',
      finalBody: 'Tell us about the occasion and what you have in mind. From pattern placement to silhouette, we will shape the piece with you.',
    },

    prices: [
      { item: 'Jackets', price: 'from ¥300,000' },
      { item: 'Dresses', price: 'from ¥380,000' },
      { item: 'Suits', price: 'from ¥380,000' },
    ],
    priceNote: 'All prices exclude tax and vary with fabric and design. Day dresses and coats are quoted per design.',

    story: {
      title: 'Japanese style for every day, and a world connected through it.',
      sections: [
        {
          h: 'How KURUMI began',
          p: [
            'When I worked in radio, a listener once told me, smiling, that hearing my cheerful voice in the morning gave them the energy to face the day. I wanted to bring energy and smiles to as many people as I could, the way the sun does. That wish is where everything began.',
            'Standing in front of audiences as a model and TV personality, I realized I smiled most on stage, wearing beautiful clothes. Clothes have the power to make people smile and give them confidence. So I crossed over to making them, and launched KURUMI in July 2025.',
          ],
        },
        {
          h: 'Why wa',
          p: [
            'The beauty of wa needs no translation. In Japan and abroad alike, people meet Japanese design with a spontaneous smile and the word "beautiful." Wa, I believe, is already a language the world shares.',
            'That is why KURUMI blends wa into Western clothing. If pieces that make both the wearer and the onlooker smile reach the world, I believe those smiles can make it a little gentler, and a little friendlier.',
            'Living in Okinawa from junior high school, I had many occasions to reflect on peace. I believe people connecting through smiles can be a first step toward it.',
          ],
        },
        {
          h: 'How we make our clothes',
          p: [
            'KURUMI does not remake kimono; every piece is made new. Working mainly with Nishijin brocade, alongside chirimen, bingata and silk, we pair Japanese textiles with lace, leather and British and Italian suiting to create something new.',
            'Because the form is Western, wa can be part of daily life as easily as a special occasion.',
          ],
        },
      ],
      valuesTitle: 'What we value',
      values: [
        { h: 'Balance', p: 'We weigh color against silhouette until the piece shows the wearer at their most beautiful.' },
        { h: 'Design', p: 'We pair Japanese textiles with leather, lace and other materials, in pursuit of designs that move people.' },
        { h: 'Spreading smiles', p: 'Clothes that bring a smile to the wearer, and to everyone who sees them.' },
      ],
      milanTitle: 'Showing in Milan',
      milanAlt: 'The runway at Milan\u00a0GX\u00a0Fashion\u00a0Week\u00a02026',
      milan: [
        'On February 25, 2026, KURUMI presented ten looks at Milan\u00a0GX\u00a0Fashion\u00a0Week\u00a02026: six dresses, three jackets and suits, and one coat.',
        'The show was titled Connect. By presenting Japanese clothes in Milan, we set out to connect Japan with the world. One bingata dress uses the colors of the Italian flag.',
      ],
      futureTitle: 'What comes next',
      future: [
        "Together with artisans, we will develop KURUMI's own fabrics, from dyeing to weaving, and extend the line to pieces that fit easily into daily life, such as set-ups and dresses.",
        'We are also preparing a plan that lets visitors from abroad order a piece during their stay in Japan.',
        'When we go out into the world, Japanese craftsmanship goes with us. As the brand grows, it creates new work and jobs for artisans and helps pass Japanese skills on to the next generation. Our aim is not for KURUMI alone to grow, but for Japanese craftsmanship to be chosen around the world and sustained for the long term. That is the future we are working toward.',
      ],
    },

    designer: {
      name: 'KURUMI YOKOYAMA',
      kana: '',
      role: 'Designer',
      profile: [
        'Born in Kanagawa and raised in Okinawa. Years on stage as a model and TV personality led her to a realization: she smiled most when wearing beautiful clothes in front of an audience. Convinced that clothes can make people smile and give them confidence, she decided to become the one who makes them.',
        'Drawing was never her strength. Through trial and error she found her way to designs that bring in Japanese style, and in July 2025 she launched KURUMI.',
        'Then came the chance to show in Milan, though she had never made a dress. Her deciding question was whether the challenge made her heart race. It did, and in February 2026 she presented her collection at Milan\u00a0GX\u00a0Fashion\u00a0Week\u00a02026.',
      ],
      viewTitle: 'How she designs',
      view: [
        'Kimono were not part of her life growing up, which lets her see wa from the outside, free of convention.',
        'Years of asking, as a model, what makes a person look beautiful now shape her attention to silhouette and balance.',
        'Her aim is a piece that makes the wearer look their best, and lifts the spirit every time it is worn.',
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
      lead: 'A selection of the pieces we have made. Japanese textiles such as Nishijin brocade, chirimen and bingata are paired with lace, leather and British and Italian suiting. Every design can be made to order, and alongside womenswear we also tailor jackets and suits for men.',
      all: 'All',
      filterLabel: 'Filter by type',
      filterStatus: (n: number) => `Showing ${n} ${n === 1 ? 'piece' : 'pieces'}`,
      orderFromThis: 'Ask about this piece',
      fillBody: 'Any piece can be made to order, with the pattern placement and silhouette adjusted for you.',
      back: 'Back to the collection',
      prev: 'Previous piece',
      next: 'Next piece',
      materials: 'Materials',
      priceLabel: 'Price',
      priceTax: ' plus tax',
      priceQuote: 'Quoted per design',
      orderInfo: 'Pieces are ready about 4 to 6 weeks after measuring. Measurements are taken in Tokyo; if you would like them taken elsewhere, a travel fee may apply. We also accept orders from outside Japan.',
      workDesc: 'A KURUMI made-to-order piece in Japanese textiles. This design can be made for you.',
      materialGlossaryTitle: 'About the materials',
      glossary: [
        { h: 'Nishijin brocade', p: 'A richly patterned silk woven in the Nishijin district of Kyoto, often with gold thread. The fabric at the heart of KURUMI.' },
        { h: 'Chirimen', p: 'A silk crepe with a finely textured surface, prized for its supple drape and depth of color.' },
        { h: 'Bingata', p: 'A traditional dyeing art from Okinawa, known for vivid colors and bold motifs.' },
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
      lead: 'Every KURUMI piece is made to order. From pattern placement to silhouette, we decide each detail with you, based on your taste and the occasion. We also tailor jackets and suits for men.',
      priceTitle: 'Pricing',
      flowTitle: 'How it works',
      flow: [
        { h: 'Inquiry', p: 'Use the form to tell us what you have in mind and when you plan to wear it.' },
        { h: 'Measurements', p: 'We take your measurements in Tokyo and choose the design and fabric together. If you would like them taken elsewhere, a travel fee may apply. Clients outside Japan are welcome to ask.' },
        { h: 'Completion', p: 'Your piece is ready about 4 to 6 weeks after your measurements are taken.' },
      ],
      scenesTitle: 'Made for occasions such as',
      scenes: ['A day on stage, or speaking to an audience', 'Networking, when you want to leave a quiet impression', 'Important dinners, parties and special evenings out', 'Hosting international guests, or parties abroad'],
      voicesTitle: 'From our clients',
      voices: [
        'Because it is a jacket, it works for dinners and everyday wear alike. I love it.',
        'A single piece transformed my whole look.',
        'At networking events, people now approach me first.',
        'International guests told me it was beautiful, and the conversation flowed naturally.',
        'The design is truly beautiful.',
      ],
      faqTitle: 'Frequently asked questions',
      faq: [
        { q: 'How can I pay?', a: 'By bank transfer or credit card.' },
        { q: 'Can I bring my own fabric, such as a family kimono?', a: 'Depending on the fabric and its condition, we are happy to discuss it. Please tell us about it when you inquire.' },
        { q: 'Where are measurements taken?', a: 'In Tokyo. If you can come to Tokyo, there is no travel fee. If you would like them taken elsewhere, a travel fee may apply.' },
        { q: 'Can I order from outside Japan?', a: 'Yes. We can take your measurements while you are in Japan, or agree on another way to do it.' },
        { q: 'Can you make a piece in a hurry?', a: 'A piece usually takes about 4 to 6 weeks from your measurements. If you need it sooner, please ask us.' },
      ],
    },

    contact: {
      title: 'Inquiries and consultations',
      lead: 'Questions are welcome before you decide on an order. Even without a clear idea yet, we will think it through with you.',
      next: 'We reply by email within three business days. If you would like to be measured, we will arrange a date then. Guide prices start at ¥300,000 for jackets and ¥380,000 for dresses and suits, plus tax. Inquiries from outside Japan are welcome.',
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
      },
      submit: 'Send inquiry',
      sending: 'Sending…',
      thanks: 'Thank you for your inquiry. We will review it and reply within three business days.',
      thanksNote: 'Our reply comes from kurumiandco@gmail.com. If you do not see it, please check your spam folder.',
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
      home: { title: 'KURUMI – Made-to-Order Clothing in Japanese Textiles', desc: 'Made-to-order dresses, jackets and suits crafted from Nishijin brocade, chirimen, bingata and other Japanese textiles. Presented at Milan GX Fashion Week 2026.' },
      story: { title: 'Our Story – KURUMI', desc: 'How designer Kurumi Yokoyama started KURUMI, and why she makes clothes from Japanese textiles.' },
      designer: { title: 'Designer Kurumi Yokoyama – KURUMI', desc: 'Kurumi Yokoyama, the designer behind KURUMI: how the brand began, and how she designs.' },
      collection: { title: 'Collection – Dresses, Jackets and Menswear in Japanese Textiles – KURUMI', desc: 'KURUMI dresses, jackets, suits and coats in Japanese textiles, including jackets and suits for men. Every design can be made to order.' },
      order: { title: 'Made to Order – Pricing and Process – KURUMI', desc: 'Jackets from ¥300,000 plus tax. Measured in Tokyo and ready in about 4 to 6 weeks. Measurements elsewhere and orders from outside Japan are welcome.' },
      contact: { title: 'Inquiries – KURUMI', desc: 'Questions and order consultations. Even without a clear idea yet, we will think it through with you.' },
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
