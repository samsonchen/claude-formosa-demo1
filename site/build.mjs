// Builds the claude.formosa static site into docs/ for GitHub Pages.
// Usage: node site/build.mjs
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, '..', 'docs');

const LINKS = {
  discord: 'https://discord.gg/fWcPCyMBta',
  threads: 'https://www.threads.com/@claude.formosa',
  instagram: 'https://www.instagram.com/claude.formosa/',
};

const NEXT = { date: '10.30', short: '10/30', enShort: 'OCT 30' };

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const EVENTS = [
  {
    slug: '2026-08-28', no: '04', date: '2026.08.28',
    hero: 'p0828a.jpg', heroPos: '50% 40%', card: 'p0828b.jpg',
    gallery: ['p0828b.jpg', 'p0828c.jpg'],
    clips: [['2026-08-28-clip1.mp4', 'CLIP 01 · 18:10'], ['2026-08-28-clip2.mp4', 'CLIP 02 · 20:03']],
    zh: {
      title: 'Hermes Agent，和後 AI 時代的角色',
      heroAlt: 'Edward Kennedy 分享 Hermes Agent',
      cardWho: 'Jennifer 蔡珍珍、Edward Kennedy、Ethin 江，以及第一場對談',
      speakers: '3 位 + 對談',
      intro: '八月這場有三位講者分享，最後是我們第一次試辦的對談。',
      galleryAlt: ['8/28 分享現場', '8/28 會後徵求分享者'],
      talks: [
        { name: 'Jennifer 蔡珍珍', aff: '慈濟大學教育研究所', topic: '中文不是母語，在花蓮靠 AI 過日子',
          body: 'Jennifer 是來自印尼的留學生。中文不是她的母語，在花蓮生活的大小事她都會問 AI：超市裡不認得的菜、買東西時幫忙比較、出門旅遊的行程。她也順便介紹了幾位印尼目前的主要政治人物。' },
        { name: 'Edward Kennedy', aff: '第二次分享', topic: 'Hermes Agent 入門',
          body: '上次 Edward 講 Skills，這次介紹 Hermes Agent：agent 能做什麼，以及可以搭配哪些 VPS 和模型來跑。簡報頁面也收了上一次的資料。',
          links: [['簡報', 'https://latentwill.com/presentations/', 'latentwill.com/presentations']] },
        { name: 'Ethin 江', topic: '從想做一個遊戲，到 Hermes Agent 與 Claude Code',
          body: 'Ethin 一開始只是想自己做個遊戲，後來開始幫別人解決問題，就這樣用上了 Hermes Agent 和 Claude Code。' },
        { name: '對談', aff: 'Sophie Lin、Samson Chen、L 哥', topic: '後 AI 時代的角色重塑',
          body: '這是我們第一次試辦對談。除了兩位召集人，也請了在軟體業 19 年的 L 哥，一起談 AI 進來之後各種角色的分工。這場是我們在雲基地散場最晚的一次，謝謝縣府的閔恩協助。' },
      ],
    },
    en: {
      title: 'Hermes Agent, and roles after AI',
      heroAlt: 'Edward Kennedy presenting Hermes Agent',
      cardWho: 'Jennifer Tsai, Edward Kennedy, Ethin Chiang, and our first panel',
      speakers: '3 + panel',
      intro: 'Three talks in August, followed by our first panel discussion.',
      galleryAlt: ['A talk at the August meetup', 'Calling for speakers after the talks'],
      talks: [
        { name: 'Jennifer Tsai', aff: 'Institute of Education, Tzu Chi University', topic: "Getting by in Hualien with AI when Chinese isn't your first language",
          body: "Jennifer is an international student from Indonesia. Chinese isn't her first language, so she asks AI about most things in daily life in Hualien: vegetables she doesn't recognize at the supermarket, comparing options when shopping, and travel plans. She also introduced a few of Indonesia's current leading political figures." },
        { name: 'Edward Kennedy', aff: 'Second talk', topic: 'An introduction to Hermes Agent',
          body: 'Last time Edward covered Skills. This time he introduced Hermes Agent: what the agent does, and which VPS providers and models you can run it on. His presentations page also has the slides from last time.',
          links: [['Slides', 'https://latentwill.com/presentations/', 'latentwill.com/presentations']] },
        { name: 'Ethin Chiang', topic: 'From wanting to build a game to Hermes Agent and Claude Code',
          body: 'Ethin started out wanting to build a game of his own. Later he began helping other people solve problems, and that led him to Hermes Agent and Claude Code.' },
        { name: 'Panel', aff: 'Sophie Lin, Samson Chen, Mr. L', topic: 'Rethinking roles after AI',
          body: 'Our first panel. Along with two of the organizers, we invited Mr. L, who has worked in the software industry for 19 years, to talk about how work gets divided once AI is in the picture. We stayed later at Cloud Base than at any meetup before. Thanks to Min-En from the county government for the help.' },
      ],
    },
  },
  {
    slug: '2026-07-31', no: '03', date: '2026.07.31',
    hero: 'p0731b.jpg', heroPos: '50% 50%', card: 'p0731b.jpg',
    gallery: ['p0731a.jpg', 'p0731c.jpg'],
    zh: {
      title: '從工具創業到每日穿搭',
      heroAlt: '7/31 小聚現場',
      cardWho: 'Hauke、Allian Kazi、Tina Lin、Toby',
      speakers: '4 位',
      intro: '七月有四位講者，主題從工具型產品、醫療、穿搭到學術寫作。',
      galleryAlt: ['Hauke 介紹他開發過的軟體', '7/31 小聚現場'],
      talks: [
        { name: 'Hauke 浩克', topic: '用 AI 開發工具，以及工具型產品的市場經驗',
          body: 'Hauke 用 AI 開發了多個工具類程式，包括 freemium 的 Google Workspace 外掛，其中 Text to Table Converter 的下載量接近 4 萬。除了開發，他也分享了這類網路工具在市場和行銷上的經驗。常在 Google Docs 或 Gmail 裡做表格的話，可以試試看。',
          links: [['Google Workspace Marketplace', 'https://workspace.google.com/marketplace/app/text_to_table_converter/388744518554', 'Text to Table Converter'], ['說明', 'https://codoha.com/en/text-to-table/', 'codoha.com/en/text-to-table']] },
        { name: 'Allian Kazi', topic: '用 AI 改善醫療的共享決策',
          body: 'Allian 參與花蓮一家大型醫院的計畫，用 AI 改善 SDM（Shared Decision Making），也就是病人和醫護人員一起參與醫療決策、取得共識的過程。他推薦了兩個 skill：Grill Me 會反覆追問你的計畫，直到每個分支都講清楚；Improve Codebase Architecture 會掃描現有程式碼，找出可以改善的地方，產出報告後依你的選擇進行。',
          links: [['Grill Me', 'https://github.com/mattpocock/skills/tree/main/skills/productivity', 'mattpocock/skills · productivity'], ['Improve Codebase Architecture', 'https://github.com/mattpocock/skills/tree/main/skills/engineering', 'mattpocock/skills · engineering']] },
        { name: 'Tina Lin', topic: '讓 Claude 排一週的穿搭',
          body: 'Tina 把衣櫃裡的衣服和品牌告訴 Claude，請它先排好一整週的穿搭。有特別的約會可以另外安排，也可以指定想參考哪位偶像的風格。下面是她用來產生風格設定檔的提示詞，可以直接拿去試。',
          prompt: '我想打造一個個人穿搭建議的每週提醒 scheduled routine，請你擔任我的個人造型助理。\n請在我選定的資料夾裡建立 style-profile.md，包含這 9 節：\n1. 穿著者基本資料（含 1.1 每週生活節奏：週一到週末各自的行程性質）\n2. 設計師、品牌風格、常穿的品牌參考\n3. 風格關鍵字\n4. 色彩計畫（基底色 + 亮點色 + 避免什麼）\n5. 版型偏好\n6. 絕對不要的風格\n7. 場合配比（5 個名額，對應星期）\n8. 配件\n9. 天氣調整規則（依溫度分級 + 下雨怎麼換鞋）\n先用 6 個問題訪談我，等我回答完再依我的回答撰寫檔案。不要自己編內容。' },
        { name: 'Toby', topic: '用 Claude 讓論文更嚴謹，也用來規劃救災演練',
          body: 'Toby 用 Claude 協助把論文寫得更嚴謹，同時守住專業和學術誠信。他也示範了用 Claude 協助規劃救災演練的流程，並推薦一組學術寫作與研究用的 skills。',
          links: [['Academic Research Skills', 'https://github.com/Imbad0202/academic-research-skills', 'Imbad0202/academic-research-skills']] },
      ],
    },
    en: {
      title: 'From tool startups to daily outfits',
      heroAlt: 'The July meetup',
      cardWho: 'Hauke, Allian Kazi, Tina Lin, Toby',
      speakers: '4',
      intro: 'Four talks in July, covering tool products, healthcare, outfits, and academic writing.',
      galleryAlt: ['Hauke presenting software he built', 'The July meetup'],
      talks: [
        { name: 'Hauke', topic: 'Building tools with AI, and selling them',
          body: 'Hauke uses AI to build utility apps, including freemium Google Workspace add-ons. His Text to Table Converter has close to 40,000 downloads. He also talked about the market and marketing side of running this kind of web tool. If you often build tables in Google Docs or Gmail, give it a try.',
          links: [['Google Workspace Marketplace', 'https://workspace.google.com/marketplace/app/text_to_table_converter/388744518554', 'Text to Table Converter'], ['About', 'https://codoha.com/en/text-to-table/', 'codoha.com/en/text-to-table']] },
        { name: 'Allian Kazi', topic: 'Using AI to improve shared decision making in healthcare',
          body: 'Allian works on a project at one of the major hospitals in Hualien that uses AI to improve SDM (Shared Decision Making), the process where patients and clinicians make medical decisions together and reach agreement. He recommended two skills: Grill Me questions your plan until every branch is clear, and Improve Codebase Architecture scans your code for places to improve, writes a report, and then proceeds based on your choices.',
          links: [['Grill Me', 'https://github.com/mattpocock/skills/tree/main/skills/productivity', 'mattpocock/skills · productivity'], ['Improve Codebase Architecture', 'https://github.com/mattpocock/skills/tree/main/skills/engineering', 'mattpocock/skills · engineering']] },
        { name: 'Tina Lin', topic: 'Letting Claude plan a week of outfits',
          body: "Tina tells Claude what's in her wardrobe, brands included, and has it plan a whole week of outfits ahead of time. She can ask for something different for a special occasion, or name a style icon to follow. Here is the prompt she uses to create a style profile. You can try it with your own Claude.",
          prompt: 'I want to build a weekly scheduled routine that reminds me of personal outfit suggestions. Please act as my personal styling assistant.\nCreate a style-profile.md in the folder I choose, with these 9 sections:\n1. Wearer profile (including 1.1 Weekly rhythm: what each day from Monday to the weekend is like)\n2. Designers, brand aesthetics, and brands I often wear\n3. Style keywords\n4. Color plan (base colors + accent colors + what to avoid)\n5. Fit and silhouette preferences\n6. Styles to avoid completely\n7. Occasion ratio (5 slots, one per weekday)\n8. Accessories\n9. Weather rules (by temperature band + which shoes to switch to when it rains)\nStart by interviewing me with 6 questions. Wait until I have answered, then write the file from my answers. Do not make up content.' },
        { name: 'Toby', topic: 'A more rigorous thesis, and planning disaster drills',
          body: 'Toby uses Claude to make his thesis more rigorous while keeping to professional standards and academic integrity. He also showed how Claude can help plan disaster relief drills, and recommended a set of skills for academic writing and research.',
          links: [['Academic Research Skills', 'https://github.com/Imbad0202/academic-research-skills', 'Imbad0202/academic-research-skills']] },
      ],
    },
  },
  {
    slug: '2026-06-26', no: '02', date: '2026.06.26',
    hero: 'p0626a.jpg', heroPos: '50% 45%', card: 'p0626a.jpg',
    gallery: ['p0626b.jpg', 'p0626c.jpg'],
    zh: {
      title: 'Skills、民宿網站與 AI 時代的管理',
      heroAlt: '6/26 小聚現場',
      cardWho: 'Edward Kennedy、Nancy Yu、陳紹慶',
      speakers: '3 位',
      intro: '那天晚上下大雨，謝謝大家還是來了。',
      galleryAlt: ['6/26 小聚現場', '6/26 分享現場'],
      talks: [
        { name: 'Nancy Yu', aff: '純粹愛大海民宿', topic: '我怎麼用 Claude 做出民宿網站',
          body: 'Nancy 經營花蓮的純粹愛大海民宿。分享的時候，她用 Claude 大約一個半月，已經自己做出民宿的網站，程式碼也放在 GitHub 上。',
          links: [['民宿網站', 'https://www.hualien-boutique-ocean-inn.tw/', 'hualien-boutique-ocean-inn.tw'], ['GitHub', 'https://github.com/Liulouis11/Hualien-Boutique-Ocean-Inn', 'Liulouis11/Hualien-Boutique-Ocean-Inn']] },
        { name: '陳紹慶', aff: '慈濟大學', topic: '把文章和電子書變成 skill，當作私人教練和助理',
          body: '當天的例子是 Ethan Mollick 的〈Management as AI Superpower〉（One Useful Thing，2026-01-28）。文章認為，要不要把一件事交給 AI，看三個變數：自己做要多久、AI 一次做對的機率、下提示加上等待和檢查結果的時間。提高成功率的方法是給清楚的指令、縮短檢查時間、帶進領域專業。文章也把各行業的授權文件整理成五個問題：要達成什麼、為什麼；邊界在哪；完成長什麼樣子；要交出哪些東西；交出來前要自己確認什麼。',
          links: [['原文', 'https://open.substack.com/pub/oneusefulthing/p/management-as-ai-superpower', 'One Useful Thing']] },
        { name: 'Edward Kennedy', topic: 'How I use skills and frameworks to get the most out of AI agents',
          body: 'Edward 分享他怎麼用 skills 和 frameworks 讓 AI agent 做得更好。他把當天的內容錄成了 YouTube 影片，簡報也放在個人網站上。',
          links: [['影片', 'https://www.youtube.com/watch?v=hkACToJ9R28', 'YouTube'], ['簡報', 'https://latentwill.com/archetypes/', 'latentwill.com/archetypes'], ['個人網站', 'https://latentwill.com/', 'latentwill.com']] },
      ],
    },
    en: {
      title: 'Skills, an inn website, and managing AI',
      heroAlt: 'The June meetup',
      cardWho: 'Edward Kennedy, Nancy Yu, 陳紹慶',
      speakers: '3',
      intro: 'It rained hard that night. Thank you for coming anyway.',
      galleryAlt: ['The June meetup', 'A talk at the June meetup'],
      talks: [
        { name: 'Nancy Yu', aff: 'Hualien Boutique Ocean Inn', topic: "How I built my inn's website with Claude",
          body: "Nancy runs the Boutique Ocean Inn in Hualien. When she gave this talk she had been using Claude for about six weeks, and had already built the inn's website herself. The code is on GitHub.",
          links: [['Inn website', 'https://www.hualien-boutique-ocean-inn.tw/', 'hualien-boutique-ocean-inn.tw'], ['GitHub', 'https://github.com/Liulouis11/Hualien-Boutique-Ocean-Inn', 'Liulouis11/Hualien-Boutique-Ocean-Inn']] },
        { name: '陳紹慶', aff: 'Tzu Chi University', topic: 'Turning articles and e-books into skills that act as a coach and assistant',
          body: 'The example was Ethan Mollick\'s "Management as AI Superpower" (One Useful Thing, 2026-01-28). The article says whether to hand a task to AI depends on three things: how long it takes you to do it yourself, the chance AI gets it right in one try, and the time spent prompting, waiting, and checking the result. To raise the success rate, give clear instructions, make results quicker to check, and bring in domain expertise. The article also reduces delegation documents from many fields to five questions: what are we trying to achieve, and why; where are the limits; what does done look like; what should be handed over; and what should you check before handing it in.',
          links: [['Original article', 'https://open.substack.com/pub/oneusefulthing/p/management-as-ai-superpower', 'One Useful Thing']] },
        { name: 'Edward Kennedy', topic: 'How I use skills and frameworks to get the most out of AI agents',
          body: 'Edward showed how he uses skills and frameworks to get better results from AI agents. He recorded the talk on YouTube, and the slides are on his website.',
          links: [['Video', 'https://www.youtube.com/watch?v=hkACToJ9R28', 'YouTube'], ['Slides', 'https://latentwill.com/archetypes/', 'latentwill.com/archetypes'], ['Website', 'https://latentwill.com/', 'latentwill.com']] },
      ],
    },
  },
  {
    slug: '2026-05-22', no: '01', date: '2026.05.22',
    hero: 'p0522a.jpg', heroPos: '50% 50%', card: 'p0522a.jpg',
    gallery: ['p0522b.jpg', 'p0522c.jpg'],
    zh: {
      title: '第一場：從 Claude Design 到 Claude Code',
      heroAlt: '5/22 第一場小聚',
      cardWho: 'Samson Chen、Sophie Lin',
      speakers: '2 位',
      intro: 'claude.formosa 在花蓮雲基地的第一場小聚。這場沒有留下完整的文字紀錄，以下依活動通知整理。',
      galleryAlt: ['5/22 入場', '5/22 分享現場'],
      talks: [
        { name: 'Samson Chen', aff: 'claude.formosa 召集人', topic: '從 Claude Design 轉到 Claude Code',
          body: '示範在 Claude Design 裡用互動式提示詞快速調整設計，再把做好的設計交給 Claude Code 接著做。' },
        { name: 'Sophie Lin', aff: 'claude.formosa 召集人', topic: '用 Claude 整理知識庫',
          body: '示範怎麼用 Claude 整理個人的知識庫。' },
      ],
    },
    en: {
      title: 'The first one: Claude Design to Claude Code',
      heroAlt: 'The first meetup in May',
      cardWho: 'Samson Chen, Sophie Lin',
      speakers: '2',
      intro: 'Our first meetup at Hualien Cloud Base. There is no full written record of this one, so this summary is based on the event notice.',
      galleryAlt: ['Arriving on 5/22', 'A talk on 5/22'],
      talks: [
        { name: 'Samson Chen', aff: 'claude.formosa organizer', topic: 'From Claude Design to Claude Code',
          body: 'Showed how to iterate quickly on a design in Claude Design with interactive prompts, then hand the finished design to Claude Code to carry on.' },
        { name: 'Sophie Lin', aff: 'claude.formosa organizer', topic: 'Organizing a knowledge base with Claude',
          body: 'Showed how to use Claude to organize a personal knowledge base.' },
      ],
    },
  },
];

