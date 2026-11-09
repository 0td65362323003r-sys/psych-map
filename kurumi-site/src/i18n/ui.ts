// 画面の文言。原稿ドキュメント「KURUMI サイト原稿（日本語・英語）」と内容をそろえる
// 【要確認】/ [TBC] は胡桃さんの回答待ちの箇所

export type Lang = 'ja' | 'en';

export const ui = {
  ja: {
    site: 'KURUMI',
    catch: 'KURUMIを纏い、世界を彩る。',
    philosophy: '和を日常に。和で繋ぐ世界。',
    nav: [
      { href: 'story/', label: 'STORY', sub: 'ブランドについて' },
      { href: 'designer/', label: 'DESIGNER', sub: 'デザイナー' },
      { href: 'collection/', label: 'COLLECTION', sub: '作品' },
      { href: 'order/', label: 'ORDER', sub: 'オーダー' },
      { href: 'journal/', label: 'JOURNAL', sub: 'お知らせ' },
      { href: 'contact/', label: 'CONTACT', sub: 'お問い合わせ' },
    ],
    cta: 'オーダーのご相談',
    langSwitch: 'English',
    footer: { company: '会社情報', privacy: 'プライバシーポリシー', copyright: '© 2026 合同会社Kurumi&Co.' },
    menu: 'メニュー',
    close: '閉じる',

    home: {
      heroSub: 'ミラノで発表した、新しい和の装い。',
      conceptTitle: '着物でも、リメイクでもない。',
      conceptBody:
        '西陣織、紅型、ちりめん。日本の美しい布から、ドレスやジャケットという洋の形で、まったく新しい一着を仕立てます。それがKURUMIの「新しい和」です。',
      storyTitle: '和は、言葉がなくても伝わる。',
      storyBody: '「素敵」と笑顔になる瞬間に、国境はありません。KURUMIは、その笑顔の輪を一着から広げていきます。',
      storyMore: 'ブランドストーリーを読む',
      collectionBody: 'Milan GX Fashion Week 2026で発表したコレクションから。',
      collectionMore: '作品を見る',
      designerTitle: 'デザイナー 横山 胡桃',
      designerBody: 'モデルとして「どうすれば美しく見えるか」を追いかけてきた目で、着る人を引き立てるシルエットを描きます。',
      designerMore: 'デザイナーについて',
      orderTitle: 'すべてオーダーメイドです。',
      orderBody: '採寸からおよそ1か月〜1か月半でお届けします。',
      orderMore: 'オーダーについて',
      journalEmpty: '記事は準備中です。',
      finalTitle: 'あなたのための一着を。',
      finalBody: '人前に立つ日、大切な会食、海外のパーティー。その日のあなたに合わせて仕立てます。',
    },

    prices: [
      { item: 'ジャケット', price: '30万円〜' },
      { item: 'ドレス', price: '35万円〜' },
      { item: 'スーツ', price: '38万円〜' },
    ],
    priceNote: '【要確認：税込／税別】生地やデザインによって変わります。',

    story: {
      title: '和で、世界を笑顔に。',
      sections: [
        {
          h: 'はじまりは、笑顔',
          p: [
            '私の家族は皆仲がよく、昔から笑顔の絶えない家庭でした。そんな家族は、今も私の誇りです。',
            'ラジオの仕事をしていたころ、ファンの方が「朝からくるみんの元気な声を聞いて、今日も頑張ろうって思えた」と笑顔で話してくれました。そのとき、太陽のように、たくさんの人に元気と笑顔を届けたいと心から思ったのです。',
          ],
        },
        {
          h: '服との出会い',
          p: [
            'モデルやタレントとして人前に立つ中で、気づいたことがあります。私がいちばん笑顔になれるのは、素敵な服を着ているときだと。',
            'だったら今度は、着る人を笑顔にする服を私が作ろう。そう決めて、2025年7月にKURUMIを立ち上げました。',
          ],
        },
        {
          h: 'なぜ「和」なのか',
          p: [
            '和の美しさは、言葉がなくても伝わります。日本の人も、海外の人も、和の装いを見ると「素敵！」と笑顔になります。',
            '和は、世界の共通言語になれる。そう信じて、和を取り入れたブランドにしました。',
          ],
        },
        {
          h: '笑顔の輪に託す願い',
          p: [
            '沖縄で過ごした日々の中で、平和の尊さを考える機会がたくさんありました。',
            '人と人が笑顔の輪でつながれば、世界はもう少しやさしくなれる。一着の服が、その小さなきっかけになれたら。そんな希望を、KURUMIに託しています。',
          ],
        },
        {
          h: '新しい和',
          p: [
            'KURUMIは、着物のリメイクをしません。西陣織を中心に、紅型、ちりめん、シルクなどの和の生地を、レースやレザー、英国やイタリアのスーツ生地と掛け合わせ、まったく新しい一着を一から仕立てます。',
            '着物でも和装でもない、日常やパーティーで和を楽しむための服。それが私たちの「新しい和」です。',
          ],
        },
      ],
      valuesTitle: '大切にしていること',
      values: [
        { h: 'バランス', p: '色もシルエットも、着る人がいちばん美しく見えるかどうか。' },
        { h: 'デザイン', p: '異素材を大胆に掛け合わせ、自由で、他にはない一着を。' },
        { h: '笑顔の輪', p: '着る人も、それを見る人も、「素敵」と笑顔になる服を。' },
      ],
      milanTitle: 'ミラノ「繋がる」',
      milan: [
        '2026年2月25日、Milan GX Fashion Week 2026で、ドレス6着、ジャケット・スーツ3着、コート1着の計10着を発表しました。',
        'テーマは「繋がる」。和の服をミラノで発表し、日本と世界をつなぐ。紅型のドレスには、イタリア国旗の色を込めました。',
      ],
      futureTitle: 'これから',
      future: [
        '3年後には日本にお店を、5年後には海外にもお店を。',
        '「日本のブランド」と聞いてKURUMIを思い浮かべる人が、国内にも海外にもいる。そんな未来を目指しています。',
      ],
    },

    designer: {
      name: '横山 胡桃',
      kana: 'よこやま くるみ',
      role: 'デザイナー',
      profile: [
        '神奈川県生まれ。中学生のときに家族で沖縄へ移り、モデル・タレントとして活動を始める。テレビ、ラジオ、CM、舞台、司会など幅広く出演し、東京に拠点を移しても活動を続ける。',
        '2025年7月にブランドKURUMIを立ち上げ、2026年2月にMilan GX Fashion Week 2026でコレクションを発表。【要確認：正式名称】オーダースーツ協会の認定を取得。',
      ],
      viewTitle: 'デザインの視点',
      view: [
        '着物が身近にない環境で育ったからこそ、和を外から自由に見つめられる。大河ドラマ『江』に描かれた女性の強さと奥ゆかしさに心を動かされたことも、和に惹かれたきっかけのひとつです。',
        'モデルとして磨いた「どうすれば美しく見えるか」という目が、シルエットとバランスに活きています。',
      ],
      photoPending: 'プロフィール写真（受け取り待ち）',
      careerTitle: '主な実績',
      career: [
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
      title: '和の布から生まれた、世界に一つの一着。',
      lead: 'Milan GX Fashion Week 2026で発表したコレクション「繋がる」より。西陣織、紅型、ちりめん、シルクを、レースやレザー、英国やイタリアのスーツ生地と掛け合わせました。ここにある作品をもとに、あなたのための一着をお仕立てします。',
      all: 'すべて',
      orderFromThis: 'この作品をもとにオーダーを相談する',
      back: '作品一覧へ戻る',
      materials: '使った生地',
      materialsTbc: '【要確認】',
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
      title: 'あなたと、その日のために仕立てる一着。',
      lead: 'KURUMIの服は、すべてオーダーメイドです。お好みや着ていく場面に合わせて、柄の見せ方やシルエットを一緒に決めていきます。',
      priceTitle: '参考価格',
      flowTitle: 'オーダーの流れ',
      flow: [
        { h: 'お問い合わせ', p: 'フォームから、ご希望のアイテムや着用予定日をお知らせください。' },
        { h: '採寸', p: '対面で採寸し、デザインや生地を一緒に決めます。' },
        { h: '納品', p: '採寸からおよそ1か月〜1か月半でお渡しします。' },
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
        { q: '着物などを持ち込んで作れますか？', a: '思い出の着物で作りたいなどのご希望は、内容によってご相談をお受けします。' },
        { q: '採寸はどこで？', a: '【要確認】' },
        { q: '海外からもオーダーできますか？', a: '【要確認】' },
      ],
    },

    contact: {
      title: 'オーダーのご相談は、こちらから。',
      lead: 'まだイメージが固まっていなくても大丈夫です。着ていきたい場面を教えていただければ、一緒に考えます。',
      required: '必須',
      fields: {
        name: 'お名前',
        email: 'メールアドレス',
        item: '希望アイテム',
        items: ['ジャケット', 'ドレス', 'スーツ', 'ワンピース', 'その他・相談したい'],
        budget: 'ご予算',
        budgets: ['30〜40万円', '40〜60万円', '60万円以上', '相談したい'],
        date: '着用予定日（未定でも可）',
        scene: '着用シーン',
        scenes: ['登壇・スピーチ', '交流会', '会食・パーティー', '海外での場', '普段使い', 'その他'],
        fabric: '素材の持ち込み',
        fabrics: ['あり', 'なし', '相談したい'],
        message: 'ご要望・ご質問',
      },
      submit: '送信する',
      sending: '送信中…',
      thanks: 'お問い合わせありがとうございます。内容を確認し、【要確認：返信の目安】以内にご連絡します。',
      error: '送信できませんでした。時間をおいて、もう一度お試しください。',
      notReady: '（プレビュー版のため、まだ送信できません）',
      privacyNote: '送信いただいた情報は、プライバシーポリシーに沿って取り扱います。',
    },

    company: {
      title: '会社情報',
      rows: [
        { h: '会社名', p: '合同会社Kurumi&Co.' },
        { h: '代表者', p: '代表社員 横山 胡桃【要確認】' },
        { h: '設立', p: '【要確認】' },
        { h: '事業内容', p: 'アパレルブランド「KURUMI」の企画・製作・販売 / マーケティング事業【要確認】' },
        { h: 'お問い合わせ', p: 'お問い合わせフォームより' },
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

    journal: { title: 'お知らせ・ブログ', empty: '記事は準備中です。', back: '一覧へ戻る' },

    seo: {
      home: { title: 'KURUMI｜和の生地で仕立てるオーダーメイドのドレス・ジャケット', desc: '西陣織や紅型など和の生地から、ドレスやジャケットを一から仕立てるオーダーメイドブランド。Milan GX Fashion Week 2026でコレクションを発表。' },
      story: { title: 'ブランドストーリー｜KURUMI', desc: '和を日常に。和で繋ぐ世界。笑顔の輪を広げたいという思いから生まれた、KURUMIの物語と「新しい和」の考え方。' },
      designer: { title: 'デザイナー 横山胡桃｜KURUMI', desc: 'モデル・タレントとして活動してきた横山胡桃のプロフィールと経歴。着る人を美しく見せる、KURUMIのデザインの視点。' },
      collection: { title: '作品一覧｜西陣織・紅型のドレスとジャケット｜KURUMI', desc: 'ミラノで発表したコレクション「繋がる」より。和の生地とレースやレザーを掛け合わせたドレス、ジャケット、スーツ。' },
      order: { title: 'オーダーについて｜価格と流れ｜KURUMI', desc: 'ジャケット30万円〜。対面での採寸からおよそ1か月〜1か月半でお渡し。着ていく場面に合わせて仕立てる、KURUMIのオーダーメイド。' },
      contact: { title: 'お問い合わせ｜KURUMI', desc: 'オーダーのご相談はこちらから。着ていきたい場面を教えていただければ、一緒に考えます。' },
      journal: { title: 'お知らせ・ブログ｜KURUMI', desc: 'KURUMIのお知らせ、コレクション、制作の裏側、和の文化について。' },
      company: { title: '会社情報｜KURUMI', desc: '合同会社Kurumi&Co.の会社情報。' },
      privacy: { title: 'プライバシーポリシー｜KURUMI', desc: '合同会社Kurumi&Co.のプライバシーポリシー。' },
    },
  },

  en: {
    site: 'KURUMI',
    catch: 'Wear KURUMI. Color the world.',
    philosophy: 'Wa for every day. A world connected through wa.',
    nav: [
      { href: 'story/', label: 'STORY', sub: 'Our Story' },
      { href: 'designer/', label: 'DESIGNER', sub: 'The Designer' },
      { href: 'collection/', label: 'COLLECTION', sub: 'Works' },
      { href: 'order/', label: 'ORDER', sub: 'Made to Order' },
      { href: 'journal/', label: 'JOURNAL', sub: 'Journal' },
      { href: 'contact/', label: 'CONTACT', sub: 'Contact' },
    ],
    cta: 'Request a Consultation',
    langSwitch: '日本語',
    footer: { company: 'Company', privacy: 'Privacy Policy', copyright: '© 2026 Kurumi&Co. LLC' },
    menu: 'Menu',
    close: 'Close',

    home: {
      heroSub: 'A new Japanese elegance, unveiled in Milan.',
      conceptTitle: 'Not a kimono. Not a remake.',
      conceptBody:
        'From Nishijin brocade, Ryukyu bingata and silk chirimen, KURUMI creates entirely new dresses and jackets. This is our new wa.',
      storyTitle: 'Wa needs no translation.',
      storyBody: 'When someone smiles and says "beautiful," there are no borders. KURUMI spreads that circle of smiles, one garment at a time.',
      storyMore: 'Read our story',
      collectionBody: 'Selected from the collection presented at Milan GX Fashion Week 2026.',
      collectionMore: 'View the collection',
      designerTitle: 'Designer Kurumi Yokoyama',
      designerBody: 'Years as a model taught her what makes a person look their best. Every silhouette she draws is made to do exactly that.',
      designerMore: 'About the designer',
      orderTitle: 'Every piece is made to order.',
      orderBody: 'Ready about 4 to 6 weeks after your fitting.',
      orderMore: 'How to order',
      journalEmpty: 'Posts are coming soon.',
      finalTitle: 'A piece made for you.',
      finalBody: 'For the stage, an important dinner, a party abroad. Tailored to you and your day.',
    },

    prices: [
      { item: 'Jackets', price: 'from ¥300,000' },
      { item: 'Dresses', price: 'from ¥350,000' },
      { item: 'Suits', price: 'from ¥380,000' },
    ],
    priceNote: 'Prices vary with fabric and design. [TBC: tax]',

    story: {
      title: 'Connecting the world through wa.',
      sections: [
        {
          h: 'It began with a smile',
          p: [
            'I grew up in a family that was always laughing. They are still my greatest pride.',
            'When I worked in radio, a listener once told me, with a big smile, that hearing my cheerful voice each morning gave them the energy to face the day. In that moment I knew what I wanted: to bring energy and smiles to people, like the sun.',
          ],
        },
        {
          h: 'Finding fashion',
          p: [
            'Working as a model and TV personality, I noticed something: I smile most when I am wearing something beautiful.',
            'So I decided to make clothes that bring that same smile to whoever wears them. I launched KURUMI in July 2025.',
          ],
        },
        {
          h: 'Why wa',
          p: [
            'The beauty of wa, the Japanese aesthetic, needs no words. In Japan or abroad, people see it and smile: "How beautiful!"',
            'I believe wa can be a language the whole world shares. That is why KURUMI is built on it.',
          ],
        },
        {
          h: 'A hope woven in',
          p: [
            'Growing up in Okinawa, I often found myself thinking about how precious peace is.',
            'When people are connected by smiles, the world becomes a little kinder. If a single garment can be a small part of that, it is enough. That hope is woven into KURUMI.',
          ],
        },
        {
          h: 'A new wa',
          p: [
            'KURUMI does not remake kimono. We start from Japanese textiles, chiefly Nishijin brocade, along with Ryukyu bingata, chirimen and silk, and pair them with lace, leather and British and Italian suiting to create entirely new pieces.',
            'Not kimono, not traditional dress, but clothes for enjoying wa in everyday life and at parties. This is our new wa.',
          ],
        },
      ],
      valuesTitle: 'What we value',
      values: [
        { h: 'Balance', p: 'Color and silhouette, always chosen to make the wearer look their most beautiful.' },
        { h: 'Design', p: 'Bold, free pairings of materials for pieces like no other.' },
        { h: 'A circle of smiles', p: 'Clothes that make both the wearer and everyone around them say "beautiful."' },
      ],
      milanTitle: 'Milan: Connect',
      milan: [
        'On February 25, 2026, KURUMI presented ten looks at Milan GX Fashion Week 2026: six dresses, three jackets and suits, and one coat.',
        'The theme was "Connect": Japanese garments shown in Milan, linking Japan and the world. One bingata dress carries the colors of the Italian flag.',
      ],
      futureTitle: 'What comes next',
      future: [
        'A store in Japan within three years, and abroad within five.',
        'Our goal is simple: when people in Japan and around the world think of a Japanese brand, KURUMI comes to mind.',
      ],
    },

    designer: {
      name: 'KURUMI YOKOYAMA',
      kana: '',
      role: 'Designer',
      profile: [
        'Born in Kanagawa, Japan, Kurumi moved to Okinawa with her family as a teenager and began her career there as a model and TV personality, appearing on television, radio, commercials and stage, and as an event host. She later moved her base to Tokyo.',
        'In July 2025 she launched KURUMI, and in February 2026 presented her collection at Milan GX Fashion Week 2026. She is certified by [TBC: official name], a Japanese association for made-to-order suits.',
      ],
      viewTitle: 'Her eye for design',
      view: [
        'Because kimono were never part of her everyday life, Kurumi sees wa with fresh, free eyes. She was also drawn to it through the historical drama Gō, moved by the strength and grace of the women it portrays.',
        'Her years as a model gave her an instinct for what makes a person look beautiful, and it shows in every silhouette and every balance of color.',
      ],
      photoPending: 'Profile photo (coming soon)',
      careerTitle: 'Selected work',
      career: [
        { h: 'Awards', p: 'Grand Prix, MISS GOLF 2023 Okinawa / Runner-up, MISS GOLF 2023 Japan Final / Grand Prix, MISS ORIENTAL 2022 Fukuoka / Grand Prix, JAPAN WOMEN\'S COLLECTION 2020 Okinawa' },
        { h: 'Media', p: 'Regular radio host and reporter on FM Yokohama and RBCi Radio; producer, director and presenter of the golf TV show GOLFBEAT (Ryukyu Broadcasting); commercials for AEON Ryukyu, ATSUGI and others, plus web and print work for ANA, Dunlop and more; stage roles in Tokyo and Okinawa; event host.' },
      ],
    },

    collection: {
      title: 'One-of-a-kind pieces, born from Japanese textiles.',
      lead: 'From Connect, the collection presented at Milan GX Fashion Week 2026. Nishijin brocade, Ryukyu bingata, chirimen and silk, paired with lace, leather and British and Italian suiting. Any piece here can be the starting point for one made just for you.',
      all: 'All',
      orderFromThis: 'Request a piece inspired by this design',
      back: 'Back to the collection',
      materials: 'Materials',
      materialsTbc: '[TBC]',
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
      title: 'A piece tailored to you, and to your day.',
      lead: 'Every KURUMI piece is made to order. Together we decide how the pattern is placed and how the silhouette falls, based on your taste and the occasion.',
      priceTitle: 'Pricing',
      flowTitle: 'How it works',
      flow: [
        { h: 'Inquiry', p: 'Tell us through the form what you would like and when you plan to wear it.' },
        { h: 'Fitting', p: 'We take your measurements in person and choose the design and fabric together.' },
        { h: 'Delivery', p: 'Your piece is ready about 4 to 6 weeks after the fitting.' },
      ],
      scenesTitle: 'Made for moments like',
      scenes: ['Speaking on stage or in front of an audience', 'Networking events where you want to be remembered', 'Important dinners, parties and dates', 'Welcoming international guests, or parties abroad'],
      voicesTitle: 'From our clients',
      voices: [
        "Because it's a jacket, I can wear it to dinners and every day. I love it.",
        'One piece, and my whole look came alive.',
        'At networking events, people now come up and talk to me first.',
        "My international guests said 'beautiful!' and the conversation just flowed.",
        'The design is stunning.',
      ],
      faqTitle: 'FAQ',
      faq: [
        { q: 'How can I pay?', a: 'By bank transfer or credit card.' },
        { q: 'Can I bring my own fabric, such as a family kimono?', a: 'We are happy to discuss it. Please tell us about it when you inquire.' },
        { q: 'Where is the fitting?', a: '[TBC]' },
        { q: 'Can I order from outside Japan?', a: '[TBC]' },
      ],
    },

    contact: {
      title: 'Start your made-to-order consultation here.',
      lead: "No need to have everything decided. Just tell us where you'd like to wear it, and we'll take it from there together.",
      required: 'Required',
      fields: {
        name: 'Name',
        email: 'Email',
        item: 'Item',
        items: ['Jacket', 'Dress', 'Suit', 'One-piece', 'Other, or not sure yet'],
        budget: 'Budget',
        budgets: ['¥300,000–400,000', '¥400,000–600,000', 'Over ¥600,000', "Let's discuss"],
        date: 'Date you plan to wear it (optional)',
        scene: 'Occasion',
        scenes: ['Speaking event', 'Networking', 'Dinner or party', 'Event abroad', 'Everyday', 'Other'],
        fabric: 'Bringing your own fabric',
        fabrics: ['Yes', 'No', 'Would like to discuss'],
        message: "Anything else you'd like to tell us",
      },
      submit: 'Send',
      sending: 'Sending…',
      thanks: 'Thank you for reaching out. We will reply within [TBC].',
      error: 'Something went wrong. Please try again later.',
      notReady: '(Preview only: the form is not connected yet)',
      privacyNote: 'Your information is handled in line with our privacy policy.',
    },

    company: {
      title: 'Company',
      rows: [
        { h: 'Company', p: 'Kurumi&Co. LLC' },
        { h: 'Representative', p: 'Kurumi Yokoyama' },
        { h: 'Established', p: '[TBC]' },
        { h: 'Business', p: 'Design, production and sale of the fashion brand KURUMI / Marketing services' },
        { h: 'Contact', p: 'Via the contact form' },
      ],
    },

    privacy: {
      title: 'Privacy Policy',
      body: [
        'Kurumi&Co. LLC ("we") handles the personal information you provide through our contact form (such as your name, email address and inquiry) as follows.',
        'Purpose: to reply to your inquiry and to discuss and arrange your order.',
        'Sharing: we do not share your information with third parties without your consent, except where required by law.',
        'Management: we keep your information secure and delete it when it is no longer needed.',
        'Contact: to see, correct or delete your information, please reach us through the contact form.',
      ],
    },

    journal: { title: 'Journal', empty: 'Posts are coming soon.', back: 'Back to the journal' },

    seo: {
      home: { title: 'KURUMI – Made-to-Order Dresses and Jackets in Japanese Textiles', desc: 'Made-to-order dresses and jackets crafted from Nishijin brocade, bingata and other Japanese textiles. Presented at Milan GX Fashion Week 2026.' },
      story: { title: 'Our Story – KURUMI', desc: 'Wa for every day. How a wish to spread smiles became KURUMI, and what we mean by a new wa.' },
      designer: { title: 'Designer Kurumi Yokoyama – KURUMI', desc: 'Meet Kurumi Yokoyama, the model and TV personality turned designer behind KURUMI.' },
      collection: { title: 'Collection – Nishijin and Bingata Dresses and Jackets – KURUMI', desc: 'From Connect, our Milan collection: dresses, jackets and suits pairing Japanese textiles with lace and leather.' },
      order: { title: 'Made to Order – Pricing and Process – KURUMI', desc: 'Jackets from ¥300,000. Fitted in person and ready in about 4 to 6 weeks, each piece is tailored to you and your occasion.' },
      contact: { title: 'Contact – KURUMI', desc: "Start your made-to-order consultation. Tell us where you'd like to wear it." },
      journal: { title: 'Journal – KURUMI', desc: 'News, collections, behind the scenes and Japanese culture from KURUMI.' },
      company: { title: 'Company – KURUMI', desc: 'Company information for Kurumi&Co. LLC.' },
      privacy: { title: 'Privacy Policy – KURUMI', desc: 'Privacy policy of Kurumi&Co. LLC.' },
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
