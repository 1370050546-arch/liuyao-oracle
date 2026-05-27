const hexagramJudgments = {
  乾为天: { verdict: "大象刚健，利于主动开局、争取主导，但成败在于是否能守正不亢。", risk: "过刚、急进、听不进反馈。", advice: "先立规则和目标，再推进关键动作。" },
  坤为地: { verdict: "大象厚重，利于承接、积累、配合，不利于逞强抢先。", risk: "过于被动、责任压身、边界不清。", advice: "把资源、人手、责任先安顿好。" },
  水雷屯: { verdict: "初起艰难，事情不是不能成，而是开头阻力大、杂事多。", risk: "急着求结果，反而被细节拖住。", advice: "先解决最基础的阻塞点，稳住第一步。" },
  山水蒙: { verdict: "信息未明，适合学习、求证、请教，不宜凭感觉下注。", risk: "误判对方意图或规则。", advice: "把不知道的事列出来，一项项确认。" },
  水天需: { verdict: "需者待也，条件未熟，等待不是停滞，而是蓄势。", risk: "心急催动时机，导致成本升高。", advice: "准备材料、资源和后手，等信号出现再动。" },
  天水讼: { verdict: "有争执、分歧、压力之象，宜求证据和边界。", risk: "口舌升级，关系变僵。", advice: "保留记录，先谈规则，不谈情绪。" },
  地水师: { verdict: "师为组织与纪律，事情要靠团队、流程、执行力成。", risk: "各行其是，号令不一。", advice: "明确负责人、时间表和验收标准。" },
  水地比: { verdict: "比为亲附、结盟，关键在找对人、站对队。", risk: "依附不可靠的人或关系。", advice: "先看价值观、利益和承诺是否一致。" },
  风天小畜: { verdict: "小有积蓄，能推进小事，大突破还差一口气。", risk: "小成果误判成大势已成。", advice: "先做小范围验证，慢慢加码。" },
  天泽履: { verdict: "履为临险而行，能走，但要守礼、守边界。", risk: "一步踩错，引发连锁反应。", advice: "每一步都留余地，避免越界承诺。" },
  地天泰: { verdict: "泰为通达，上下相交，局势总体顺。", risk: "顺境中松懈。", advice: "趁势推进，同时维护好支持关系。" },
  天地否: { verdict: "否为闭塞，当前气机不通，推进会费力。", risk: "越硬推越耗损。", advice: "先找堵点，暂停无效消耗。" },
  天火同人: { verdict: "同人主同心协力，公开透明更容易成事。", risk: "小圈子私下操作，引起猜疑。", advice: "把目标摊开讲，争取共同立场。" },
  火天大有: { verdict: "大有为资源在手，局面有可用资本。", risk: "资源多而管理不善。", advice: "把优势集中到最关键目标上。" },
  地山谦: { verdict: "谦为低处得益，退一步反而得助。", risk: "自我证明欲太强。", advice: "用低姿态换取空间和信任。" },
  雷地豫: { verdict: "豫为顺势而动，人心可用，适合启动。", risk: "兴奋过度，计划松散。", advice: "借势启动，但要落到执行表。" },
  泽雷随: { verdict: "随为顺从良势，跟对方向比独自硬闯更好。", risk: "盲随、失去判断。", advice: "选择可信的节奏和伙伴。" },
  山风蛊: { verdict: "蛊为旧弊待治，问题根子在历史遗留。", risk: "只修表面，不碰源头。", advice: "先清理旧账、旧习惯、旧承诺。" },
  地泽临: { verdict: "临为机会靠近，有人或资源正在接近你。", risk: "只等不迎，错过窗口。", advice: "主动表达诉求，靠近目标。" },
  风地观: { verdict: "观为观察风向，适合看局、看人、看趋势。", risk: "信息不足时过早表态。", advice: "多看几个信号再定策略。" },
  火雷噬嗑: { verdict: "噬嗑为咬合阻隔，需要决断和规则。", risk: "碍于情面不处理硬问题。", advice: "把问题摊开，按规则切断阻塞。" },
  山火贲: { verdict: "贲为修饰与呈现，外在表达很重要。", risk: "只重包装，内核不足。", advice: "让形式服务内容，别让形式盖过真实。" },
  山地剥: { verdict: "剥为消耗剥落，当前不宜硬撑。", risk: "继续投入导致更大损失。", advice: "先减负、止损、保护核心。" },
  地雷复: { verdict: "复为回转复起，旧事有新机。", risk: "刚有起色就急着扩张。", advice: "小步恢复，先修复基础关系。" },
  天雷无妄: { verdict: "无妄主不妄动，按事实行事自然无咎。", risk: "凭想象行动。", advice: "少猜，多验证，守住真实。" },
  山天大畜: { verdict: "大畜为蓄养实力，暂缓是为了更大推进。", risk: "急着证明自己。", advice: "积累筹码，等条件成熟。" },
  山雷颐: { verdict: "颐为养正，重点是补给、修复、长期供养。", risk: "消耗身体或资源。", advice: "先把供给链和精力补上。" },
  泽风大过: { verdict: "大过为压力过梁，事情承重过大。", risk: "独自扛太多。", advice: "拆分责任，寻找支点。" },
  坎为水: { verdict: "坎为险，险中可通，但必须谨慎。", risk: "看不见的坑、反复的阻碍。", advice: "多留备选方案，不走单线。" },
  离为火: { verdict: "离为明，事情会显露，名分、证据、表达重要。", risk: "情绪化或只看表面。", advice: "把事实照清楚，把话说准。" },
  泽山咸: { verdict: "咸为感应，彼此有触动，互动能牵动结果。", risk: "暧昧不明、被感觉牵着走。", advice: "真诚回应，但别过度试探。" },
  雷风恒: { verdict: "恒为持久，利长期稳定，不利频繁摇摆。", risk: "三分钟热度。", advice: "建立固定节奏，持续兑现。" },
  天山遁: { verdict: "遁为退避，暂退不是失败，是保全主动权。", risk: "正面冲突带来损耗。", advice: "拉开距离，保存筹码。" },
  雷天大壮: { verdict: "大壮为势强，能冲，但必须守边界。", risk: "势头太猛，引发反弹。", advice: "强而有制，先定分寸。" },
  火地晋: { verdict: "晋为上升，适合争取曝光、名位、进展。", risk: "只求被看见，忽略根基。", advice: "让成果被关键人看见。" },
  地火明夷: { verdict: "明夷为光受伤，宜藏锋避害。", risk: "过早暴露真实想法。", advice: "低调处理，先护住核心利益。" },
  风火家人: { verdict: "家人主内务与分工，内部稳定后外事才顺。", risk: "角色混乱、责任不明。", advice: "先定规矩和边界。" },
  火泽睽: { verdict: "睽为相背，双方看法不一致。", risk: "各说各话。", advice: "先求同，再处理分歧。" },
  水山蹇: { verdict: "蹇为行路艰难，前方有阻，换路比硬闯好。", risk: "明知受阻还强推。", advice: "求助、绕行、调整策略。" },
  雷水解: { verdict: "解为结散，压力开始松动，问题有解。", risk: "刚解开就大意。", advice: "趁松动时处理核心矛盾。" },
  山泽损: { verdict: "损为有舍有得，减少负担才能换空间。", risk: "舍不得沉没成本。", advice: "删减无效投入，保留关键价值。" },
  风雷益: { verdict: "益为增益，正向行动容易得到助力。", risk: "只想得利，不愿付出。", advice: "先贡献，再放大收益。" },
  泽天夬: { verdict: "夬为决断，拖延不如明快处理。", risk: "决断太硬，伤人伤己。", advice: "清楚表态，但留体面。" },
  天风姤: { verdict: "姤为相遇，突发机会与风险并存。", risk: "被新鲜感带偏。", advice: "看清来者的真实目的。" },
  泽地萃: { verdict: "萃为聚合，人气、资源、团队可聚。", risk: "人多而心不齐。", advice: "设共同目标，筛出核心人。" },
  地风升: { verdict: "升为循序上升，慢而有功。", risk: "嫌慢而改道。", advice: "按台阶推进，不跳级。" },
  泽水困: { verdict: "困为受限，外部条件紧，言多无益。", risk: "越解释越被困。", advice: "少说多做，保存实力。" },
  水风井: { verdict: "井为源头供给，资源在，但需维护渠道。", risk: "有资源却取用不当。", advice: "整理长期稳定的供给来源。" },
  泽火革: { verdict: "革为变革，旧法该换，新局可立。", risk: "变得太猛导致反噬。", advice: "先定新规则，再替换旧模式。" },
  火风鼎: { verdict: "鼎为更新结构，适合重组、升级、成新局。", risk: "只换形式，不换结构。", advice: "把人、事、资源重新摆位。" },
  震为雷: { verdict: "震为动，先惊后定，突发推动事情变化。", risk: "受惊后乱动。", advice: "先稳住，再顺势行动。" },
  艮为山: { verdict: "艮为止，停下是为了看清边界。", risk: "该停不停。", advice: "先止损、定界、观察。" },
  风山渐: { verdict: "渐为渐进，慢慢来更稳。", risk: "急求结果破坏节奏。", advice: "一步一证据，一步一确认。" },
  雷泽归妹: { verdict: "归妹为名分未正，关系或合作位置不稳。", risk: "先投入后确认名分。", advice: "先明确身份、承诺和边界。" },
  雷火丰: { verdict: "丰为盛大，事情有亮点和声势。", risk: "过满则溢。", advice: "繁盛时更要控节奏。" },
  火山旅: { verdict: "旅为漂泊，短期灵活，长期不稳。", risk: "把临时状态当长期承诺。", advice: "轻装前进，保留退路。" },
  巽为风: { verdict: "巽为入，柔和渗透比强攻有效。", risk: "太软导致没有立场。", advice: "温和表达，持续推进。" },
  兑为泽: { verdict: "兑为悦，沟通、交换、喜悦带来转机。", risk: "只图好听，不看实质。", advice: "把开心的互动落成真实承诺。" },
  风水涣: { verdict: "涣为散，先聚人心、聚资源。", risk: "局面分散难收束。", advice: "找共同焦点，把散的力量收回来。" },
  水泽节: { verdict: "节为节制，设限反而顺。", risk: "过度让步或过度控制。", advice: "定预算、定边界、定期限。" },
  风泽中孚: { verdict: "中孚为诚信，真诚能感人。", risk: "口惠而实不至。", advice: "用可验证的行动建立信任。" },
  雷山小过: { verdict: "小过小事可成，大事宜慎。", risk: "把小优势放大成大胜算。", advice: "小步通过，不做大赌。" },
  水火既济: { verdict: "既济为已成，成功后更要防松散。", risk: "临成之后出纰漏。", advice: "完成收尾，守住成果。" },
  火水未济: { verdict: "未济为未成，临门仍有缺口。", risk: "以为差不多就放松。", advice: "补齐最后条件，再求落地。" },
};