const T = {
  zh: {
    htmlLang: 'zh-Hant-TW', cjk: true,
    nav: { next: '下一場', about: '關於', events: '活動回顧', join: '加入社群', discord: '加入 DISCORD', menu: '開啟選單' },
    homeTitle: 'claude.formosa｜花蓮 Claude 使用者小聚',
    homeDesc: 'claude.formosa 是台灣的 Claude 使用者社群。每個月最後一個週五晚上，在花蓮雲基地辦一場免費小聚。',
    hero: {
      kicker: 'HUALIEN · CLAUDE USER GROUP<span class="long"> · 每月最後一個週五</span>',
      title: '在花蓮，<br>聊 AI 的能與不能',
      lead: 'claude.formosa 是台灣的 Claude 使用者社群。每個月最後一個週五晚上，我們在花蓮雲基地辦一場免費小聚，聽幾位夥伴分享他們實際怎麼用 AI。',
      next: `下一場 ${NEXT.short}`, events: '活動回顧',
      alt: '8/28 小聚現場，Edward Kennedy 分享 Hermes Agent',
      pause: '暫停背景影片', resume: '播放背景影片',
    },
    next: {
      eyebrow: 'NEXT MEETUP · 下一場', when: '週五 · 18:00 – 20:00',
      where: '花蓮雲基地（花蓮市府前路 3 號）<br>免費參加。報名表開放時，會在 Discord 和 Threads 公告。',
      follow: '追蹤 THREADS 公告',
      agendaLabel: '當晚流程 / AGENDA',
      agenda: [['18:00', '入場'], ['18:30', '自我介紹：怎麼稱呼你、想用或用了 AI 做什麼'], ['—', '夥伴分享'], ['—', '自由交流'], ['20:00', '結束']],
      upcomingLabel: '之後的場次 / UPCOMING',
      upcoming: [['11.27', '花蓮', false], ['12.25', '暫停（行憲紀念日）', true]],
      note: '遇到國定假日的週五會暫停一次。新竹場不定期舉辦，地點在玖仰新竹遠百門市，飲料可折抵場地費 $100。',
    },
    about: {
      eyebrow: 'ABOUT · 關於我們', title: '這不是粉絲群，<br>是同好的聚集地',
      body: '每場由幾位夥伴帶著筆電上台，講自己怎麼把 AI 用在工作和生活裡，包括踩過的坑。主題來自參加的人，不用是專家，剛開始用的心得也歡迎。',
      goals: ['真實、正確的 AI 知識', 'AI 治理與安全使用', '實戰與踩坑經驗交流', '認識 Anthropic 生態系'],
      who: '適合：已經在用或想用 Claude 的人、想用 AI 但不知道從哪開始的人、在工作中實際導入 AI 的人。',
      alt: '7/31 小聚，Hauke 分享他開發過的軟體',
    },
    events: { eyebrow: 'PAST EVENTS', title: '活動回顧', count: `2026 年 5 月起，花蓮場已辦 ${EVENTS.length} 場`, cta: '閱讀回顧 →' },
    film: { eyebrow: 'ON SITE · 2026.08.28', title: '八月小聚現場片段', play: '播放 8/28 現場影片', alt: '8/28 小聚影片封面' },
    join: {
      eyebrow: 'JOIN · 加入社群', title: '在 Discord 上繼續聊',
      body: '報名連結、會後的講者資料都會先發在 Discord。有問題可以直接在上面問。<br>想上台分享嗎？只要你用 AI 做過任何事，不管哪一行、簡單或複雜，都歡迎私訊我們。',
      scan: '用手機掃描加入', qrAlt: 'Discord 邀請連結 QR code',
    },
    footer: {
      organizers: 'ORGANIZERS<br>召集人',
      people: [['Samson Chen', '科技公司技術長'], ['Shinru Wang', '資深產品經理'], ['Sophie Lin', '資深系統架構師']],
      disclaimer: '使用者自發組成的社群，並非 Anthropic 官方組織',
    },
    recap: {
      back: '← 所有活動', talks: 'TALKS · 分享內容', date: 'DATE', time: 'TIME', venue: 'VENUE', speakers: 'SPEAKERS',
      venueName: '花蓮雲基地', weekday: '週五', next: 'NEXT', nextTitle: '下一場小聚', play: '播放現場片段',
      title: (e) => `活動回顧 #${e.no}｜${e.zh.title}｜claude.formosa`,
    },
  },
  en: {
    htmlLang: 'en', cjk: false,
    nav: { next: 'NEXT MEETUP', about: 'ABOUT', events: 'PAST EVENTS', join: 'JOIN', discord: 'JOIN DISCORD', menu: 'Open menu' },
    homeTitle: 'claude.formosa | Claude user meetups in Hualien',
    homeDesc: 'claude.formosa is a Claude user group in Taiwan, with a free meetup at Hualien Cloud Base on the last Friday of each month.',
    hero: {
      kicker: 'HUALIEN · CLAUDE USER GROUP<span class="long"> · LAST FRIDAY OF THE MONTH</span>',
      title: "What AI can<br>and can't do",
      lead: 'claude.formosa is a Claude user group in Taiwan. On the last Friday of each month we hold a free evening meetup at Hualien Cloud Base, where members show how they actually use AI.',
      next: `NEXT: ${NEXT.enShort}`, events: 'PAST EVENTS',
      alt: 'The August meetup, Edward Kennedy presenting Hermes Agent',
      pause: 'Pause background video', resume: 'Play background video',
    },
    next: {
      eyebrow: 'NEXT MEETUP', when: 'FRI · 18:00 – 20:00',
      where: 'Hualien Cloud Base, No. 3, Fuqian Rd., Hualien City<br>Free. Registration is announced on Discord and Threads when it opens.',
      follow: 'FOLLOW ON THREADS',
      agendaLabel: 'AGENDA',
      agenda: [['18:00', 'Doors open'], ['18:30', 'Introductions: your name, and what you use AI for'], ['—', 'Member talks'], ['—', 'Open discussion'], ['20:00', 'Close']],
      upcomingLabel: 'UPCOMING',
      upcoming: [['11.27', 'Hualien', false], ['12.25', 'No meetup (national holiday)', true]],
      note: 'We skip the month when the last Friday is a national holiday. Hsinchu meetups happen on an irregular schedule at 玖仰 in the Far Eastern Department Store, Hsinchu; a drink covers the NT$100 venue fee.',
    },
    about: {
      eyebrow: 'ABOUT', title: 'Not a fan club.<br>A place for people who use it.',
      body: "Each meetup, a few members bring a laptop and show how they use AI at work and at home, including what went wrong. Topics come from the people who attend. You don't need to be an expert. Notes from your first month are welcome too.",
      goals: ['Accurate information about AI', 'AI governance and safe use', 'Hands-on experience, good and bad', 'Getting to know the Anthropic ecosystem'],
      who: "For people who already use Claude or want to, people who want to use AI but don't know where to start, and people putting AI to work.",
      alt: 'July meetup, Hauke presenting software he built',
    },
    events: { eyebrow: 'RECAPS', title: 'Past events', count: `${EVENTS.length} Hualien meetups since May 2026`, cta: 'READ RECAP →' },
    film: { eyebrow: 'ON SITE · 2026.08.28', title: 'Scenes from August', play: 'Play the August meetup video', alt: 'August meetup video cover' },
    join: {
      eyebrow: 'JOIN', title: 'Keep talking<br>on Discord',
      body: "Registration links and speaker materials go to Discord first. Ask questions there anytime.<br>Want to give a talk? If you've used AI for anything, in any field, simple or complex, send us a message.",
      scan: 'Scan with your phone', qrAlt: 'QR code for the Discord invite',
    },
    footer: {
      organizers: 'ORGANIZERS',
      people: [['Samson Chen', 'CTO at a tech company'], ['Shinru Wang', 'Senior product manager'], ['Sophie Lin', 'Senior systems architect']],
      disclaimer: 'An independent user community, not affiliated with Anthropic',
    },
    recap: {
      back: '← ALL EVENTS', talks: 'TALKS', date: 'DATE', time: 'TIME', venue: 'VENUE', speakers: 'SPEAKERS',
      venueName: 'Hualien Cloud Base', weekday: 'FRI', next: 'NEXT', nextTitle: 'Next meetup', play: 'Play clip',
      title: (e) => `Recap #${e.no}: ${e.en.title} | claude.formosa`,
    },
  },
};

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ARROW = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
const PLAY = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
const MENU = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>';

