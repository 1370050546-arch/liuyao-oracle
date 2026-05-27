const form = document.querySelector("#divination-form");
const questionInput = document.querySelector("#question");
const clearBtn = document.querySelector("#clear-btn");
const emptyState = document.querySelector("#empty-state");
const reading = document.querySelector("#reading");
const coins = document.querySelectorAll(".coin");

const trigrams = {
  "111": { name: "乾", nature: "天", element: "金", image: "刚健、开创、主导" },
  "011": { name: "兑", nature: "泽", element: "金", image: "悦纳、沟通、交换" },
  "101": { name: "离", nature: "火", element: "火", image: "光明、依附、显现" },
  "001": { name: "震", nature: "雷", element: "木", image: "启动、震动、突破" },
  "110": { name: "巽", nature: "风", element: "木", image: "渗透、顺势、渐进" },
  "010": { name: "坎", nature: "水", element: "水", image: "险阻、流动、谋略" },
  "100": { name: "艮", nature: "山", element: "土", image: "止步、边界、蓄势" },
  "000": { name: "坤", nature: "地", element: "土", image: "承载、配合、积累" },
};

const hexagramNames = {
  "111111": "乾为天",
  "000000": "坤为地",
  "010001": "水雷屯",
  "100010": "山水蒙",
  "010111": "水天需",
  "111010": "天水讼",
  "000010": "地水师",
  "010000": "水地比",
  "110111": "风天小畜",
  "111011": "天泽履",
  "000111": "地天泰",
  "111000": "天地否",
  "111101": "天火同人",
  "101111": "火天大有",
  "000100": "地山谦",
  "001000": "雷地豫",
  "011001": "泽雷随",
  "100110": "山风蛊",
  "000011": "地泽临",
  "110000": "风地观",
  "101001": "火雷噬嗑",
  "100101": "山火贲",
  "100000": "山地剥",
  "000001": "地雷复",
  "111001": "天雷无妄",
  "100111": "山天大畜",
  "100001": "山雷颐",
  "011110": "泽风大过",
  "010010": "坎为水",
  "101101": "离为火",
  "011100": "泽山咸",
  "001110": "雷风恒",
  "111100": "天山遁",
  "001111": "雷天大壮",
  "101000": "火地晋",
  "000101": "地火明夷",
  "110101": "风火家人",
  "101011": "火泽睽",
  "010100": "水山蹇",
  "001010": "雷水解",
  "100011": "山泽损",
  "110001": "风雷益",
  "011111": "泽天夬",
  "111110": "天风姤",
  "011000": "泽地萃",
  "000110": "地风升",
  "011010": "泽水困",
  "010110": "水风井",
  "011101": "泽火革",
  "101110": "火风鼎",
  "001001": "震为雷",
  "100100": "艮为山",
  "110100": "风山渐",
  "001011": "雷泽归妹",
  "001101": "雷火丰",
  "101100": "火山旅",
  "110110": "巽为风",
  "011011": "兑为泽",
  "110010": "风水涣",
  "010011": "水泽节",
  "110011": "风泽中孚",
  "001100": "雷山小过",
  "010101": "水火既济",
  "101010": "火水未济",
};

