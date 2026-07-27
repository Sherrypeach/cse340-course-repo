-- CSE 340 W04 - Database Schema
-- Run this once against your PostgreSQL database (locally or on Render)
-- to create the tables this app needs.

CREATE TABLE IF NOT EXISTS organization (
  organization_id SERIAL PRIMARY KEY,
  organization_name VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS project (
  project_id SERIAL PRIMARY KEY,
  project_name VARCHAR(150) NOT NULL,
  project_description TEXT NOT NULL,
  organization_id INTEGER NOT NULL REFERENCES organization(organization_id)
);

CREATE TABLE IF NOT EXISTS category (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL
);

-- Join table: one project can have many categories,
-- one category can apply to many projects.
CREATE TABLE IF NOT EXISTS project_category (
  project_id INTEGER NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, category_id)
);

-- Optional sample data so the app isn't empty on first run.
-- Comment these out if you'd rather start from a blank slate.
INSERT INTO organization (organization_name) VALUES
  ('Habitat for Humanity'),
  ('Local Food Bank')
ON CONFLICT DO NOTHING;
