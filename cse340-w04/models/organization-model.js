const pool = require("../database/")

/* ***************************
 *  Get all organizations
 * ************************** */
async function getAllOrganizations() {
  try {
    const data = await pool.query(
      "SELECT * FROM organization ORDER BY organization_name"
    )
    return data.rows
  } catch (error) {
    console.error("getAllOrganizations error: " + error)
  }
}

/* ***************************
 *  Get a single organization by id
 * ************************** */
async function getOrganizationById(organization_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM organization WHERE organization_id = $1",
      [organization_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getOrganizationById error: " + error)
  }
}

/* ***************************
 *  Insert new organization
 * ************************** */
async function insertOrganization(organization_name) {
  try {
    const sql =
      "INSERT INTO organization (organization_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [organization_name])
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Update existing organization
 * ************************** */
async function updateOrganization(organization_id, organization_name) {
  try {
    const sql =
      "UPDATE organization SET organization_name = $1 WHERE organization_id = $2 RETURNING *"
    const data = await pool.query(sql, [organization_name, organization_id])
    return data.rows[0]
  } catch (error) {
    console.error("updateOrganization error: " + error)
  }
}

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  insertOrganization,
  updateOrganization,
}
