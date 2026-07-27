const express = require("express")
const router = new express.Router()
const organizationController = require("../controllers/organizationController")
const orgValidate = require("../utilities/organization-validation")
const utilities = require("../utilities/")

// Route to build the list of organizations
router.get(
  "/",
  utilities.handleErrors(organizationController.buildOrganizationList)
)

// Route to build the add-organization view
router.get(
  "/new-organization",
  utilities.handleErrors(organizationController.buildAddOrganization)
)

// Route to process the add-organization form (POST)
router.post(
  "/new-organization",
  orgValidate.organizationRules(),
  orgValidate.checkOrganizationData,
  utilities.handleErrors(organizationController.addOrganization)
)

// Route to build the edit-organization view
router.get(
  "/edit-organization/:organization_id",
  utilities.handleErrors(organizationController.buildEditOrganization)
)

// Route to process the edit-organization form (POST)
router.post(
  "/edit-organization/:organization_id",
  orgValidate.organizationRules(),
  orgValidate.checkUpdateOrganizationData,
  utilities.handleErrors(organizationController.updateOrganization)
)

module.exports = router
