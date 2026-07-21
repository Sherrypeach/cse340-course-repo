const projectModel = require("../models/project-model");
const categoryModel = require("../models/category-model");

/* Build the /projects list page (next 5 upcoming projects) */
async function buildProjects(req, res, next) {
  try {
    const projects = await projectModel.getUpcomingProjects();
    res.render("projects", { title: "Upcoming Service Projects", projects });
  } catch (error) {
    next(error);
  }
}

/* Build the /project/:id details page */
async function buildProjectById(req, res, next) {
  try {
    const id = req.params.id;
    const project = await projectModel.getProjectById(id);

    if (!project) {
      const err = new Error("Project Not Found");
      err.status = 404;
      throw err;
    }

    const categories = await categoryModel.getCategoriesByProjectId(id);
    res.render("project", { title: project.name, project, categories });
  } catch (error) {
    next(error);
  }
}

module.exports = { buildProjects, buildProjectById };
