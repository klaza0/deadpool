import type { L } from "@/i18n/text";

export const nav: { id: string; label: L; href: string }[] = [
  { id: "home", label: { en: "Home", ar: "الرئيسية" }, href: "#home" },
  { id: "story", label: { en: "Story", ar: "الحكاية" }, href: "#story" },
  { id: "abilities", label: { en: "Abilities", ar: "القدرات" }, href: "#abilities" },
  { id: "gallery", label: { en: "Gallery", ar: "المعرض" }, href: "#gallery" },
  { id: "multiverse", label: { en: "Multiverse", ar: "الأكوان" }, href: "#multiverse" },
  { id: "experience", label: { en: "Experience", ar: "التجربة" }, href: "#experience" },
];

export const chapters: { kicker: L; title: L; body: L }[] = [
  {
    kicker: { en: "Before the suit", ar: "قبل البدلة" },
    title: { en: "A mercenary with a prognosis", ar: "مرتزق عنده معاد" },
    body: {
      en: "Wade Wilson took violent work before he took a codename. In the comics he is Canadian. In the films he is a fast-talking gun-for-hire who runs out of time when he gets sick. The job description never included a moral. It included a deadline.",
      ar: "ويد ويلسون كان شغال مرتزق قبل ما ياخد الاسم. في الكوميكس كندي، وفي الأفلام لسانه طويل والمرض خلّص وقته. الشغل ما كانش فيه أخلاق، كان فيه ميعاد.",
    },
  },
  {
    kicker: { en: "The procedure", ar: "العملية" },
    title: {
      en: "Weapon X, and the workshop that borrowed its nightmare",
      ar: "ويبون إكس، والورشة اللي سرقت الكابوس",
    },
    body: {
      en: "The comics tie his transformation to Weapon X, the same black-budget program associated with Wolverine. The 2016 film turns that history into Ajax's illegal workshop: a brutal attempt to wake a healing factor and treat Wade's cancer. Those are two tellings. Both end with a man who can survive almost anything and wishes the cure had been kinder.",
      ar: "الكوميكس ربطت اللي حصل له ببرنامج ويبون إكس، نفس البرنامج اللي طلع منه وولفرين. فيلم ٢٠١٦ خلّاها ورشة أجاكس: محاولة وحشة تصحّي الشفاء وتعالج السرطان. حكايتين، والنتيجة واحدة. راجل مش بيموت، وندمان إن العلاج كان بالشكل ده.",
    },
  },
  {
    kicker: { en: "The invoice", ar: "الفاتورة" },
    title: { en: "Healing that never clocks out", ar: "شفاء مش بيبطّل" },
    body: {
      en: "Regeneration is the headline. Tissue, limbs, days that should have ended him. He still feels it. The scarred skin in most versions is the bill that never clears, because the healing factor keeps the damage — including his cancer, in the film telling — from finishing the job.",
      ar: "الشفاء هو الخبر الكبير. جسمه بيرجع، بس الألم بيفضل. الجلد المتندب فاتورة مش بتتقفل، لأن الشفاء مش بيسيّب المرض يخلّصه.",
    },
  },
  {
    kicker: { en: "The personality", ar: "الشخصية" },
    title: { en: "Chaos, said out loud", ar: "فوضى بصوت عالي" },
    body: {
      en: "He will abandon a plan mid-sentence if the sentence is funnier. Allies get nicknames. Enemies get monologues. The violence is real, and so is the refusal to pretend it is noble. Treat him as a protagonist and he will annotate you.",
      ar: "يسيب الخطة في نص الجملة لو الجملة هتضحك. الحبايب ياخدوا ألقاب، والأعداء ياخدوا مونولوج. العنف حقيقي، وهو رافض يمثل البطل النضيف.",
    },
  },
  {
    kicker: { en: "The audience", ar: "الجمهور" },
    title: { en: "The fourth wall is a suggestion", ar: "الجدار الرابع اقتراح" },
    body: {
      en: "Most heroes pretend the edge of the panel is the edge of the world. Wade reads the credits. In the comics, talking to the reader became part of the character. The films aim that habit at the lens: the studio, the actor, the formula. It is a storytelling trait, not a lab measurement.",
      ar: "الأبطال التانيين بيتصرفوا إن حدود اللوحة هي نهاية العالم. ويد بيكلّم القارئ في الكوميكس، والكاميرا في الأفلام. دي عادته، مش قوة متقاسة في معمل.",
    },
  },
];

