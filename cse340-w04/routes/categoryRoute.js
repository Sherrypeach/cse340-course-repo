const express = require("express")
const router = new express.Router()
const categoryController = require("../controllers/categoryController")
const catValidate = require("../utilities/category-validation")
const utilities = require("../utilities/")

// Route to build the list of categories
router.get("/", utilities.handleErrors(categoryController.buildCategoryList))

// Route to build the add-category view
router.get(
  "/new-category",
  utilities.handleErrors(categoryController.buildAddCategory)
)

// Route to process the add-category form (POST)
router.post(
  "/new-category",
  catValidate.categoryRules(),
  catValidate.checkCategoryData,
  utilities.handleErrors(categoryController.addCategory)
)

// Route to build the edit-category view
router.get(
  "/edit-category/:category_id",
  utilities.handleErrors(categoryController.buildEditCategory)
)

// Route to process the edit-category form (POST)
router.post(
  "/edit-category/:category_id",
  catValidate.categoryRules(),
  catValidate.checkUpdateCategoryData,
  utilities.handleErrors(categoryController.updateCategory)
)

module.exports = router