const hexThemes = {
  乾为天: "势强而宜正，主动可成，但忌刚过无柔。",
  坤为地: "宜顺势承载，先稳根基，再求推进。",
  水雷屯: "初起多阻，难处正是开局的代价。",
  山水蒙: "信息未明，先问清规则，再作判断。",
  水天需: "时机未熟，守住准备，等待可用之机。",
  天水讼: "争执之象，宜留证据，少逞口舌。",
  地水师: "需要组织和纪律，成败在执行。",
  水地比: "结盟之象，贵在找到可靠同道。",
  风天小畜: "小有积蓄，能进但不可贪快。",
  天泽履: "临险而行，守礼守边界则无咎。",
  地天泰: "上下相通，局面渐顺。",
  天地否: "气机不通，先止损，再疏通关系。",
  天火同人: "同心则利，公开透明胜过私下用力。",
  火天大有: "资源在手，可大展其用。",
  地山谦: "谦退反得助，低姿态更有力量。",
  雷地豫: "人心可动，宜借势启动。",
  泽雷随: "顺势而随，择良伴比单打独斗更佳。",
  山风蛊: "旧弊待治，先处理遗留问题。",
  地泽临: "机会临近，宜主动靠近目标。",
  风地观: "先观察风向，形势比情绪更重要。",
  火雷噬嗑: "有阻隔需决断，规则要明。",
  山火贲: "外在可修饰，核心仍要真实。",
  山地剥: "消耗渐重，不宜硬撑。",
  地雷复: "回转复起，旧事有新机。",
  天雷无妄: "不可妄动，按事实行事。",
  山天大畜: "积蓄实力，暂缓有利。",
  山雷颐: "养正之象，重点在补给与修复。",
  泽风大过: "压力过梁，需有人分担。",
  坎为水: "险中求通，谨慎比速度重要。",
  离为火: "事已显露，名分与证据很关键。",
  泽山咸: "感应相通，真诚互动可成。",
  雷风恒: "持久之象，贵在稳定节奏。",
  天山遁: "宜退一步，保全主动权。",
  雷天大壮: "势头强盛，忌冲动过界。",
  火地晋: "渐进有升，适合争取曝光。",
  地火明夷: "光在地下，宜藏锋避伤。",
  风火家人: "内务先齐，关系和分工要清楚。",
  火泽睽: "意见相背，先求同再谈进。",
  水山蹇: "前路受阻，换路径比硬闯好。",
  雷水解: "结可解，压力正在松动。",
  山泽损: "有舍才有得，减少负担是关键。",
  风雷益: "增益之象，行动越正越得助。",
  泽天夬: "决断之象，宜明快处理。",
  天风姤: "偶遇突发，机会与风险并存。",
  泽地萃: "聚合之象，人气资源可用。",
  地风升: "循序上升，慢而有功。",
  泽水困: "受困之象，少说多蓄力。",
  水风井: "源头可用，重在稳定供给。",
  泽火革: "变革之象，旧法该换。",
  火风鼎: "更新结构，可成新局。",
  震为雷: "动象强，先惊后定。",
  艮为山: "止象强，停下反能看清。",
  风山渐: "渐进之象，不可急求结果。",
  雷泽归妹: "名分未正，关系需厘清。",
  雷火丰: "盛大之象，繁盛中防过满。",
  火山旅: "漂泊之象，短期灵活为佳。",
  巽为风: "柔入之象，细水长流。",
  兑为泽: "悦象强，沟通带来转机。",
  风水涣: "涣散需聚，先收人心。",
  水泽节: "节制之象，设限反而顺。",
  风泽中孚: "诚信为本，真心可感人。",
  雷山小过: "小事可过，大事宜慎。",
  水火既济: "已成之象，防后续松散。",
  火水未济: "未成之象，临门仍需补足。",
};

const questionTypes = [
  { name: "事业", keys: ["工作", "事业", "跳槽", "升职", "项目", "创业", "offer", "面试"] },
  { name: "感情", keys: ["感情", "恋爱", "复合", "结婚", "对象", "喜欢", "关系"] },
  { name: "财务", keys: ["钱", "财", "投资", "股票", "收入", "买房", "生意", "合作"] },
  { name: "健康", keys: ["健康", "病", "身体", "治疗", "恢复", "医院"] },
  { name: "学业", keys: ["考试", "学习", "论文", "学校", "成绩", "申请"] },
];

const elementAdvice = {
  金: "金主规则、边界与决断，宜把条件写清，把取舍做明。",
  木: "木主生发与推进，宜循序生长，避免一开始用力过猛。",
  水: "水主信息、风险与流动，宜多查证、多留余地。",
  火: "火主显现、名声与判断，宜公开透明，避免情绪上头。",
  土: "土主稳定、承载与现实条件，宜先看资源和责任是否接得住。",
};

