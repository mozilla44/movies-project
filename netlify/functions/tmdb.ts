
/* netlify function to hide the api key from the browser */

const TMDB_API_URL = "https://api.themoviedb.org/3";

export default async (request: Request) => {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/tmdb", "");
  const tmdbUrl = new URL(`${TMDB_API_URL}${path}${url.search}`);

  tmdbUrl.searchParams.set("api_key", Netlify.env.get("TMDB_API_KEY") ?? "");

  const response = await fetch(tmdbUrl);

  return new Response(response.body, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/tmdb/*",
};
