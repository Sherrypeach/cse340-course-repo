import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getOrganizations } from './data/organizations.js';
import { getProjects } from './data/projects.js';
import { getCategories } from './data/categories.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const homeRoute = async (req, res) => {
  res.render('index', { title: 'Home' });
};

const organizationsRoute = async (req, res) => {
  const organizations = await getOrganizations();
  res.render('organizations', { title: 'Organizations', organizations });
};

const projectsRoute = async (req, res) => {
  const projects = await getProjects();
  res.render('projects', { title: 'Service Projects', projects });
};

const categoriesRoute = async (req, res) => {
  const categories = await getCategories();
  res.render('categories', { title: 'Categories', categories });
};

app.get('/', homeRoute);
app.get('/organizations', organizationsRoute);
app.get('/projects', projectsRoute);
app.get('/categories', categoriesRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
