const express = require("express");
const path = require("path");
require("dotenv").config();

const organizationRoute = require("./routes/organizationRoute");
const projectRoute = require("./routes/projectRoute");
const categoryRoute = require("./routes/categoryRoute");

const app = express();

/* View engine setup */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* Static files (CSS, images, etc.) */
app.use(express.static(path.join(__dirname, "public")));

/* Home page */
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* Routes */
app.use("/", organizationRoute);
app.use("/", projectRoute);
app.use("/", categoryRoute);

/* 404 handler - runs if no route above matched */
app.use((req, res, next) => {
  const err = new Error("Sorry, we couldn't find that page.");
  err.status = 404;
  next(err);
});

/* General error handler - must have 4 parameters (err, req, res, next) */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(`Error at "${req.originalUrl}": ${err.message}`);
  res.status(status).render("error", {
    title: status === 404 ? "Page Not Found" : "Server Error",
    status,
    message: status === 404
      ? err.message
      : "Sorry, something went wrong on our end. Please try again later.",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
