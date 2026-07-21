const categoryModel = require("../models/category-model");
const projectModel = require("../models/project-model");

/* Build the /categories list page */
async function buildCategories(req, res, next) {
  try {
    const categories = await categoryModel.getCategories();
    res.render("categories", { title: "Categories", categories });
  } catch (error) {
    next(error);
  }
}

/* Build the /category/:id details page */
async function buildCategoryById(req, res, next) {
  try {
    const id = req.params.id;
    const category = await categoryModel.getCategoryById(id);

    if (!category) {
      const err = new Error("Category Not Found");
      err.status = 404;
      throw err;
    }

    const projects = await projectModel.getProjectsByCategoryId(id);
    res.render("category", { title: category.name, category, projects });
  } catch (error) {
    next(error);
  }
}

module.exports = { buildCategories, buildCategoryById };