// Page paths are relative to docs/. `up` is the prefix back to docs/ from a page.
const homePath = (lang) => (lang === 'zh' ? 'index.html' : 'en/index.html');
const eventPath = (lang, slug) => (lang === 'zh' ? `events/${slug}.html` : `en/events/${slug}.html`);

function page({ lang, up, title, desc, body, alt }) {
  const t = T[lang];
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#170e3f">
<link rel="alternate" hreflang="${lang === 'zh' ? 'en' : 'zh-Hant-TW'}" href="${up}${alt}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}assets/css/site.css">
<script src="${up}assets/js/site.js" defer></script>
</head>
<body>
<a class="skip" href="#main">${lang === 'zh' ? '跳到主要內容' : 'Skip to content'}</a>
${body}
</body>
</html>
`;
}

function nav({ lang, up, overlay, current, alt }) {
  const t = T[lang];
  const home = up + homePath(lang);
  const onHome = current === 'home';
  const h = (id) => (onHome ? `#${id}` : `${home}#${id}`);
  const links = `<a href="${h('next')}">${t.nav.next}</a>
<a href="${h('about')}">${t.nav.about}</a>
<a href="${h('events')}"${current === 'event' ? ' aria-current="page"' : ''}>${t.nav.events}</a>
<a href="${h('join')}">${t.nav.join}</a>`;
  const langSwitch = lang === 'zh'
    ? `<span aria-current="true">中</span><span class="lang__sep">/</span><a href="${up}${alt}" hreflang="en" lang="en">EN</a>`
    : `<a href="${up}${alt}" hreflang="zh-Hant-TW" lang="zh-Hant-TW">中</a><span class="lang__sep">/</span><span aria-current="true">EN</span>`;
  return `<header class="nav wrap${overlay ? ' nav--overlay' : ''}">
<a class="nav__logo" href="${home}">CLAUDE.FORMOSA</a>
<nav class="nav__links" aria-label="${lang === 'zh' ? '主選單' : 'Main'}">
${links}
</nav>
<div class="nav__right">
<div class="lang">${langSwitch}</div>
<a class="btn btn--sm" href="${LINKS.discord}">${t.nav.discord}</a>
<button class="nav__menu" type="button" aria-label="${t.nav.menu}" aria-expanded="false" aria-controls="nav-panel">${MENU}</button>
</div>
<nav class="nav__panel" id="nav-panel" aria-label="${lang === 'zh' ? '手機選單' : 'Mobile'}">
${links}
<a class="btn" href="${LINKS.discord}">${t.nav.discord}</a>
</nav>
</header>`;
}

