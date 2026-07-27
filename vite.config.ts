import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const accessToken = env.TMDB_READ_ACCESS_TOKEN;
  const apiKey = env.TMDB_API_KEY;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/tmdb": {
          target: "https://api.themoviedb.org",
          changeOrigin: true,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
          rewrite: (path: string) => {
            const tmdbPath = path.replace(/^\/api\/tmdb/, "/3");
            if (!apiKey || accessToken) return tmdbPath;
            return `${tmdbPath}${tmdbPath.includes("?") ? "&" : "?"}api_key=${encodeURIComponent(apiKey)}`;
          },
        },
      },
    },
  };
})