const typeAdvice = {
  事业: "问事业，先看时机与位置。本卦看当前局面，变卦看后续走向；动爻多则变化快，少则按部就班更稳。",
  感情: "问感情，重点看彼此是否同频。卦中若有阻，多半不是无情，而是节奏、名分或沟通方式需要调整。",
  财务: "问财务，先守风险再求收益。动爻提示钱财流向有变，适合把成本、期限、退出条件先算清。",
  健康: "问健康，此页只作传统文化解读，不能替代医生判断。卦象偏阻时，宜尽早检查、规律作息、遵医嘱。",
  学业: "问学业，卦象更看积累与方法。若本卦受阻，先补基础；若变卦转顺，说明调整策略后有起色。",
  通用: "问事看象，先分清当前处境，再看变化方向。动爻是事情的发力点，也是最该留心的位置。",
};

function tossLine() {
  const coins = Array.from({ length: 3 }, () => (Math.random() < 0.5 ? 2 : 3));
  const total = coins.reduce((sum, value) => sum + value, 0);
  return {
    total,
    yang: total === 7 || total === 9,
    moving: total === 6 || total === 9,
    label: total === 6 ? "老阴" : total === 7 ? "少阳" : total === 8 ? "少阴" : "老阳",
  };
}

function castHexagram() {
  return Array.from({ length: 6 }, tossLine);
}

function bitsFromLines(lines, changed = false) {
  return lines.map((line) => {
    const yang = changed && line.moving ? !line.yang : line.yang;
    return yang ? "1" : "0";
  }).join("");
}

function hexInfo(bits) {
  const lower = trigrams[bits.slice(0, 3)];
  const upper = trigrams[bits.slice(3, 6)];
  const name = hexagramNames[bits] || `${upper.name}${lower.name}`;
  return { bits, name, lower, upper, theme: hexThemes[name] || "卦象未收录详解，宜按上下卦象综合判断。" };
}

function detectQuestionType(question) {
  const found = questionTypes.find((type) => type.keys.some((key) => question.toLowerCase().includes(key.toLowerCase())));
  return found ? found.name : "通用";
}

function renderHexagram(target, lines, changed = false) {
  target.innerHTML = "";
  [...lines].reverse().forEach((line) => {
    const yang = changed && line.moving ? !line.yang : line.yang;
    const div = document.createElement("div");
    div.className = `yao ${yang ? "yang" : "yin"} ${line.moving ? "moving" : ""}`;
    div.title = line.label;
    target.appendChild(div);
  });
}

function buildReading(question, lines) {
  const primary = hexInfo(bitsFromLines(lines));
  const changed = hexInfo(bitsFromLines(lines, true));
  const moving = lines.map((line, index) => line.moving ? index + 1 : null).filter(Boolean);
  const type = detectQuestionType(question);
  const elements = [primary.lower.element, primary.upper.element, changed.lower.element, changed.upper.element];
  const focus = mostCommon(elements);
  const movingText = moving.length ? moving.map((line) => `第${line}爻`).join("、") : "无动爻";

  return {
    primary,
    changed,
    moving,
    movingText,
    type,
    focus,
    lines: lines.map((line, index) => ({
      position: index + 1,
      label: line.label,
      total: line.total,
      yinYang: line.yang ? "阳" : "阴",
      moving: line.moving,
    })),
    answer: [
      `你问的是「${question.trim()}」。本卦为「${primary.name}」，下卦${primary.lower.name}为${primary.lower.nature}，上卦${primary.upper.name}为${primary.upper.nature}，主象是${primary.lower.image}遇${primary.upper.image}。${primary.theme}`,
      moving.length
        ? `此卦动在${movingText}，事情不会完全停在当前状态。变卦为「${changed.name}」，表示后续会转向「${changed.theme}」动爻所在的位置，就是这件事最容易发生变化、也最值得主动处理的地方。`
        : `此卦无动爻，主静守。它更像是在说当前格局已经成形，短期不宜频繁改策略，先把本卦所示的处境看清。`,
      `${typeAdvice[type]}五行以${focus}为重，${elementAdvice[focus]}`,
      conclusion(primary.name, changed.name, moving.length, type),
    ],
  };
}