function footer(lang) {
  const t = T[lang];
  return `<footer class="footer wrap">
<div class="organizers">
<div class="label">${t.footer.organizers}</div>
${t.footer.people.map(([n, r]) => `<div><b>${esc(n)}</b><span${t.cjk ? ' class="cjk"' : ''}>${esc(r)}</span></div>`).join('\n')}
</div>
<div class="footer__bar">
<span class="brand">CLAUDE.FORMOSA</span>
<div class="footer__social"><a href="${LINKS.discord}">DISCORD</a><a href="${LINKS.threads}">THREADS</a><a href="${LINKS.instagram}">INSTAGRAM</a></div>
<span${t.cjk ? ' class="cjk"' : ''}>${t.footer.disclaimer}</span>
<span>© 2026</span>
</div>
</footer>`;
}

function home(lang) {
  const t = T[lang];
  const up = lang === 'zh' ? '' : '../';
  const img = (f) => `${up}assets/img/${f}`;
  const c = t.cjk ? ' cjk' : '';
  const en = t.cjk ? '' : ' en';
  const alt = homePath(lang === 'zh' ? 'en' : 'zh');
  const cards = EVENTS.map((e) => {
    const d = e[lang];
    return `<a class="card" href="${up}${eventPath(lang, e.slug)}">
<img src="${img(e.card)}" alt="${esc(d.heroAlt)}" loading="lazy" width="600" height="420">
<div class="card__meta">#${e.no} · ${e.date}</div>
<h3 class="card__title${c}">${esc(d.title)}</h3>
<div class="card__who${c}">${esc(d.cardWho)}</div>
<div class="card__cta">${t.events.cta}</div>
</a>`;
  }).join('\n');

  const body = `${nav({ lang, up, overlay: true, current: 'home', alt })}
<main id="main">
<section class="hero">
<img class="hero__img" src="${img('p0828a.jpg')}" alt="${esc(t.hero.alt)}" fetchpriority="high">
<video class="hero__video" data-src="${up}assets/video/2026-08-28-clip1.mp4" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>
<div class="hero__shade"></div>
<button class="hero__toggle" type="button" hidden aria-pressed="false" data-label-pause="${esc(t.hero.pause)}" data-label-play="${esc(t.hero.resume)}" aria-label="${esc(t.hero.pause)}">
<svg class="icon-pause" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3v14H7zM14 5h3v14h-3z"/></svg>
<svg class="icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
</button>
<div class="hero__body">
<div class="hero__kicker">${t.hero.kicker}</div>
<h1 class="${t.cjk ? 'cjk' : 'en'}">${t.hero.title}</h1>
<p class="hero__lead${c}">${t.hero.lead}</p>
<div class="hero__actions">
<a class="btn" href="#next">${t.hero.next} ${ARROW}</a>
<a class="btn btn--ghost" href="#events">${t.hero.events}</a>
</div>
</div>
<div class="hero__credit">2026.08.28 · EDWARD KENNEDY / HERMES AGENT</div>
</section>

<section class="next wrap" id="next">
<div class="next__main">
<div class="eyebrow">${t.next.eyebrow}</div>
<div class="next__date">${NEXT.date}</div>
<div class="next__when">${t.next.when}</div>
<p class="next__where${c}">${t.next.where}</p>
<a class="btn" href="${LINKS.threads}">${t.next.follow}</a>
</div>
<div class="next__side">
<div>
<div class="label">${t.next.agendaLabel}</div>
<ol class="agenda${c}">
${t.next.agenda.map(([time, what]) => `<li><span>${time}</span><span>${esc(what)}</span></li>`).join('\n')}
</ol>
</div>
<div class="upcoming">
<div class="label">${t.next.upcomingLabel}</div>
<div class="upcoming__row${c}">
${t.next.upcoming.map(([d, what, off]) => `<div${off ? ' class="off"' : ''}><b>${d}</b>${esc(what)}</div>`).join('\n')}
</div>
<p class="note${c}">${esc(t.next.note)}</p>
</div>
</div>
</section>

<section class="about" id="about">
<img class="about__img" src="${img('p0731a.jpg')}" alt="${esc(t.about.alt)}" loading="lazy">
<div class="about__body">
<div class="eyebrow">${t.about.eyebrow}</div>
<h2 class="${t.cjk ? 'cjk' : 'en'}">${t.about.title}</h2>
<p class="body-text${c}">${esc(t.about.body)}</p>
<ol class="goals${c}">
${t.about.goals.map((g, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${esc(g)}</li>`).join('\n')}
</ol>
<p class="note${c}">${esc(t.about.who)}</p>
</div>
</section>

