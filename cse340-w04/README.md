# CSE 340 W04 Assignment - Inserting and Updating Data

Node.js + Express + PostgreSQL app implementing Create/Edit for
Organizations, Projects, and Categories, plus assigning categories
to a project, following the MVC pattern.

## Folder structure

```
controllers/   -> no DB code, prepares data for views
models/        -> all database (pg) queries live here
routes/        -> route definitions, one file per resource
utilities/     -> validation rules + error handler
views/         -> EJS templates (layout + partials + per-resource folders)
public/css/    -> stylesheet
database/      -> pg pool connection + schema.sql
```

## Local setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your real Postgres
   connection string and a session secret:
   ```
   cp .env.example .env
   ```
3. Create the tables by running `database/schema.sql` against your
   database, e.g.:
   ```
   psql "$DATABASE_URL" -f database/schema.sql
   ```
4. Run the app:
   ```
   npm run dev
   ```
   Visit http://localhost:5000

## Deploying to Render

1. Push this repo to GitHub.
2. In Render, create a new Web Service from the repo.
   - Build command: `npm install`
   - Start command: `npm start`
3. Add environment variables in Render's dashboard (Environment tab):
   - `DATABASE_URL` (from your Render Postgres instance's "Internal
     Database URL")
   - `SESSION_SECRET`
4. Create a Render PostgreSQL database (if you don't have one yet)
   and run `database/schema.sql` against it once, either via the
   Render shell/psql or a local `psql` connection using the
   "External Database URL".
5. Submit both the GitHub repo URL and the Render URL in Canvas.

## Routes at a glance

| Resource     | List              | Add form (GET)              | Add (POST)                   | Edit form (GET)                          | Edit (POST)                               |
|--------------|-------------------|------------------------------|-------------------------------|-------------------------------------------|---------------------------------------------|
| Organization | GET /organizations| GET /organizations/new-organization | POST /organizations/new-organization | GET /organizations/edit-organization/:id | POST /organizations/edit-organization/:id |
| Project      | GET /projects     | GET /projects/new-project     | POST /projects/new-project     | GET /projects/edit-project/:id            | POST /projects/edit-project/:id            |
| Category     | GET /categories   | GET /categories/new-category  | POST /categories/new-category  | GET /categories/edit-category/:id         | POST /categories/edit-category/:id         |

Assigning categories to a project:
- GET `/projects/:project_id/categories` — checkbox list, current
  categories pre-checked
- POST `/projects/:project_id/categories` — saves the checked boxes

## Validation

- Organizations & Projects: required, min 3 / max length, both
  client-side (HTML attributes) and server-side (express-validator).
- Categories: required, max 100 chars enforced on both client and
  server; the **minimum of 3 characters is enforced only on the
  server**, intentionally left off the client-side `<input>` so that
  server-side validation can be tested directly (per assignment
  instructions).

## Notes

- Flash messages confirm success/failure on every create/update and
  redirect back to the resource list (or project details for
  category assignment).
- All Node.js functions follow MVC: models hold only DB queries,
  controllers hold no DB code, routes wire validation + controllers
  together.
