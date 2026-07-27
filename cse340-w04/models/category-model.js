const pool = require("../database/")

/* ***************************
 *  Get all categories
 * ************************** */
async function getAllCategories() {
  try {
    const data = await pool.query(
      "SELECT * FROM category ORDER BY category_name"
    )
    return data.rows
  } catch (error) {
    console.error("getAllCategories error: " + error)
  }
}

/* ***************************
 *  Get a single category by id
 * ************************** */
async function getCategoryById(category_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM category WHERE category_id = $1",
      [category_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getCategoryById error: " + error)
  }
}

/* ***************************
 *  Insert new category
 * ************************** */
async function insertCategory(category_name) {
  try {
    const sql =
      "INSERT INTO category (category_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [category_name])
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Update existing category
 * ************************** */
async function updateCategory(category_id, category_name) {
  try {
    const sql =
      "UPDATE category SET category_name = $1 WHERE category_id = $2 RETURNING *"
    const data = await pool.query(sql, [category_name, category_id])
    return data.rows[0]
  } catch (error) {
    console.error("updateCategory error: " + error)
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
}
