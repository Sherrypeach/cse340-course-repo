const express = require("express");
const router = new express.Router();
const organizationController = require("../controllers/organizationController");

router.get("/organizations", organizationController.buildOrganizations);
router.get("/organization/:id", organizationController.buildOrganizationById);

module.exports = router;
