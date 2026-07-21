# CSE 340 - W03 Assignment: MVC Implementation

Express + EJS + PostgreSQL app implementing Organizations, Projects, and
Categories with full Model-View-Controller separation.

## Project structure

```
server.js              entry point, mounts routes, 404/500 handlers
database/index.js       pg Pool connection
models/                 all database queries live here
controllers/            business logic, calls models, renders views
routes/                 express routers, mapped to controller functions
views/                  EJS templates + partials (header/footer)
public/css/style.css    styling
src/setup.sql           schema + seed data
```

## 1. Local setup

1. Install [Node.js](https://nodejs.org) (v18+) and [PostgreSQL](https://www.postgresql.org/download/) if you don't have them.
2. Unzip this project, then in a terminal:
   ```bash
   cd cse340-w03
   npm install
   ```
3. Create a local Postgres database, e.g.:
   ```bash
   createdb cse340
   ```
4. Load the schema and seed data:
   ```bash
   psql -d cse340 -f src/setup.sql
   ```
5. Copy the env example and fill in your local DB credentials:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set `DATABASE_URL` to your local connection string.
6. Run it:
   ```bash
   npm start
   ```
   Visit `http://localhost:3000`.

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "W03 MVC assignment"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
(Create the empty repo on GitHub first, then run the commands above.)

## 3. Deploy to Render

1. Go to https://render.com and sign in (or create an account) with GitHub.
2. **Create the database first:**
   - Click **New +** → **PostgreSQL**.
   - Give it a name, choose the free plan, click **Create Database**.
   - Once it's ready, open it and copy the **Internal Database URL** (or
     **External Database URL** if you want to run `setup.sql` from your own
     machine against it).
3. **Load the schema into the Render database:**
   - From your local machine:
     ```bash
     psql "<External Database URL from Render>" -f src/setup.sql
     ```
4. **Create the web service:**
   - Click **New +** → **Web Service**.
   - Connect your GitHub account and select this repository.
   - Settings:
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Under **Environment Variables**, add:
     - `DATABASE_URL` = the **Internal Database URL** from step 2
     - `NODE_ENV` = `production`
   - Click **Create Web Service**.
5. Render will build and deploy automatically. When it finishes, it gives you
   a live URL like `https://your-app-name.onrender.com` — that's the link you
   submit in Canvas along with your GitHub repo link.
6. Any time you `git push` new commits to `main`, Render redeploys
   automatically.

## 4. What to submit in Canvas

- Your GitHub repository URL
- Your Render deployed site URL

## Notes on how the assignment requirements are met

- **Organizations:** `/organizations` lists all orgs (links to details);
  `/organization/:id` shows org info + its projects (links to project details).
- **Projects:** `/projects` shows the next 5 upcoming projects with the
  organization name linked; `/project/:id` shows full project info, the
  organization link, and category tags (each tag links to `/category/:id`).
- **Categories:** `/categories` lists all categories (links to details);
  `/category/:id` shows all projects in that category (links to project
  details).
- **MVC pattern:** all SQL lives in `models/`, all `req/res` logic lives in
  `controllers/`, routes only map paths to controller functions.
- **Error handling:** unmatched routes trigger a 404; any thrown/model error
  is caught and passed to the general error-handling middleware
  (`err, req, res, next`), which renders `views/error.ejs`.