export type PowerIcon = "heal" | "blades" | "guns" | "combat" | "wall" | "chaos" | "food";

export const powers: {
  icon: PowerIcon;
  title: L;
  copy: L;
  image: string;
  alt: L;
  focus: string;
}[] = [
  {
    icon: "heal",
    title: { en: "Regenerative healing factor", ar: "جسمه بيرجع" },
    copy: {
      en: "Catastrophic injury is a pause, not a conclusion. He recovers inside the stories. He does not get a numbness upgrade. The pain stays, which is why the jokes are so loud.",
      ar: "أي إصابة وقفة، مش نهاية. جسمه بيرجع، بس الإحساس مش بيختفي. عشان كده النكت عالية كده.",
    },
    image: "/images/pow-heal.jpg",
    alt: {
      en: "Red mask and a torn sleeve stitching itself closed. Unofficial.",
      ar: "قناع أحمر وكم ممزق بيرجع يتقفل. غير رسمي.",
    },
    focus: "object-center",
  },
  {
    icon: "blades",
    title: { en: "Dual katanas", ar: "سيفين كاتانا" },
    copy: {
      en: "Two swords, carried like a punchline he is willing to finish. Close range, theatrical, and much less subtle than the mouth. The mouth is also a weapon. The swords are just more honest.",
      ar: "سيفين قريبين وفيهم استعراض. بقه سلاح برضو، بس السيوف أصرح.",
    },
    image: "/images/pow-blades.jpg",
    alt: {
      en: "Two katanas crossed in front of the red mask. Unofficial.",
      ar: "سيفان متقاطعان قدام القناع الأحمر. غير رسمي.",
    },
    focus: "object-center",
  },
  {
    icon: "guns",
    title: { en: "Firearms", ar: "المسدسات" },
    copy: {
      en: "Pistols are the default. Everything else is improvisation. The films and comics both treat his arsenal as a joke that still leaves holes in the set.",
      ar: "المسدسات الأساسي، والباقي ارتجال. الترسانة نكتة، بس بتخرّم الديكور.",
    },
    image: "/images/pow-guns.jpg",
    alt: {
      en: "Red mask aiming two pistols. Unofficial.",
      ar: "قناع أحمر مصوّب مسدسين. غير رسمي.",
    },
    focus: "object-center",
  },
  {
    icon: "combat",
    title: { en: "Martial arts and combat", ar: "القتال" },
    copy: {
      en: "He is a trained fighter, not a man who trips into victory. Acrobatic, dirty, and happy to ignore the honorable version of a move if the cheap one lands first.",
      ar: "مقاتل متدرب، مش واحد بيكسب بالصدفة. بيلعب وسخ، ولو الحركة الرخيصة هتوصل الأول هيستخدمها.",
    },
    image: "/images/pow-combat.jpg",
    alt: {
      en: "Red and black suit mid-kick, katanas still on the back. Unofficial.",
      ar: "بدلة أحمر وأسود في ركلة، والسيوف لسه على الضهر. غير رسمي.",
    },
    focus: "object-center",
  },
  {
    icon: "wall",
    title: { en: "Fourth-wall awareness", ar: "بيكلّم الجمهور" },
    copy: {
      en: "He addresses the reader in print and the camera on screen. Played as a power. Functionally, it is the character noticing the story he is inside — and refusing to behave for it.",
      ar: "بيكلّم القارئ والكاميرا. مش قوة معمّلة. هو شايف إنه جوه قصة، ورافض يتمثل ليها.",
    },
    image: "/images/pow-wall.jpg",
    alt: {
      en: "Red mask ripping through a comic panel and pointing out. Unofficial.",
      ar: "قناع أحمر بيخرق لوحة كوميكس وبيشاور بره. غير رسمي.",
    },
    focus: "object-center",
  },
  {
    icon: "chaos",
    title: { en: "Unpredictability", ar: "مش هتتوقعه" },
    copy: {
      en: "Plans do not survive contact with his attention span. He changes tactics because he is chaotic, not because a guidebook assigned him a percentage. Allies hate this. Editors hate it more.",
      ar: "الخطط بتموت أول ما يزهق. بيغيّر الطريقة لأنه فوضوي، مش لأن فيه نسبة مكتوبة. صحابه بيتضايقوا، والمحررين أكتر.",
    },
    image: "/images/pow-chaos.jpg",
    alt: {
      en: "Red suit spinning with a katana in one hand and a takeout bag in the other. Unofficial.",
      ar: "بدلة حمراء بتلف، سيف في إيد وكيس أكل في التانية. غير رسمي.",
    },
    focus: "object-center",
  },
  {
    icon: "food",
    title: { en: "Chimichanga", ar: "شيميتشانجا" },
    copy: {
      en: "The favorite meal. A burrito fried until the tortilla goes crisp and the filling stays loud. The films turned the order into a running bit, and he treats the plate like a personality trait. Maximum effort, then the fryer.",
      ar: "الأكلة المفضلة. بوريتو متقلي لحد ما التورتيلا تقرمش والحشو يفضل صاخب. الأفلام خلّتها نكتة متكررة، وهو بياخد الطبق على إنه جزء من شخصيته. أقصى مجهود، وبعدين القلاية.",
    },
    image: "/images/pow-food.jpg",
    alt: {
      en: "Red mask holding a fried chimichanga. Unofficial.",
      ar: "قناع أحمر ماسك شيميتشانجا مقلية. غير رسمي.",
    },
    focus: "object-center",
  },
];

