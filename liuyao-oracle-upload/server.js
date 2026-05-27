const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { interpret } = require("./lib/deepseek");
const { buildFallbackAnswer } = require("./lib/fallback");

const root = __dirname;
const port = Number(process.env.PORT || 4173);

async function loadLocalEnv() {
  try {
    const envText = await fs.readFile(path.join(root, ".env"), "utf8");
    envText.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
      if (!match || process.env[match[1]]) return;
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    });
  } catch {
    // .env is optional.
  }
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 80_000) {
      throw new Error("请求内容太长");
    }
  }
  return JSON.parse(body || "{}");
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(root, requested));

  if (filePath !== root && !filePath.startsWith(root + path.sep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/interpret") {
      const payload = await readJson(req);
      try {
        const answer = await interpret(payload);
        sendJson(res, 200, { answer, source: "ai" });
      } catch (error) {
        if (error.status === 400) {
          sendJson(res, 400, { error: error.message || "请求格式不正确" });
          return;
        }

        const answer = buildFallbackAnswer(payload, error.message || "AI 服务暂时不可用");
        sendJson(res, 200, { answer, source: "fallback", reason: error.message || "AI 服务暂时不可用" });
      }
      return;
    }

    if (req.method === "GET") {
      await serveStatic(req, res);
      return;
    }

    res.writeHead(405);
    res.end("Method not allowed");
  } catch (error) {
    sendJson(res, error.status || 500, { error: error.message || "服务器错误" });
  }
});

loadLocalEnv().then(() => {
  server.listen(port, () => {
    console.log(`六爻占卜网页已启动：http://127.0.0.1:${port}`);
    console.log(process.env.DEEPSEEK_API_KEY ? "DeepSeek 智能解卦：已启用" : "DeepSeek 智能解卦：未设置 DEEPSEEK_API_KEY，将使用后端本地卦理备用解读");
  });
});
