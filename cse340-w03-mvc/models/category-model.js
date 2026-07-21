const pool = require("../database");

/* Get all categories */
async function getCategories() {
  const sql = "SELECT * FROM categories ORDER BY name";
  const data = await pool.query(sql);
  return data.rows;
}

/* Get a single category by id */
async function getCategoryById(id) {
  const sql = "SELECT * FROM categories WHERE id = $1";
  const data = await pool.query(sql, [id]);
  return data.rows[0];
}

/* Get all categories that belong to a given project (JOIN through project_categories) */
async function getCategoriesByProjectId(projectId) {
  const sql = `
    SELECT c.*
    FROM categories AS c
    JOIN project_categories AS pc ON c.id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name`;
  const data = await pool.query(sql, [projectId]);
  return data.rows;
}

module.exports = { getCategories, getCategoryById, getCategoriesByProjectId };
