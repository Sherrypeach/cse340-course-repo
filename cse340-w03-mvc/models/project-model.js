const pool = require("../database");

/* Get the next 5 upcoming projects, with the organization name attached (JOIN needed) */
async function getUpcomingProjects() {
  const sql = `
    SELECT p.*, o.name AS organization_name
    FROM projects AS p
    JOIN organizations AS o ON p.organization_id = o.id
    WHERE p.project_date >= CURRENT_DATE
    ORDER BY p.project_date ASC
    LIMIT 5`;
  const data = await pool.query(sql);
  return data.rows;
}

/* Get a single project by id, with the organization name attached (JOIN needed) */
async function getProjectById(id) {
  const sql = `
    SELECT p.*, o.name AS organization_name
    FROM projects AS p
    JOIN organizations AS o ON p.organization_id = o.id
    WHERE p.id = $1`;
  const data = await pool.query(sql, [id]);
  return data.rows[0];
}

/* Get all projects belonging to a given organization */
async function getProjectsByOrganizationId(organizationId) {
  const sql = `
    SELECT * FROM projects
    WHERE organization_id = $1
    ORDER BY project_date ASC`;
  const data = await pool.query(sql, [organizationId]);
  return data.rows;
}

/* Get all projects belonging to a given category (JOIN through project_categories) */
async function getProjectsByCategoryId(categoryId) {
  const sql = `
    SELECT p.*
    FROM projects AS p
    JOIN project_categories AS pc ON p.id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date ASC`;
  const data = await pool.query(sql, [categoryId]);
  return data.rows;
}

module.exports = {
  getUpcomingProjects,
  getProjectById,
  getProjectsByOrganizationId,
  getProjectsByCategoryId,
};
