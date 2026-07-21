-- CSE 340 W03 Assignment - Database Setup
-- Run this file against your Postgres database to create and seed the tables.

DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(150),
  city VARCHAR(100),
  state VARCHAR(2),
  zip VARCHAR(10),
  phone VARCHAR(20),
  email VARCHAR(100),
  url VARCHAR(200),
  description TEXT
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  project_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  organization_id INTEGER NOT NULL REFERENCES organizations(id)
);

CREATE TABLE project_categories (
  project_id INTEGER NOT NULL REFERENCES projects(id),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  PRIMARY KEY (project_id, category_id)
);

-- Seed data ------------------------------------------------------------

INSERT INTO organizations (name, address, city, state, zip, phone, email, url, description) VALUES
('Helping Hands Food Bank', '123 Main St', 'Rexburg', 'ID', '83440', '208-555-0101', 'info@helpinghands.org', 'https://helpinghands.org', 'A community food bank serving families in need.'),
('Green Valley Conservancy', '45 River Rd', 'Rexburg', 'ID', '83440', '208-555-0102', 'contact@greenvalley.org', 'https://greenvalley.org', 'A nonprofit dedicated to protecting local rivers and parks.'),
('Bright Futures Literacy', '9 School Ave', 'Rexburg', 'ID', '83440', '208-555-0103', 'hello@brightfutures.org', 'https://brightfutures.org', 'Providing tutoring and books to children in the community.');

INSERT INTO categories (name) VALUES
('Food Security'),
('Environment'),
('Education'),
('Community Outreach');

INSERT INTO projects (name, description, project_date, start_time, end_time, organization_id) VALUES
('Weekend Food Drive', 'Collecting and sorting canned goods for local families.', CURRENT_DATE + INTERVAL '3 days', '09:00', '13:00', 1),
('River Cleanup Day', 'Removing trash and debris along the Snake River trail.', CURRENT_DATE + INTERVAL '7 days', '08:00', '12:00', 2),
('Reading Buddies', 'Volunteers read with elementary students after school.', CURRENT_DATE + INTERVAL '10 days', '15:00', '17:00', 3),
('Pantry Restock', 'Organizing and restocking shelves at the food pantry.', CURRENT_DATE + INTERVAL '14 days', '10:00', '14:00', 1),
('Tree Planting', 'Planting native trees in the city park.', CURRENT_DATE + INTERVAL '20 days', '09:00', '11:30', 2),
('Book Drive', 'Collecting gently used books for local classrooms.', CURRENT_DATE + INTERVAL '25 days', '11:00', '15:00', 3);

INSERT INTO project_categories (project_id, category_id) VALUES
(1, 1), (1, 4),
(2, 2),
(3, 3), (3, 4),
(4, 1),
(5, 2),
(6, 3);
