const organizationModel = require("../models/organization-model");
const projectModel = require("../models/project-model");

/* Build the /organizations list page */
async function buildOrganizations(req, res, next) {
  try {
    const organizations = await organizationModel.getOrganizations();
    res.render("organizations", { title: "Partner Organizations", organizations });
  } catch (error) {
    next(error);
  }
}

/* Build the /organization/:id details page */
async function buildOrganizationById(req, res, next) {
  try {
    const id = req.params.id;
    const organization = await organizationModel.getOrganizationById(id);

    if (!organization) {
      const err = new Error("Organization Not Found");
      err.status = 404;
      throw err;
    }

    const projects = await projectModel.getProjectsByOrganizationId(id);
    res.render("organization", { title: organization.name, organization, projects });
  } catch (error) {
    next(error);
  }
}

module.exports = { buildOrganizations, buildOrganizationById };