function mostCommon(items) {
  const counts = items.reduce((map, item) => {
    map[item] = (map[item] || 0) + 1;
    return map;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function conclusion(primaryName, changedName, movingCount, type) {
  const movement = movingCount === 0 ? "稳中观望" : movingCount <= 2 ? "小变可控" : "变化较多";
  const positiveNames = ["泰", "大有", "晋", "益", "升", "鼎", "中孚", "既济"];
  const blockedNames = ["否", "讼", "蹇", "困", "剥", "坎", "明夷"];
  const score = positiveNames.some((word) => changedName.includes(word)) ? 1 : blockedNames.some((word) => primaryName.includes(word)) ? -1 : 0;

  if (score > 0) {
    return `综合看，这是「${movement}而后转顺」的象。答案偏向可以推进，但要顺着变卦的方向调整做法，越具体、越有章法，越容易得到回应。`;
  }

  if (score < 0) {
    return `综合看，这是「${movement}但先有阻」的象。答案不宜贸然判吉，当前更适合收集信息、降低损耗，等关键阻力松动后再行动。`;
  }

  if (type === "感情") {
    return `综合看，成败不只在缘分，也在互动节奏。少猜、多确认，把话说清，比用情绪试探更有利。`;
  }

  if (type === "财务") {
    return `综合看，先保守评估，再小步验证。若要投入资源，建议分阶段，而不是一次押满。`;
  }

  return `综合看，此事有可为之处，但不宜只凭一股劲。先抓住动爻提示的变化点，再按变卦方向调整，结果会更稳。`;
}

function setAnswer(paragraphs, mode = "ready") {
  const answer = document.querySelector("#answer-text");
  answer.innerHTML = "";
  answer.dataset.mode = mode;

  paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    answer.appendChild(p);
  });
}

async function requestInterpretation(question, data) {
  const response = await fetch("/api/interpret", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      hexagram: {
        primary: data.primary,
        changed: data.changed,
        movingLines: data.moving,
        movingText: data.movingText,
        elementFocus: data.focus,
        questionType: data.type,
        lines: data.lines,
      },
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "解卦服务暂时不可用");
  }
  return payload.answer;
}

function splitAnswer(text) {
  return text
    .split(/\n{2,}|\n(?=[一二三四五六七八九十]+[、.．])|(?=\d+[.．、])/)
    .map((item) => item.replace(/^#+\s*/, "").trim())
    .filter(Boolean);
}

function showReading(data, lines, question) {
  document.querySelector("#primary-name").textContent = data.primary.name;
  document.querySelector("#changed-name").textContent = data.changed.name;
  document.querySelector("#moving-lines").textContent = data.movingText;
  document.querySelector("#element-focus").textContent = data.focus;
  document.querySelector("#question-type").textContent = data.type;

  renderHexagram(document.querySelector("#primary-hexagram"), lines);
  renderHexagram(document.querySelector("#changed-hexagram"), lines, true);

  setAnswer(["正在结合你的问题、本卦、变卦和动爻细看，不再只给套话。"], "loading");

  emptyState.classList.add("hidden");
  reading.classList.remove("hidden");

  requestInterpretation(question, data)
    .then((answer) => setAnswer(splitAnswer(answer)))
    .catch((error) => {
      setAnswer([
        `智能解卦暂时没有接通：${error.message}`,
        "下面先给你本地卦理备用解读。设置 DEEPSEEK_API_KEY 并用 node server.js 启动后，会自动切换为智能详细分析。",
        ...data.answer,
      ], "fallback");
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();

  if (!question) {
    questionInput.focus();
    questionInput.placeholder = "先写下你要问的事情，再摇卦。";
    return;
  }

  coins.forEach((coin) => coin.classList.add("tossing"));
  setTimeout(() => {
    const lines = castHexagram();
    const data = buildReading(question, lines);
    showReading(data, lines, question);
    coins.forEach((coin) => coin.classList.remove("tossing"));
  }, 820);
});

clearBtn.addEventListener("click", () => {
  questionInput.value = "";
  reading.classList.add("hidden");
  emptyState.classList.remove("hidden");
  questionInput.focus();
});
