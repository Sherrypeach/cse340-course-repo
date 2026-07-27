const organizationModel = require("../models/organization-model")
const orgCont = {}

/* ***************************
 *  Build the Add Organization view
 * ************************** */
orgCont.buildAddOrganization = async function (req, res, next) {
  res.render("organizations/add-organization", {
    title: "Add New Organization",
    nav: null,
    errors: null,
    organization_name: "",
  })
}

/* ***************************
 *  Process the Add Organization form
 * ************************** */
orgCont.addOrganization = async function (req, res, next) {
  const { organization_name } = req.body

  const insertResult = await organizationModel.insertOrganization(
    organization_name
  )

  if (insertResult && insertResult.rowCount) {
    req.flash(
      "notice",
      `The organization ${organization_name} was successfully added.`
    )
    res.redirect("/organizations")
  } else {
    req.flash("notice", "Sorry, adding the organization failed.")
    res.status(501).render("organizations/add-organization", {
      title: "Add New Organization",
      nav: null,
      errors: null,
      organization_name,
    })
  }
}

/* ***************************
 *  Build the Edit Organization view
 * ************************** */
orgCont.buildEditOrganization = async function (req, res, next) {
  const organization_id = parseInt(req.params.organization_id)
  const organizationData = await organizationModel.getOrganizationById(
    organization_id
  )

  if (!organizationData) {
    req.flash("notice", "Sorry, that organization could not be found.")
    return res.redirect("/organizations")
  }

  res.render("organizations/edit-organization", {
    title: "Edit Organization",
    nav: null,
    errors: null,
    organization_id: organizationData.organization_id,
    organization_name: organizationData.organization_name,
  })
}

/* ***************************
 *  Process the Edit Organization form
 * ************************** */
orgCont.updateOrganization = async function (req, res, next) {
  const { organization_id, organization_name } = req.body

  const updateResult = await organizationModel.updateOrganization(
    organization_id,
    organization_name
  )

  if (updateResult) {
    req.flash(
      "notice",
      `The organization ${organization_name} was successfully updated.`
    )
    res.redirect("/organizations")
  } else {
    req.flash("notice", "Sorry, updating the organization failed.")
    res.status(501).render("organizations/edit-organization", {
      title: "Edit Organization",
      nav: null,
      errors: null,
      organization_id,
      organization_name,
    })
  }
}

/* ***************************
 *  Build listing of all organizations
 * ************************** */
orgCont.buildOrganizationList = async function (req, res, next) {
  const organizationList = await organizationModel.getAllOrganizations()
  res.render("organizations/organization-list", {
    title: "Organizations",
    nav: null,
    organizationList,
  })
}

module.exports = orgCont