<section class="events wrap" id="events">
<div class="section-head">
<div class="section-head__title">
<div class="eyebrow">${t.events.eyebrow}</div>
<h2 class="${t.cjk ? 'cjk' : 'en'}">${t.events.title}</h2>
</div>
<p${c ? ' class="cjk"' : ''}>${t.events.count}</p>
</div>
<div class="cards">
${cards}
</div>
</section>

<section class="film" data-src="${up}assets/video/2026-08-28-clip2.mp4" aria-label="${esc(t.film.title)}">
<img class="cover__img" src="${img('p0828c.jpg')}" alt="${esc(t.film.alt)}" loading="lazy">
<div class="film__shade"></div>
<div class="film__body">
<button class="play" type="button" aria-label="${esc(t.film.play)}">${PLAY(30)}</button>
<div class="hero__kicker">${t.film.eyebrow}</div>
<div class="film__title${t.cjk ? ' cjk' : ' en'}">${t.film.title}</div>
</div>
</section>

<section class="join wrap" id="join">
<div class="join__main">
<div class="eyebrow">${t.join.eyebrow}</div>
<h2 class="${t.cjk ? 'cjk' : 'en'}">${t.join.title}</h2>
<p class="body-text${c}">${t.join.body}</p>
<div class="join__links">
<a class="btn" href="${LINKS.discord}">${t.nav.discord}</a>
<a href="${LINKS.threads}">THREADS</a>
<a href="${LINKS.instagram}">INSTAGRAM</a>
</div>
</div>
<div class="qr">
<div class="qr__text"><strong${c ? ' class="cjk"' : ''}>${t.join.scan}</strong><span>discord.gg/fWcPCyMBta</span></div>
<div class="qr__code"><img src="${img('discord-qr.svg')}" alt="${esc(t.join.qrAlt)}" width="216" height="216" loading="lazy"></div>
</div>
</section>
</main>
${footer(lang)}`;
  return page({ lang, up, title: t.homeTitle, desc: t.homeDesc, body, alt });
}

function recap(lang, i) {
  const t = T[lang];
  const e = EVENTS[i];
  const d = e[lang];
  const up = lang === 'zh' ? '../' : '../../';
  const img = (f) => `${up}assets/img/${f}`;
  const c = t.cjk ? ' cjk' : '';
  const alt = eventPath(lang === 'zh' ? 'en' : 'zh', e.slug);
  const newer = EVENTS[i - 1];
  const older = EVENTS[i + 1];

  const talks = d.talks.map((k, n) => `<article class="talk">
