const { body, validationResult } = require("express-validator")
const validate = {}

/* ******************************
 * Organization Data Validation Rules
 * ***************************** */
validate.organizationRules = () => {
  return [
    body("organization_name")
      .trim()
      .notEmpty()
      .withMessage("Please provide an organization name.")
      .isLength({ min: 3, max: 150 })
      .withMessage(
        "Organization name must be between 3 and 150 characters."
      ),
  ]
}

/* ******************************
 * Check data for New Organization and return errors
 * ***************************** */
validate.checkOrganizationData = async (req, res, next) => {
  const { organization_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render("organizations/add-organization", {
      title: "Add New Organization",
      nav: null,
      errors,
      organization_name,
    })
    return
  }
  next()
}

/* ******************************
 * Check data for Edit Organization and return errors
 * ***************************** */
validate.checkUpdateOrganizationData = async (req, res, next) => {
  const { organization_id, organization_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render("organizations/edit-organization", {
      title: "Edit Organization",
      nav: null,
      errors,
      organization_id,
      organization_name,
    })
    return
  }
  next()
}

module.exports = validate
