const pool = require("../database/")

/* ***************************
 *  Get all projects, joined with organization name
 * ************************** */
async function getAllProjects() {
  try {
    const data = await pool.query(
      `SELECT p.*, o.organization_name
       FROM project AS p
       JOIN organization AS o
         ON p.organization_id = o.organization_id
       ORDER BY p.project_name`
    )
    return data.rows
  } catch (error) {
    console.error("getAllProjects error: " + error)
  }
}

/* ***************************
 *  Get a single project by id
 * ************************** */
async function getProjectById(project_id) {
  try {
    const data = await pool.query(
      `SELECT p.*, o.organization_name
       FROM project AS p
       JOIN organization AS o
         ON p.organization_id = o.organization_id
       WHERE p.project_id = $1`,
      [project_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getProjectById error: " + error)
  }
}

/* ***************************
 *  Insert new project
 * ************************** */
async function insertProject(
  project_name,
  project_description,
  organization_id
) {
  try {
    const sql =
      "INSERT INTO project (project_name, project_description, organization_id) VALUES ($1, $2, $3) RETURNING *"
    return await pool.query(sql, [
      project_name,
      project_description,
      organization_id,
    ])
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Update existing project
 * ************************** */
async function updateProject(
  project_id,
  project_name,
  project_description,
  organization_id
) {
  try {
    const sql =
      "UPDATE project SET project_name = $1, project_description = $2, organization_id = $3 WHERE project_id = $4 RETURNING *"
    const data = await pool.query(sql, [
      project_name,
      project_description,
      organization_id,
      project_id,
    ])
    return data.rows[0]
  } catch (error) {
    console.error("updateProject error: " + error)
  }
}

/* *******************************************
 *  Get all categories currently assigned
 *  to a specific project (their ids only)
 * ****************************************** */
async function getCategoryIdsForProject(project_id) {
  try {
    const data = await pool.query(
      "SELECT category_id FROM project_category WHERE project_id = $1",
      [project_id]
    )
    return data.rows.map((row) => row.category_id)
  } catch (error) {
    console.error("getCategoryIdsForProject error: " + error)
  }
}

/* *******************************************
 *  Replace all category assignments for a project
 *  with the new list of category ids submitted
 * ****************************************** */
async function setProjectCategories(project_id, category_ids) {
  try {
    await pool.query("DELETE FROM project_category WHERE project_id = $1", [
      project_id,
    ])

    if (category_ids && category_ids.length > 0) {
      const values = category_ids
        .map((_, i) => `($1, $${i + 2})`)
        .join(", ")
      const sql = `INSERT INTO project_category (project_id, category_id) VALUES ${values}`
      await pool.query(sql, [project_id, ...category_ids])
    }
    return true
  } catch (error) {
    console.error("setProjectCategories error: " + error)
    return false
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  insertProject,
  updateProject,
  getCategoryIdsForProject,
  setProjectCategories,
}
