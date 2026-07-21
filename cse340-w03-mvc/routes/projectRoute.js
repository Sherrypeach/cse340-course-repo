const express = require("express");
const router = new express.Router();
const projectController = require("../controllers/projectController");

router.get("/projects", projectController.buildProjects);
router.get("/project/:id", projectController.buildProjectById);

module.exports = router;
