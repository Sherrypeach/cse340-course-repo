const pool = require("../database");

/* Get all organizations */
async function getOrganizations() {
  const sql = "SELECT * FROM organizations ORDER BY name";
  const data = await pool.query(sql);
  return data.rows;
}

/* Get a single organization by id */
async function getOrganizationById(id) {
  const sql = "SELECT * FROM organizations WHERE id = $1";
  const data = await pool.query(sql, [id]);
  return data.rows[0];
}

module.exports = { getOrganizations, getOrganizationById };
