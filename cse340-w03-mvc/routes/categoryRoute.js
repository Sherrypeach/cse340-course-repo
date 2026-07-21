const express = require("express");
const router = new express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/categories", categoryController.buildCategories);
router.get("/category/:id", categoryController.buildCategoryById);

module.exports = router;
