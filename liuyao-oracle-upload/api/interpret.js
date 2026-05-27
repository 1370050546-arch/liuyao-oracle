const { interpret } = require("../lib/deepseek");
const { buildFallbackAnswer } = require("../lib/fallback");

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const answer = await interpret(req.body);
    res.statusCode = 200;
    res.end(JSON.stringify({ answer, source: "ai" }));
  } catch (error) {
    if (error.status === 400) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: error.message || "请求格式不正确" }));
      return;
    }

    const answer = buildFallbackAnswer(req.body, error.message || "AI 服务暂时不可用");
    res.statusCode = 200;
    res.end(JSON.stringify({ answer, source: "fallback", reason: error.message || "AI 服务暂时不可用" }));
  }
};