export type GallerySlide = {
  src: string;
  alt: L;
  kicker: L;
  caption: L;
  focus: string;
};

export const gallery: GallerySlide[] = [
  {
    src: "/images/gal-jump.jpg",
    alt: {
      en: "Red and black suit leaping between two rooftops with a katana in each hand. Unofficial.",
      ar: "بدلة أحمر وأسود بتقفز بين سطحين، سيف في كل إيد. غير رسمي.",
    },
    kicker: { en: "01 — The jump", ar: "01 — القفزة" },
    caption: {
      en: "Two roofs. Two swords. The city stays underneath.",
      ar: "سطحين. سيفين. المدينة تفضل تحت.",
    },
    focus: "object-center",
  },
  {
    src: "/images/gal-rain2.jpg",
    alt: {
      en: "Red mask standing in the rain under one streetlamp, a sword on the shoulder. Unofficial.",
      ar: "قناع أحمر واقف في المطر تحت عامود نور، والسيف على الكتف. غير رسمي.",
    },
    kicker: { en: "02 — Rain check", ar: "02 — المطر" },
    caption: {
      en: "One lamp. One sword on the shoulder. Rain included.",
      ar: "لمبة واحدة. سيف على الكتف. والمطر داخل.",
    },
    focus: "object-center",
  },
  {
    src: "/images/gal-ride2.jpg",
    alt: {
      en: "Red mask riding a motorcycle on an empty night highway, no helmet. Unofficial.",
      ar: "قناع أحمر على موتوسيكل في طريق فاضي بالليل، من غير خوذة. غير رسمي.",
    },
    kicker: { en: "03 — Night ride", ar: "03 — السكة" },
    caption: {
      en: "Empty highway. No helmet. The mask is doing that job.",
      ar: "طريق فاضي. مفيش خوذة. القناع شايل المهمة.",
    },
    focus: "object-center",
  },
  {
    src: "/images/gal-sign.jpg",
    alt: {
      en: "Red and black suit crouched on a neon billboard above the city. Unofficial.",
      ar: "بدلة أحمر وأسود جاثية على لوحة نيون فوق المدينة. غير رسمي.",
    },
    kicker: { en: "04 — Above it", ar: "04 — من فوق" },
    caption: {
      en: "Crouched on the sign. The city has to look up.",
      ar: "جاثي على اللوحة. المدينة مضطرة تبص لفوق.",
    },
    focus: "object-center",
  },
];

