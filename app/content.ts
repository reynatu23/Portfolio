export type Lang = 'zh' | 'en';
export type Bilingual = { zh: string; en: string };
export type Project = {
  id: string;
  title: Bilingual;
  type: Bilingual;
  duration: string;
  tags: string[];
  summary: Bilingual;
  details: Bilingual;
  pdf?: boolean;
  category: 'games' | 'films';
};
export const projects: Project[] = [
  {
    id: 'john-lemon',
    title: { zh: 'John Lemon', en: 'John Lemon' },
    type: {
      zh: '游戏音频设计与实现',
      en: 'Game audio design & implementation',
    },
    duration: '01:34',
    tags: ['Wwise', 'Unity', 'Cubase'],
    category: 'games',
    pdf: true,
    summary: {
      zh: '让脚步、心跳与音乐，一起回应玩家的行动。',
      en: 'Footsteps, heartbeat and music that respond to the player.',
    },
    details: {
      zh: '为 Unity John Lemon 示例设计音效、环境声与原创配乐。录制木地板、地毯与瓷砖脚步，以 Wwise Switch 切换材质；使用 States、滤波与混响塑造安全区域和紧张感。\n在 Unity 内配置触发器、空间定位与 SoundBank，完成幽灵、雨声、灯泡及胜负反馈，并通过实时联调平衡游戏混音。',
      en: 'Sound effects, ambience and an original score for the Unity John Lemon demo. Recorded footsteps on wood, carpet and tile, using Wwise Switches for surface changes and States, filters and reverb to shape safe areas and tension.\nImplemented triggers, spatial positioning and SoundBanks in Unity for ghosts, rain, lights and game feedback, then refined the mix through real-time testing.',
    },
  },
  {
    id: 'lifted',
    title: { zh: '《Lifted》', en: 'Lifted' },
    type: { zh: '动画声音重设计 · 5.1', en: 'Animation sound redesign · 5.1' },
    duration: '05:29',
    tags: ['Foley', 'ADR', '5.1 Surround'],
    category: 'games',
    pdf: true,
    summary: {
      zh: '从一把椅子、一颗弹珠，构建飞船里的荒诞世界。',
      en: 'Chairs and marbles become the sounds of an absurd alien world.',
    },
    details: {
      zh: '与同学合作完成 ADR、拟音与混音；个人负责音乐搜寻、音效制作，并参与人物呻吟与尖叫的表演录制。使用不同材质的椅子与陶瓷弹珠模拟动作和控制台。\n通过音效分层、音高调整、均衡与空间处理，让动作更有变化，环境更具层次；最终在混音棚完成 5.1 环绕声混音。',
      en: 'A collaborative ADR, Foley and mixing project. My contributions included music selection, sound effects and vocal performances for grunts and screams. Different chairs and ceramic marbles supplied textures for movement and the control console.\nLayering, pitch changes, EQ and spatial processing added variety and depth, with the final 5.1 surround mix completed in a mixing studio.',
    },
  },
  {
    id: 'zoopunk',
    title: { zh: 'Zoopunk', en: 'Zoopunk' },
    type: { zh: '声音设计作品', en: 'Sound design study' },
    duration: '02:59',
    tags: ['Sound Design', 'Showcase'],
    category: 'games',
    summary: {
      zh: '材质、重量与混合武器的声音运动。',
      en: 'Sonic movement through material, weight and hybrid weapons.',
    },
    details: {
      zh: '爱丁堡大学毕业项目 Sounding Motion 的声音重设计案例。通过角色拟音、真实与电子引擎分层，以及不同武器的频率和重量设计，探索视觉材质如何塑造声音运动感。',
      en: 'A sound redesign from my Edinburgh final project, Sounding Motion. Character Foley, layered physical and electronic engines, and distinct weapon weights explore how visual material shapes sonic movement.',
    },
  },
  {
    id: 'times-down',
    title: { zh: 'Time’s Down', en: 'Time’s Down' },
    type: { zh: '声音设计作品', en: 'Sound design study' },
    duration: '03:46',
    tags: ['Sound Design', 'Showcase'],
    category: 'games',
    summary: {
      zh: '用城市环境与镜头距离组织未来追逐。',
      en: 'A futuristic chase shaped by environment and perspective.',
    },
    details: {
      zh: '爱丁堡大学毕业项目 Sounding Motion 的声音重设计案例。城市环境、飞行载具、机器人与人类拟音共同建立空间，并通过远近景切换、声像、频率和密度变化表达运动。',
      en: 'A sound redesign from my Edinburgh final project, Sounding Motion. Urban ambience, flying vehicles, robots and human Foley establish a shared space, with distance, panning, frequency and density changes communicating movement.',
    },
  },
  {
    id: 'retake',
    title: { zh: 'RETAKE · VALORANT', en: 'RETAKE · VALORANT' },
    type: { zh: '声音设计作品', en: 'Sound design study' },
    duration: '02:48',
    tags: ['Sound Design', 'Showcase'],
    category: 'games',
    summary: {
      zh: '为枪械、技能与动作节奏留出空间。',
      en: 'Making room for weapons, abilities and action rhythm.',
    },
    details: {
      zh: '爱丁堡大学毕业项目 Sounding Motion 的声音重设计案例。通过武器频率重塑、烟雾与能量场扩张、动作 whoosh 及简单原创音乐，强化画面的速度、方向与节奏。',
      en: 'A sound redesign from my Edinburgh final project, Sounding Motion. Reshaped weapon spectra, expanding smoke and energy fields, action whooshes and simple original music reinforce speed, direction and rhythm.',
    },
  },
  {
    id: 'tidal-surge',
    title: { zh: '《潮涌》', en: 'Tidal Surge' },
    type: {
      zh: '科幻短片 · 5.1 环绕声',
      en: 'Sci-fi short film · 5.1 surround',
    },
    duration: '05:00',
    tags: ['Location Sound', 'Foley', 'Serum'],
    category: 'films',
    pdf: true,
    summary: {
      zh: '在防空洞与未来实验室之间，用声音塑造未知。',
      en: 'Building the unknown between an underground shelter and a future laboratory.',
    },
    details: {
      zh: '与刘佳琪合作完成影片声音制作，经历五天同期拍摄，覆盖摄影棚与湖州防空洞。个人参与对白编辑、环境声、拟音、特殊音效与音乐创作。\n使用混响塑造洞穴空间，以 Serum 合成器创作电子配乐、强化科幻氛围。影片获得 2024 年第九届声音学院奖二等奖。',
      en: 'A sound production collaboration with Jiaqi Liu, spanning five days of location recording in a studio and an air-raid shelter in Huzhou. My work included dialogue editing, ambience, Foley, special effects and music.\nReverb shaped the cave acoustics, while a Serum-based electronic score reinforced the science-fiction setting. The film received Second Prize at the 9th Sound Academy Awards in 2024.',
    },
  },
  {
    id: 'bathroom',
    title: { zh: 'The Bathroom', en: 'The Bathroom' },
    type: { zh: '戏剧声音设计', en: 'Dramatic sound design' },
    duration: '04:59',
    tags: ['Theatre', 'Sound & Story'],
    category: 'films',
    pdf: true,
    summary: {
      zh: '声音不仅服务舞台，也让观众靠近角色。',
      en: 'Sound brings the audience closer to the characters.',
    },
    details: {
      zh: '为戏剧表演进行声音设计，并与演员、灯光及其他团队沟通配合，确保排练与正式演出的声音衔接。\n这次实践关注声音如何传达情绪、连接人物与观众，也促使我思考声音设计在家庭暴力与性别议题等社会叙事中的表达可能。',
      en: 'Sound design for a dramatic performance, coordinating with actors, lighting technicians and other teams across rehearsals and the show.\nThe project explored how sound conveys emotion and connects audiences with characters, encouraging reflection on its potential in narratives about domestic violence and gender discrimination.',
    },
  },
];
export const chapters = [
  { zh: '目录', en: 'Contents' },
  { zh: '游戏与动画', en: 'Games & animation' },
  { zh: '影视与戏剧', en: 'Film & theatre' },
  { zh: '广播电视节目', en: 'Broadcast' },
  { zh: '教育背景', en: 'Education' },
  { zh: '工作与实习', en: 'Work & internships' },
  { zh: '获奖经历', en: 'Recognition' },
];
export const experience = [
  {
    date: '2026.07 — NOW',
    name: { zh: 'Side UK / PTW', en: 'Side UK / PTW' },
    role: { zh: '自由职业音频编辑', en: 'Freelance Audio Editor' },
    desc: {
      zh: '游戏对白精细剪辑、清理与修复，按照项目规范完成批量音频资产管理和远程交付。',
      en: 'Detailed editing, cleanup and repair of game dialogue, with consistent asset management and remote delivery.',
    },
    details: {
      zh: [
        '精细剪辑游戏对白：裁切、淡入淡出、静音处理与呼吸控制。',
        '修复爆音、喷麦、敲击声、低频碰撞、削波与失真等录音问题。',
        '按项目要求统一命名、格式与交付标准，与后期协调人员远程协作并按期提交。',
      ],
      en: [
        'Edit game dialogue with precise cuts, fades, silence treatment and breath control.',
        'Repair clicks, plosives, taps, low-frequency bumps, clipping and distortion.',
        'Maintain naming, format and delivery standards; collaborate remotely with post-production coordinators to meet deadlines.',
      ],
    },
  },
  {
    date: '2025.05 — 2025.08',
    name: { zh: '北京字跳网络技术', en: 'Beijing Zitiao Network Technology' },
    role: { zh: '声音设计', en: 'Sound Design Intern' },
    desc: {
      zh: '参与游戏音乐与音效风格制定、配器参考、特定物种语音设计，以及游戏内音频测试。',
      en: 'Game music and SFX direction, instrumentation references, species-specific voice design and in-game audio testing.',
    },
    details: {
      zh: [
        '依据游戏场景美术确定音乐参考、配器和段落，跟进外包制作、修改与混音。',
        '协助制定整体音频风格，持续调整音乐与音效，让声音与世界观及视觉设定一致。',
        '为特定物种探索角色语音与语言表达，丰富角色识别度与游戏内容。',
        '结合里程碑与策划对齐需求，在游戏内测试声音表现与实现效果。',
      ],
      en: [
        'Define musical references, instrumentation and structure around scene art; follow outsourced production, revisions and mixing.',
        'Help shape a consistent audio direction across music, effects, world-building and visuals.',
        'Explore vocal and linguistic approaches for specific species to enrich character identity.',
        'Align requirements with planning milestones and test audio implementation in the game.',
      ],
    },
  },
  {
    date: '2024.12 — 2025.04',
    name: { zh: '深圳超参数科技', en: 'Shenzhen Hyperparameter Technology' },
    role: { zh: '声音设计 · 语音', en: 'Voice Design Intern' },
    desc: {
      zh: '整理 30+ 类角色声线、10+ 英雄采集台本；协同 AI 与 TA 团队，完成 Wwise 资源接入和 Unity 测试。',
      en: 'Prepared 30+ voice types and scripts for 10+ heroes; collaborated with AI and technical art teams on Wwise integration and Unity testing.',
    },
    details: {
      zh: [
        '与策划确认角色声线需求，整理 30+ 类型声线，协助训练自研 AI 语音模型并生成游戏语音。',
        '整理 10+ 英雄采集台本，参与供应商筛选、配音监棚、后期审核及训练素材交付。',
        '将语音资源接入 Wwise，在 Unity 中测试；试用 TA 开发的语音工具并提出优化反馈。',
        '完成提审版剧情与战斗语音，与策划、AI 和 TA 团队持续优化语音管线。',
      ],
      en: [
        'Translate character requirements into 30+ voice types for an in-house AI speech model and game voice assets.',
        'Prepare scripts for 10+ heroes, supporting vendor selection, recording supervision, post-production review and training-data delivery.',
        'Integrate speech into Wwise and test it in Unity; evaluate technical-art voice tools and provide feedback.',
        'Deliver story and combat voices for the review build while refining the pipeline with planning, AI and technical-art teams.',
      ],
    },
  },
  {
    date: '2024.06 — 2024.09',
    name: { zh: '腾讯 · TiMi Audio Lab', en: 'Tencent · TiMi Audio Lab' },
    role: { zh: '音频策划实习', en: 'Audio Planning Intern' },
    desc: {
      zh: '参与 Chasing Kaleidorider 首关 Boss、角色技能及个人剧情声音制作，在 Wwise 与 UE 中配置资源并协同外包团队。',
      en: 'Boss, character skill and personal-story audio for Chasing Kaleidorider, with Wwise/UE implementation and outsourcing coordination.',
    },
    projectUrl: 'https://kaleidorider.com/',
    details: {
      zh: [
        '参与《Chasing Kaleidorider》首关 Boss 与角色技能音效样本制作，以及语音特殊效果处理。',
        '整理 Boss 各状态与技能的声音呈现需求，制作需求汇总并翻译，推动外包资源优化。',
        '协调策划与外部 CP，收包、反馈并跟进修改；在 Wwise 与 Unreal Engine 中配置音频资源。',
        '参与角色个人剧情的声音设计，为不同角色建立有辨识度的声音表达。',
      ],
      en: [
        'Create sound-effect samples for the opening Boss and character abilities in Chasing Kaleidorider, including special voice processing.',
        'Document Boss states and abilities, translate audio briefs and drive outsourced asset improvements.',
        'Coordinate planners and external content partners, review deliveries and revisions, and configure assets in Wwise and Unreal Engine.',
        'Design sound for individual character storylines, developing a distinctive sonic identity for each narrative.',
      ],
    },
  },
  {
    date: '2023.09 — 2023.12',
    name: { zh: '网易（杭州）', en: 'NetEase, Hangzhou' },
    role: { zh: '音频编辑实习', en: 'Audio Editing Intern' },
    desc: {
      zh: '编辑对白与音效，参与 Unity 内同步、响度调整和播放检查。',
      en: 'Dialogue and sound effects editing, Unity playback checks, synchronization and loudness adjustments.',
    },
    details: {
      zh: [
        '编辑对白与音效，关注不同场景中的同步与频率平衡。',
        '参与 Unity 内播放检查，调整响度并对照技术质量要求复核。',
      ],
      en: [
        'Edit dialogue and effects with attention to synchronization and frequency balance across scenes.',
        'Review playback in Unity, adjust loudness and check assets against technical quality requirements.',
      ],
    },
  },
  {
    date: '2023.07 — 2023.09',
    name: {
      zh: '央视网 · 原创策划中心',
      en: 'CCTV.com · Original Planning Centre',
    },
    role: { zh: '编导 / 制作人助理', en: 'Production Assistant' },
    desc: {
      zh: '参与成都大运会特别节目，协调海外嘉宾、主题曲录制、小片制作与直播筹备。',
      en: 'Contributed to the Chengdu Universiade special broadcast through international guest coordination, theme-song recording, promotional production and live preparation.',
    },
    details: {
      zh: [
        '参与成都大运会特别节目策划与制作，协调 8 位海外嘉宾的筛选、邀请、行程及现场对接。',
        '跟进主题曲录制、宣传小片拍摄与直播准备，协调导演组、制作人员和嘉宾。',
        '参与海外直播音乐版权评估，与法务团队配合推进内容使用流程。',
        '在直播阶段跟进并行任务与交付节点，支持现场连续、顺畅地运行。',
      ],
      en: [
        'Support the Chengdu Universiade special programme and coordinate eight international guests, from selection and invitations to schedules and on-site liaison.',
        'Follow theme-song recording, promotional filming and broadcast preparation across directors, production staff and guests.',
        'Assist music-rights assessment for international broadcasts and coordinate usage procedures with legal teams.',
        'Track concurrent tasks and delivery milestones to support smooth live operations.',
      ],
    },
  },
];
export const awards = [
  {
    year: '2024',
    name: {
      zh: '第九届声音学院奖 · 二等奖',
      en: '9th Sound Academy Awards · Second Prize',
    },
    note: { zh: '《潮涌》 · 声音制作', en: 'Tidal Surge · Sound production' },
  },
  {
    year: '2023',
    name: {
      zh: '大广赛 · 全国三等奖 / 浙江省二等奖',
      en: 'Advertising Competition · National Third / Zhejiang Second Prize',
    },
    note: {
      zh: '《林小小的宇宙》 · 后期声音',
      en: 'Lin Xiaoxiao’s Universe · Post-production sound',
    },
  },
  {
    year: '2023',
    name: { zh: '十佳大学生', en: 'Top Ten Students' },
    note: { zh: '浙江传媒学院', en: 'Communication University of Zhejiang' },
  },
  {
    year: '2025',
    name: { zh: '三等奖学金', en: 'Third-Class Scholarship' },
    note: { zh: '浙江传媒学院', en: 'Communication University of Zhejiang' },
  },
];
