const categoryModel = require("../models/category-model")
catCont = {}

/* ***************************
 *  Build listing of all categories
 * ************************** */
catCont.buildCategoryList = async function (req, res, next) {
  const categoryList = await categoryModel.getAllCategories()
  res.render("categories/category-list", {
    title: "Categories",
    nav: null,
    categoryList,
  })
}

/* ***************************
 *  Build the Add Category view
 * ************************** */
catCont.buildAddCategory = async function (req, res, next) {
  res.render("categories/add-category", {
    title: "Add New Category",
    nav: null,
    errors: null,
    category_name: "",
  })
}

/* ***************************
 *  Process the Add Category form
 * ************************** */
catCont.addCategory = async function (req, res, next) {
  const { category_name } = req.body

  const insertResult = await categoryModel.insertCategory(category_name)

  if (insertResult && insertResult.rowCount) {
    req.flash(
      "notice",
      `The category ${category_name} was successfully added.`
    )
    res.redirect("/categories")
  } else {
    req.flash("notice", "Sorry, adding the category failed.")
    res.status(501).render("categories/add-category", {
      title: "Add New Category",
      nav: null,
      errors: null,
      category_name,
    })
  }
}

/* ***************************
 *  Build the Edit Category view
 * ************************** */
catCont.buildEditCategory = async function (req, res, next) {
  const category_id = parseInt(req.params.category_id)
  const categoryData = await categoryModel.getCategoryById(category_id)

  if (!categoryData) {
    req.flash("notice", "Sorry, that category could not be found.")
    return res.redirect("/categories")
  }

  res.render("categories/edit-category", {
    title: "Edit Category",
    nav: null,
    errors: null,
    category_id: categoryData.category_id,
    category_name: categoryData.category_name,
  })
}

/* ***************************
 *  Process the Edit Category form
 * ************************** */
catCont.updateCategory = async function (req, res, next) {
  const { category_id, category_name } = req.body

  const updateResult = await categoryModel.updateCategory(
    category_id,
    category_name
  )

  if (updateResult) {
    req.flash(
      "notice",
      `The category ${category_name} was successfully updated.`
    )
    res.redirect("/categories")
  } else {
    req.flash("notice", "Sorry, updating the category failed.")
    res.status(501).render("categories/edit-category", {
      title: "Edit Category",
      nav: null,
      errors: null,
      category_id,
      category_name,
    })
  }
}

module.exports = catCont