export const timeline: { id: string; year: L; title: L; copy: L }[] = [
  {
    id: "film-2016",
    year: { en: "2016", ar: "2016" },
    title: { en: "Deadpool", ar: "ديدبول" },
    copy: {
      en: "Tim Miller directs. Ryan Reynolds plays Wade. The theatrical film goes R-rated and stays there: a mercenary, a diagnosis, Vanessa, and Ajax's workshop. It talks to the camera the way the comics talk to the reader.",
      ar: "تيم ميلر مخرج، ورايان رينولدز هو ويد. الفيلم للكبار وبجد: مرتزق، مرض، فانيسا، وورشة أجاكس. بيكلّم الكاميرا زي ما الكوميكس بتكلّم القارئ.",
    },
  },
  {
    id: "film-2018",
    year: { en: "2018", ar: "2018" },
    title: { en: "Deadpool 2", ar: "ديدبول 2" },
    copy: {
      en: "David Leitch directs. Cable shows up from a worse future, Domino trusts luck, and the X-Force sequence is a joke with consequences. Wade is grieving, recruiting, and still treating franchise etiquette like a suggestion.",
      ar: "ديفيد ليتش مخرج. كيبل جاي من مستقبل أوحش، ودومينو واثقة في الحظ، ومشهد إكس فورس نكتة ليها عواقب. ويد حزين، وبيلم ناس، ولسه مش فارق معاه قواعد السلسلة.",
    },
  },
  {
    id: "film-2024",
    year: { en: "2024", ar: "2024" },
    title: { en: "Deadpool & Wolverine", ar: "ديدبول وولفرين" },
    copy: {
      en: "Shawn Levy directs. Hugh Jackman returns as Wolverine. The story drags both of them through multiverse machinery, lets them tear into each other, then points them at something worse than their argument.",
      ar: "شون ليفي مخرج، وهيو جاكمان راجع وولفرين. الاتنين بيتسحبوا في حكاية الأكوان، يتخانقوا، وبعدين يروحوا على حاجة أوحش من خناقتهم.",
    },
  },
  {
    id: "pair",
    year: { en: "Wade / Logan", ar: "ويد / لوجان" },
    title: { en: "A terrible pairing that works", ar: "ثنائي وحش وبيمشي" },
    copy: {
      en: "Wolverine is the exhausted straight man. Wade is the commentary track that learned to hold a sword. The chemistry is irritation with loyalty under it. Neither of them is going to say that out loud until the building is already on fire.",
      ar: "وولفرين هو الجدّ المرهق. ويد هو التعليق اللي ماسك سيف. الاتنين متضايقين من بعض، وموالين لبعض، ومش هيقولوا كده غير لما الدنيا تولع.",
    },
  },
  {
    id: "wall",
    year: { en: "Always", ar: "دايمًا" },
    title: { en: "The fourth wall", ar: "الجدار الرابع" },
    copy: {
      en: "The comics made the reader part of the conversation. The films aim the same habit at the lens: the studio, the actor, the superhero cycle. He is not breaking a rule so much as admitting he can see it.",
      ar: "في الكوميكس بيكلّم القارئ. في الأفلام بيكلّم الكاميرا: الاستوديو، الممثل، وروتين الأبطال. مش بيكسر قاعدة قد ما بيعترف إنه شايفها.",
    },
  },
];

export const quotes: L[] = [
  {
    en: "Oh, you scrolled. Character growth. I'm disgusted and a little proud.",
    ar: "نزلت لتحت؟ تطور. متقرف وشوية فخور.",
  },
  {
    en: "If you're hunting for a moral, try the next universe. This one is booked.",
    ar: "لو عايز عبرة، روح كون تاني. الكون ده مليان.",
  },
  {
    en: "I heal fast. Your attention span does not. Keep up.",
    ar: "أنا بخف بسرعة. أنت لأ. الحقني.",
  },
  {
    en: "A fan site. Adorable. I usually charge extra for being perceived.",
    ar: "موقع معجبين؟ حلو. أنا عادة باخد فلوس زيادة عشان حد يشوفني.",
  },
  {
    en: "Wolverine would tell you to leave. I would tell you to stay and make it weird.",
    ar: "وولفرين هيقولك امشي. أنا هقولك اقعد وخلّيها غريبة.",
  },
  {
    en: "Maximum effort is a lifestyle. Minimum effort is a condition I don't have.",
    ar: "أقصى مجهود ستايل حياة. أقل مجهود مش عندي.",
  },
  {
    en: "Yes, I'm talking to you. The other visitors already left. Amateurs.",
    ar: "أيوة بكلمك أنت. الباقيين مشوا.",
  },
  {
    en: "Do not try this at home. Do not try this in a comic. Do not try this.",
    ar: "متعملش كده في البيت. ولا في كوميكس. ولا خالص.",
  },
  {
    en: "I broke the fourth wall so often the drywall union filed a complaint.",
    ar: "كسرت الجدار الرابع لحد ما نقابة المحارة اشتكت.",
  },
  {
    en: "You pressed a button. Somewhere, a writer just got nervous.",
    ar: "دوست زرار، وفي حتة كاتب اتوتر.",
  },
];