<div class="talk__who">
<span class="talk__no">${String(n + 1).padStart(2, '0')}</span>
<span class="talk__name${c}">${esc(k.name)}</span>
${k.aff ? `<span class="talk__aff${c}">${esc(k.aff)}</span>` : ''}
</div>
<div class="talk__body">
<h3 class="${/[一-鿿]/.test(k.topic) ? 'cjk' : 'en'}">${esc(k.topic)}</h3>
<p class="body-text${c}">${esc(k.body)}</p>
${k.prompt ? `<div class="prompt${c}">${esc(k.prompt)}</div>` : ''}
${k.links ? `<ul class="links">\n${k.links.map(([label, href, shown]) => `<li><a href="${esc(href)}"><span${c ? ' class="cjk"' : ''}>${esc(label)}</span><span>${esc(shown)} ↗</span></a></li>`).join('\n')}\n</ul>` : ''}
</div>
</article>`).join('\n');

  const clips = e.clips ? `<div class="clips">
${e.clips.map(([file, label]) => `<section class="film" data-src="${up}assets/video/${file}" aria-label="${esc(label)}">
<img class="cover__img" src="${img('p0828c.jpg')}" alt="" loading="lazy">
<div class="film__shade"></div>
<div class="film__body">
<button class="play play--sm" type="button" aria-label="${esc(t.recap.play)} ${esc(label)}">${PLAY(28)}</button>
<div class="film__title">${label}</div>
</div>
</section>`).join('\n')}
</div>` : '';

  const prev = older
    ? `<a href="${up}${eventPath(lang, older.slug)}"><small>← #${older.no} · ${older.date.slice(5)}</small><strong${c ? ' class="cjk"' : ''}>${esc(older[lang].title)}</strong></a>`
    : '<div></div>';
  const next = newer
    ? `<a class="next-link" href="${up}${eventPath(lang, newer.slug)}"><small>#${newer.no} · ${newer.date.slice(5)} →</small><strong${c ? ' class="cjk"' : ''}>${esc(newer[lang].title)}</strong></a>`
    : `<a class="next-link" href="${up}${homePath(lang)}#next"><small>${t.recap.next} · ${NEXT.date} →</small><strong${c ? ' class="cjk"' : ''}>${t.recap.nextTitle}</strong></a>`;

  const body = `${nav({ lang, up, overlay: false, current: 'event', alt })}
<main id="main">
<section class="cover">
<img class="cover__img" src="${img(e.hero)}" alt="${esc(d.heroAlt)}" style="object-position: ${e.heroPos}" fetchpriority="high">
<div class="cover__shade"></div>
<div class="cover__body">
<a class="cover__back" href="${up}${homePath(lang)}#events">${t.recap.back}</a>
<div class="eyebrow">RECAP #${e.no} · ${e.date}</div>
<h1 class="${t.cjk ? 'cjk' : 'en'}">${esc(d.title)}</h1>
</div>
</section>

<dl class="facts wrap">
<div><dt>${t.recap.date}</dt><dd${c ? ' class="cjk"' : ''}>${e.date} ${t.recap.weekday}</dd></div>
<div><dt>${t.recap.time}</dt><dd>18:00 – 20:00</dd></div>
<div><dt>${t.recap.venue}</dt><dd${c ? ' class="cjk"' : ''}>${t.recap.venueName}</dd></div>
<div><dt>${t.recap.speakers}</dt><dd${c ? ' class="cjk"' : ''}>${esc(d.speakers)}</dd></div>
</dl>

<section class="talks wrap">
<div class="talks__intro">
<div class="eyebrow">${t.recap.talks}</div>
<p${c ? ' class="cjk"' : ''}>${esc(d.intro)}</p>
</div>
${talks}
</section>

<div class="gallery">
${e.gallery.map((f, n) => `<img src="${img(f)}" alt="${esc(d.galleryAlt[n])}" loading="lazy">`).join('\n')}
</div>
${clips}

<nav class="pager wrap" aria-label="${lang === 'zh' ? '其他場次' : 'Other events'}">
${prev}
${next}
</nav>
</main>
${footer(lang)}`;
  return page({ lang, up, title: t.recap.title(e), desc: d.intro, body, alt });
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

// Empty docs/ but keep the folder itself, so a local server running inside it keeps working.
mkdirSync(OUT, { recursive: true });
for (const entry of readdirSync(OUT)) rmSync(join(OUT, entry), { recursive: true, force: true });
mkdirSync(join(OUT, 'events'), { recursive: true });
mkdirSync(join(OUT, 'en', 'events'), { recursive: true });
cpSync(join(ROOT, 'static'), join(OUT, 'assets'), { recursive: true });
writeFileSync(join(OUT, '.nojekyll'), '');

for (const lang of ['zh', 'en']) {
  writeFileSync(join(OUT, homePath(lang)), home(lang));
  EVENTS.forEach((e, i) => writeFileSync(join(OUT, eventPath(lang, e.slug)), recap(lang, i)));
}
console.log(`Built ${2 + EVENTS.length * 2} pages into docs/`);
