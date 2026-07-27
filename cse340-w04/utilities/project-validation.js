const { body, validationResult } = require("express-validator")
const organizationModel = require("../models/organization-model")
const validate = {}

/* ******************************
 * Project Data Validation Rules
 * ***************************** */
validate.projectRules = () => {
  return [
    body("project_name")
      .trim()
      .notEmpty()
      .withMessage("Please provide a project name.")
      .isLength({ min: 3, max: 150 })
      .withMessage("Project name must be between 3 and 150 characters."),

    body("project_description")
      .trim()
      .notEmpty()
      .withMessage("Please provide a project description.")
      .isLength({ min: 3, max: 1000 })
      .withMessage(
        "Project description must be between 3 and 1000 characters."
      ),

    body("organization_id")
      .notEmpty()
      .withMessage("Please select an organization.")
      .isInt()
      .withMessage("Organization selection is invalid."),
  ]
}

/* ******************************
 * Check data for New Project and return errors
 * ***************************** */
validate.checkProjectData = async (req, res, next) => {
  const { project_name, project_description, organization_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const organizationList = await organizationModel.getAllOrganizations()
    res.render("projects/add-project", {
      title: "Add New Project",
      nav: null,
      errors,
      organizationList,
      project_name,
      project_description,
      organization_id,
    })
    return
  }
  next()
}

/* ******************************
 * Check data for Edit Project and return errors
 * ***************************** */
validate.checkUpdateProjectData = async (req, res, next) => {
  const {
    project_id,
    project_name,
    project_description,
    organization_id,
  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const organizationList = await organizationModel.getAllOrganizations()
    res.render("projects/edit-project", {
      title: "Edit Project",
      nav: null,
      errors,
      organizationList,
      project_id,
      project_name,
      project_description,
      organization_id,
    })
    return
  }
  next()
}

module.exports = validate