export const regrets: L[] = [
  { en: "Called it. You pressed the button.", ar: "قولت لك. دوست الزرار." },
  {
    en: "That's going on a permanent record. I don't keep records. The point stands.",
    ar: "دي هتتسجل. أنا ما بعملش سجلات، بس الملاحظة واقفة.",
  },
  {
    en: "The button did what it promised. Your choices are the plot twist.",
    ar: "الزرار عمل اللي عليه. أنت اللي عملت القصة.",
  },
  {
    en: "Again? I regenerate. Your dignity is on its own.",
    ar: "تاني؟ أنا بخف. كرامتك لأ.",
  },
];

export type AchievementId = "chimichanga" | "eyes" | "logo" | "wall" | "maximum";

export const achievements: Record<AchievementId, { title: L; detail: L }> = {
  chimichanga: {
    title: { en: "Order up", ar: "الطلب جاهز" },
    detail: {
      en: "You typed the menu item. There was no password. There is now.",
      ar: "كتبت الأكلة. ما كانش فيه باسورد، بقى فيه.",
    },
  },
  eyes: {
    title: { en: "Eye contact", ar: "عين في عين" },
    detail: {
      en: "Both eyes. Bold. Most people only poke one and pretend it was an accident.",
      ar: "الاتنين. جريء. الناس بتدوس واحدة وتقول غلطة.",
    },
  },
  logo: {
    title: { en: "Logo abuse", ar: "اللوجو اتضايق" },
    detail: {
      en: "Four hits on the mark. It filed a complaint, then laughed.",
      ar: "أربع ضغطات. اشتكى، وبعدين ضحك.",
    },
  },
  wall: {
    title: { en: "Structural damage", ar: "الجدار اتكسر" },
    detail: {
      en: "You found the fourth wall. It found you back.",
      ar: "لقيت الشرخ. والشرخ لقاك.",
    },
  },
  maximum: {
    title: { en: "Maximum Effort", ar: "أقصى مجهود" },
    detail: {
      en: "Three secrets. One achievement. I am contractually impressed.",
      ar: "تلات أسرار. إنجاز واحد. متأثر بالعافية.",
    },
  },
};

export const secretHints: Record<AchievementId, L> = {
  chimichanga: {
    en: "How: type chimichanga on the keyboard. No box. Just the letters.",
    ar: "ازاي: اكتب chimichanga من الكيبورد. مفيش خانة، الحروف بس.",
  },
  eyes: {
    en: "How: poke both white lenses on the mask above.",
    ar: "ازاي: دوس العدستين البيضا على الماسك فوق.",
  },
  logo: {
    en: "How: click the DEADPOOL logo in the header four times. A 1/4 counter shows up.",
    ar: "ازاي: دوس لوجو DEADPOOL فوق أربع مرات. هيظهر عداد ١/٤.",
  },
  wall: {
    en: "How: go to the last section and press “There's a crack in the frame.”",
    ar: "ازاي: انزل لآخر سكشن ودوس على “There's a crack in the frame.”",
  },
  maximum: {
    en: "How: nothing. This opens by itself after any three of the four above.",
    ar: "ازاي: ولا حاجة. ده بيتفتح لوحده بعد أي تلاتة من الأربعة اللي فوق.",
  },
};
