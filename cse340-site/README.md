# Community Connect — CSE 340 W01 Assignment

An Express + EJS site with Home, Organizations, Service Projects, and Categories
pages, built to satisfy the CSE 340 Week 1 assignment requirements.

## Project structure

```
server.js              Express app, routes
data/                   In-memory "data source" modules (async functions)
views/                  EJS pages
views/partials/         header.ejs and footer.ejs
public/css/style.css    Site stylesheet (responsive, accessible)
public/js/main.js       Mobile nav toggle
public/images/          Organization logos (placeholder SVGs — swap for real images)
```

## Run it locally

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` (this file is git-ignored):
   ```
   cp .env.example .env
   ```
3. Start the server:
   ```
   npm start
   ```
   or, with auto-reload during development:
   ```
   npm run dev
   ```
4. Visit `http://localhost:3000`.

## Push to GitHub

```
git init
git add .
git commit -m "Initial site: home, organizations, projects, categories"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

`.env` is already in `.gitignore`, so your local environment variables won't
be committed — only `.env.example` will be, which is safe to share.

## Deploy to Render

1. Push this repo to GitHub (see above).
2. In Render, create a new **Web Service** and connect your GitHub repo.
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add an environment variable `PORT` is not required (Render sets its own),
   but you can leave other variables from `.env.example` if you add more later.
5. Deploy, then confirm the live URL loads Home, Organizations, Service
   Projects, and Categories correctly.

## Notes on the requirements

- All pages share `header.ejs` / `footer.ejs` partials; the page `title` is
  passed in from each route and rendered with `<%= %>` inside the header.
- Partial `include()` calls use `<%- %>` (required to render partial HTML);
  every other piece of dynamic data uses `<%= %>` per the assignment's coding
  standard.
- `server.js` uses ESM `import`/`export`, `const`, camelCase, and arrow
  function route handlers, with `async/await` used for data retrieval.
- Organization photos live in `public/images/` — the four included here are
  simple placeholder SVGs; swap them out for real photos before submitting
  if you'd like something more polished.