const lineMeanings = {
  1: "初爻主起点、根基、潜在动机，动则说明事情的根部已经开始变化。",
  2: "二爻主内在条件、个人位置、可依凭之处，动则说明自身策略或身边支持需要调整。",
  3: "三爻主关口、压力、进退之间，动则容易出现犹豫、冲突或关键选择。",
  4: "四爻主外部环境、上层关系、临门一步，动则外部态度或机会窗口会变。",
  5: "五爻主核心力量、主事者、决定权，动则关键人物或核心条件会牵动全局。",
  6: "上爻主结果、余波、收束，动则事情后段容易反转、过头或需要及时收尾。",
};

const typeGuidance = {
  事业: {
    focus: "事业问题看位置、时机、上级/客户态度与执行资源。",
    actions: ["把目标拆成最近两周能验证的小动作。", "找出真正有决定权的人，不要只和外围沟通。", "关键承诺尽量落到文字、时间和交付物。"],
  },
  感情: {
    focus: "感情问题看互动是否同频、名分是否清楚、对方行动是否持续。",
    actions: ["少用试探，多用清楚但不压迫的表达。", "观察对方是否愿意投入时间、解释计划、承担关系成本。", "别只看热度，要看稳定兑现。"],
  },
  财务: {
    focus: "财务问题先看风险、现金流、退出条件，再看收益。",
    actions: ["把最坏情况和可承受损失先算清。", "分阶段投入，不要一次押满。", "任何合作都要写清分账、期限、违约和退出。"],
  },
  健康: {
    focus: "健康问题此处只能做传统文化参考，不能替代医生诊断。",
    actions: ["有不适请及时就医检查。", "把作息、饮食、压力源先稳定下来。", "不要因为卦象好坏延误专业处理。"],
  },
  学业: {
    focus: "学业问题看积累、方法、节奏和临场稳定。",
    actions: ["先补最薄弱的一环。", "把复习或写作拆成每天可完成的块。", "用模拟反馈修正方法，而不是只靠用功时长。"],
  },
  通用: {
    focus: "此事要同时看当前处境、变化方向和可操作的关键点。",
    actions: ["先确定你真正想要的结果。", "把不可控因素和可控动作分开。", "选择一个最小行动，观察反馈后再推进。"],
  },
};

