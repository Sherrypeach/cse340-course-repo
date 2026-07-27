const express = require("express")
const router = new express.Router()
const projectController = require("../controllers/projectController")
const projValidate = require("../utilities/project-validation")
const utilities = require("../utilities/")

// Route to build the list of projects
router.get("/", utilities.handleErrors(projectController.buildProjectList))

// Route to build the add-project view
router.get(
  "/new-project",
  utilities.handleErrors(projectController.buildAddProject)
)

// Route to process the add-project form (POST)
router.post(
  "/new-project",
  projValidate.projectRules(),
  projValidate.checkProjectData,
  utilities.handleErrors(projectController.addProject)
)

// Route to build the edit-project view
router.get(
  "/edit-project/:project_id",
  utilities.handleErrors(projectController.buildEditProject)
)

// Route to process the edit-project form (POST)
router.post(
  "/edit-project/:project_id",
  projValidate.projectRules(),
  projValidate.checkUpdateProjectData,
  utilities.handleErrors(projectController.updateProject)
)

// Route to build the assign-categories view for a project
router.get(
  "/:project_id/categories",
  utilities.handleErrors(projectController.buildAssignCategories)
)

// Route to process the assign-categories form (POST)
router.post(
  "/:project_id/categories",
  utilities.handleErrors(projectController.updateProjectCategories)
)

// Route to build project details view
// (kept below the more specific routes above so it doesn't shadow them)
router.get(
  "/:project_id",
  utilities.handleErrors(projectController.buildProjectDetails)
)

module.exports = router
