const { body, validationResult } = require("express-validator")
const validate = {}

/* ******************************
 * Category Data Validation Rules
 * Server side: min 3, max 100 characters.
 * (Min length is intentionally NOT enforced on the
 * client so server-side validation can be tested.)
 * ***************************** */
validate.categoryRules = () => {
  return [
    body("category_name")
      .trim()
      .notEmpty()
      .withMessage("Please provide a category name.")
      .isLength({ min: 3, max: 100 })
      .withMessage(
        "Category name must be between 3 and 100 characters."
      ),
  ]
}

/* ******************************
 * Check data for New Category and return errors
 * ***************************** */
validate.checkCategoryData = async (req, res, next) => {
  const { category_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render("categories/add-category", {
      title: "Add New Category",
      nav: null,
      errors,
      category_name,
    })
    return
  }
  next()
}

/* ******************************
 * Check data for Edit Category and return errors
 * ***************************** */
validate.checkUpdateCategoryData = async (req, res, next) => {
  const { category_id, category_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render("categories/edit-category", {
      title: "Edit Category",
      nav: null,
      errors,
      category_id,
      category_name,
    })
    return
  }
  next()
}

module.exports = validate
