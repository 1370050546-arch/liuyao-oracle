function buildPrompt({ question, hexagram }) {
  return [
    "你是一位严谨的六爻解卦助手。请把六爻作为传统文化和决策反思工具，不要装神弄鬼，不要绝对化预言。",
    "必须针对用户的具体问题回答，不能只写泛泛套话。结合本卦、变卦、动爻、上下卦、五行侧重和问题类型推理。",
    "输出中文，结构清晰，语气直接、有温度。请给出：",
    "1. 直断：先用一段话回答此事倾向如何。",
    "2. 卦象分析：说明本卦代表的当前处境。",
    "3. 动爻与变卦：说明变化点、风险点、转机。",
    "4. 针对问题的建议：给出3到5条具体行动建议。",
    "5. 时间与注意事项：说明近期该观察什么信号。",
    "如果问题涉及医疗、法律、投资等高风险事项，要提醒用户咨询专业人士。",
    "",
    `用户问题：${question}`,
    `问题类型：${hexagram.questionType}`,
    `本卦：${hexagram.primary.name}，下卦${hexagram.primary.lower.name}${hexagram.primary.lower.nature}，上卦${hexagram.primary.upper.name}${hexagram.primary.upper.nature}`,
    `本卦卦意：${hexagram.primary.theme}`,
    `变卦：${hexagram.changed.name}，下卦${hexagram.changed.lower.name}${hexagram.changed.lower.nature}，上卦${hexagram.changed.upper.name}${hexagram.changed.upper.nature}`,
    `变卦卦意：${hexagram.changed.theme}`,
    `动爻：${hexagram.movingText}`,
    `五行侧重：${hexagram.elementFocus}`,
    `六爻自下而上：${hexagram.lines.map((line) => `${line.position}爻${line.label}${line.moving ? "动" : "静"}`).join("，")}`,
  ].join("\n");
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw Object.assign(new Error("请求格式不正确"), { status: 400 });
  }

  if (!payload.question || typeof payload.question !== "string") {
    throw Object.assign(new Error("缺少问题内容"), { status: 400 });
  }

  if (!payload.hexagram || typeof payload.hexagram !== "object") {
    throw Object.assign(new Error("缺少卦盘信息"), { status: 400 });
  }

  if (!Array.isArray(payload.hexagram.lines)) {
    throw Object.assign(new Error("六爻信息不完整"), { status: 400 });
  }
}

async function interpret(payload) {
  validatePayload(payload);

  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  if (!deepseekKey) {
    const error = new Error("服务器没有检测到 DEEPSEEK_API_KEY");
    error.status = 503;
    throw error;
  }

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${deepseekKey}`,
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      temperature: 0.72,
      max_tokens: 1800,
      messages: [
        {
          role: "system",
          content: "你精通六爻、易经象数与现代咨询式表达。你的回答必须具体、可执行、和用户问题强相关。",
        },
        { role: "user", content: buildPrompt(payload) },
      ],
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error?.message || `DeepSeek 请求失败：${response.status}`);
    error.status = response.status;
    throw error;
  }

  return result.choices?.[0]?.message?.content?.trim() || "没有收到有效解读。";
}

module.exports = { interpret };
