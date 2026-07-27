/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const flash = require("connect-flash")
const messages = require("express-messages")
require("dotenv").config()

const staticRoute = require("./routes/staticRoute")
const organizationRoute = require("./routes/organizationRoute")
const projectRoute = require("./routes/projectRoute")
const categoryRoute = require("./routes/categoryRoute")

const app = express()

/* ***********************
 * Middleware
 *************************/
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
)

app.use(flash())
app.use(function (req, res, next) {
  res.locals.messages = messages(req, res)
  next()
})

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
app.use("/", staticRoute)
app.use("/organizations", organizationRoute)
app.use("/projects", projectRoute)
app.use("/categories", categoryRoute)

/* ***********************
 * 404 handler - must sit after all other routes
 *************************/
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  const status = err.status || 500
  const message =
    status == 404
      ? err.message
      : "Oh no! There was a crash. Maybe try a different route?"
  res.status(status).render("errors/error", {
    title: status,
    message,
    nav: null,
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 5000
const host = process.env.HOST || "localhost"

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
