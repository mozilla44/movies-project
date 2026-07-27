# movies-project

## Objective of this project 
- create a movie searching website pulling data from the movie database (TMDB)
- the site must have categories fliters
- user must be able to search for movies
- search should start displaying when user starts typing

## what i learned 
- working with other devs on a shared codebase
- reviewing code from others
- consolidating my knowlege of react

## Run locally

1. Create a TMDB account and obtain either a v4 read-access token or a v3 API key.
2. Copy `.env.example` to `.env`.
3. Set `TMDB_READ_ACCESS_TOKEN` or `TMDB_API_KEY` in `.env`. Do not add a
   `VITE_` prefix: Vite exposes variables with that prefix to browser code.
4. Install and start the app:

   ```sh
   npm install
   npm run dev
   ```

During local development, Vite's server-side proxy adds the TMDB credential.
The React app only sends requests to `/api/tmdb/...`.

## Deploy to Netlify

The included `netlify.toml` builds the Vite app, deploys the function in
`netlify/functions`, proxies `/api/tmdb/*` to that function, and enables
React Router fallback routes.

1. Push the project to a Git provider such as GitHub.
2. In Netlify, choose **Add new project** and import the repository.
3. Netlify will read the committed settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Open **Project configuration > Environment variables** and add either:
   - `TMDB_READ_ACCESS_TOKEN`, or
   - `TMDB_API_KEY`
5. If your Netlify plan offers variable scopes, include the **Functions**
   scope. Mark the value as secret when that option is available.
6. Trigger a new production deploy after adding or changing the variable.

Never add the secret to `netlify.toml`, commit `.env`, or use a `VITE_`
variable for it.

  
