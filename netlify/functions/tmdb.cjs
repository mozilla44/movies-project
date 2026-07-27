const ALLOWED_PATHS = [
  /^genre\/movie\/list$/,
  /^discover\/movie$/,
  /^trending\/movie\/day$/,
  /^movie\/now_playing$/,
  /^movie\/upcoming$/,
  /^search\/movie$/,
  /^movie\/\d+$/,
  /^movie\/\d+\/credits$/,
];

const ALLOWED_QUERY_PARAMS = new Set([
  "language",
  "region",
  "sort_by",
  "page",
  "with_genres",
  "query",
]);

const jsonResponse = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: {
    "content-type": "application/json; charset=utf-8",
    ...extraHeaders,
  },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "Method not allowed" }, { allow: "GET" });
  }

  const path = (event.queryStringParameters?.path || "").replace(/^\/+|\/+$/g, "");
  if (!ALLOWED_PATHS.some((pattern) => pattern.test(path))) {
    return jsonResponse(404, { error: "Unknown TMDB endpoint" });
  }

  const apiKey = process.env.TMDB_API_KEY;
  const accessToken = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!apiKey && !accessToken) {
    console.error("TMDB_API_KEY or TMDB_READ_ACCESS_TOKEN is not configured");
    return jsonResponse(500, { error: "Movie service is not configured" });
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(event.queryStringParameters || {})) {
    if (key !== "path" && ALLOWED_QUERY_PARAMS.has(key) && typeof value === "string") {
      params.set(key, value.slice(0, 200));
    }
  }
  if (apiKey && !accessToken) params.set("api_key", apiKey);

  const url = `https://api.themoviedb.org/3/${path}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}`, accept: "application/json" }
        : { accept: "application/json" },
    });
    const body = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
        "cache-control": response.ok
          ? "public, max-age=300, s-maxage=3600"
          : "no-store",
      },
      body,
    };
  } catch (error) {
    console.error("TMDB request failed", error);
    return jsonResponse(502, { error: "Movie service is unavailable" });
  }
};
