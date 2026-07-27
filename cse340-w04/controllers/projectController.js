const projectModel = require("../models/project-model")
const organizationModel = require("../models/organization-model")
const categoryModel = require("../models/category-model")
const projCont = {}

/* ***************************
 *  Build listing of all projects
 * ************************** */
projCont.buildProjectList = async function (req, res, next) {
  const projectList = await projectModel.getAllProjects()
  res.render("projects/project-list", {
    title: "Service Projects",
    nav: null,
    projectList,
  })
}

/* ***************************
 *  Build project details view
 * ************************** */
projCont.buildProjectDetails = async function (req, res, next) {
  const project_id = parseInt(req.params.project_id)
  const projectData = await projectModel.getProjectById(project_id)

  if (!projectData) {
    req.flash("notice", "Sorry, that project could not be found.")
    return res.redirect("/projects")
  }

  res.render("projects/project-details", {
    title: projectData.project_name,
    nav: null,
    project: projectData,
  })
}

/* ***************************
 *  Build the Add Project view
 * ************************** */
projCont.buildAddProject = async function (req, res, next) {
  const organizationList = await organizationModel.getAllOrganizations()
  res.render("projects/add-project", {
    title: "Add New Project",
    nav: null,
    errors: null,
    organizationList,
    project_name: "",
    project_description: "",
    organization_id: "",
  })
}

/* ***************************
 *  Process the Add Project form
 * ************************** */
projCont.addProject = async function (req, res, next) {
  const { project_name, project_description, organization_id } = req.body

  const insertResult = await projectModel.insertProject(
    project_name,
    project_description,
    organization_id
  )

  if (insertResult && insertResult.rowCount) {
    req.flash(
      "notice",
      `The project ${project_name} was successfully added.`
    )
    res.redirect("/projects")
  } else {
    const organizationList = await organizationModel.getAllOrganizations()
    req.flash("notice", "Sorry, adding the project failed.")
    res.status(501).render("projects/add-project", {
      title: "Add New Project",
      nav: null,
      errors: null,
      organizationList,
      project_name,
      project_description,
      organization_id,
    })
  }
}

/* ***************************
 *  Build the Edit Project view
 * ************************** */
projCont.buildEditProject = async function (req, res, next) {
  const project_id = parseInt(req.params.project_id)
  const projectData = await projectModel.getProjectById(project_id)

  if (!projectData) {
    req.flash("notice", "Sorry, that project could not be found.")
    return res.redirect("/projects")
  }

  const organizationList = await organizationModel.getAllOrganizations()

  res.render("projects/edit-project", {
    title: "Edit Project",
    nav: null,
    errors: null,
    organizationList,
    project_id: projectData.project_id,
    project_name: projectData.project_name,
    project_description: projectData.project_description,
    organization_id: projectData.organization_id,
  })
}

/* ***************************
 *  Process the Edit Project form
 * ************************** */
projCont.updateProject = async function (req, res, next) {
  const {
    project_id,
    project_name,
    project_description,
    organization_id,
  } = req.body

  const updateResult = await projectModel.updateProject(
    project_id,
    project_name,
    project_description,
    organization_id
  )

  if (updateResult) {
    req.flash(
      "notice",
      `The project ${project_name} was successfully updated.`
    )
    res.redirect("/projects")
  } else {
    const organizationList = await organizationModel.getAllOrganizations()
    req.flash("notice", "Sorry, updating the project failed.")
    res.status(501).render("projects/edit-project", {
      title: "Edit Project",
      nav: null,
      errors: null,
      organizationList,
      project_id,
      project_name,
      project_description,
      organization_id,
    })
  }
}

/* ***************************
 *  Build the Assign Categories view
 *  Shows every category as a checkbox,
 *  with the project's current categories checked
 * ************************** */
projCont.buildAssignCategories = async function (req, res, next) {
  const project_id = parseInt(req.params.project_id)
  const projectData = await projectModel.getProjectById(project_id)

  if (!projectData) {
    req.flash("notice", "Sorry, that project could not be found.")
    return res.redirect("/projects")
  }

  const categoryList = await categoryModel.getAllCategories()
  const assignedCategoryIds = await projectModel.getCategoryIdsForProject(
    project_id
  )

  res.render("projects/project-categories", {
    title: `Assign Categories: ${projectData.project_name}`,
    nav: null,
    project: projectData,
    categoryList,
    assignedCategoryIds,
  })
}

/* ***************************
 *  Process the Assign Categories form
 * ************************** */
projCont.updateProjectCategories = async function (req, res, next) {
  const project_id = parseInt(req.params.project_id)
  let { category_ids } = req.body

  // Normalize: if only one checkbox was checked, express gives a string
  // instead of an array, so we force it into an array either way.
  if (!category_ids) {
    category_ids = []
  } else if (!Array.isArray(category_ids)) {
    category_ids = [category_ids]
  }
  category_ids = category_ids.map((id) => parseInt(id))

  const success = await projectModel.setProjectCategories(
    project_id,
    category_ids
  )

  if (success) {
    req.flash("notice", "Categories were successfully updated.")
  } else {
    req.flash("notice", "Sorry, updating categories failed.")
  }
  res.redirect(`/projects/${project_id}`)
}

module.exports = projCont