function pickJudgment(name) {
  return hexagramJudgments[name] || {
    verdict: "此卦未有专门断语，宜以上下卦象、动爻和变卦合参。",
    risk: "信息不足或判断过早。",
    advice: "先收集证据，再小步验证。",
  };
}

function movingAnalysis(lines) {
  const moving = lines.filter((line) => line.moving);
  if (!moving.length) {
    return "此卦无动爻，主静。事情短期内变化不大，适合守住当前节奏，先观察局势是否自然松动。";
  }

  return moving
    .map((line) => `${line.position}爻${line.label}发动：${lineMeanings[line.position] || "此爻发动，说明对应位置有变化。"}${line.label === "老阳" ? "老阳动，多是阳极转阴，强势处要防过头。" : "老阴动，多是阴极转阳，低处有转机。"}`)
    .join("\n");
}

function trend(primary, changed, movingCount) {
  if (!movingCount) return "本卦不变，判断重点放在当前格局本身。";
  if (movingCount >= 4) return `动爻较多，从「${primary.name}」到「${changed.name}」变化幅度大，说明此事变量密集，宜边走边校准。`;
  return `由「${primary.name}」变「${changed.name}」，说明事情会从当前处境转向新的结构，动爻就是转折处。`;
}

function buildFallbackAnswer({ question, hexagram }, reason) {
  const primary = pickJudgment(hexagram.primary.name);
  const changed = pickJudgment(hexagram.changed.name);
  const guide = typeGuidance[hexagram.questionType] || typeGuidance["通用"];
  const movingCount = hexagram.lines.filter((line) => line.moving).length;
  const movingText = movingAnalysis(hexagram.lines);

  return [
    reason ? `本次使用本地卦理备用解读：${reason}` : "本次使用本地卦理备用解读。",
    `直断：你问「${question}」。本卦「${hexagram.primary.name}」的判断是：${primary.verdict}变卦「${hexagram.changed.name}」提示后续走向：${changed.verdict}综合看，此事不是单看吉凶，而要看你能否抓住动爻所示的变化点。`,
    `本卦卦象：下卦${hexagram.primary.lower.name}为${hexagram.primary.lower.nature}，上卦${hexagram.primary.upper.name}为${hexagram.primary.upper.nature}。本卦代表当前处境，核心风险是：${primary.risk}当前最该做的是：${primary.advice}`,
    `动爻与变卦：${trend(hexagram.primary, hexagram.changed, movingCount)}\n${movingText}\n变卦风险是：${changed.risk}变卦建议是：${changed.advice}`,
    `问题侧重：${guide.focus}五行侧重为${hexagram.elementFocus}，表示判断时要特别留心与${hexagram.elementFocus}相关的象：规则/资源/流动/显现/承载中的哪一项正在影响结果。`,
    `行动建议：${guide.actions.join(" ")} 同时，把「${hexagram.movingText}」对应的人、事、时间点列出来，那里往往是最先出现反馈的地方。`,
    "近期信号：若接下来出现主动回应、条件松动、关键人表态，说明变卦方向开始显现；若反复拖延、沟通变少、成本上升，则先收缩动作，避免强行推进。",
  ].join("\n\n");
}

module.exports = { buildFallbackAnswer };
