import http from "node:http";

const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.SEELE_API_KEY;
const BASE_URL = "https://openapi.seeles.ai/v2/api";

function send(res, status, payload) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 1_000_000) throw new Error("Request body too large");
  }
  return raw ? JSON.parse(raw) : {};
}

async function seele(path, options = {}) {
  if (!API_KEY) throw new Error("SEELE_API_KEY is not configured in Railway");
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      authorization: `Bearer ${API_KEY}`,
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (req.method === "GET" && url.pathname === "/health") {
      return send(res, 200, { ok: true, service: "the-hollow-seele-bridge", configured: Boolean(API_KEY) });
    }

    if (req.method === "POST" && url.pathname === "/api/seele/jobs") {
      const body = await readJson(req);
      if (typeof body.prompt !== "string" || !body.prompt.trim()) {
        return send(res, 400, { ok: false, error: "prompt is required" });
      }
      const result = await seele("/jobs", { method: "POST", body: JSON.stringify({
        prompt: body.prompt,
        model: body.model || "Seele02-flash",
        engine: body.engine || "unreal",
        ...(body.generation_model ? { generation_model: body.generation_model } : {}),
        ...(Array.isArray(body.file_ids) ? { file_ids: body.file_ids } : {})
      }) });
      return send(res, result.status, result.data);
    }

    const match = url.pathname.match(/^\/api\/seele\/jobs\/([^/]+)$/);
    if (req.method === "GET" && match) {
      const result = await seele(`/jobs/${encodeURIComponent(match[1])}`);
      return send(res, result.status, result.data);
    }

    return send(res, 404, { ok: false, error: "Not found" });
  } catch (error) {
    const message = error?.message || "Internal server error";
    const status = message.includes("SEELE_API_KEY") ? 503 : 500;
    return send(res, status, { ok: false, error: message });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Seele bridge listening on ${PORT}`);
});
