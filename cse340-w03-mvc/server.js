const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const pool = require("./database");
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

/* Initialize the database (creates tables/seed data if they don't exist yet) */
async function initDb() {
  try {
    const check = await pool.query(
      "SELECT to_regclass('public.organizations') AS exists"
    );
    if (!check.rows[0].exists) {
      const sql = fs.readFileSync(
        path.join(__dirname, "src", "setup.sql"),
        "utf8"
      );
      await pool.query(sql);
      console.log("Database initialized from setup.sql");
    } else {
      console.log("DB already initialized, skipping setup.sql");
    }
  } catch (err) {
    console.error("initDb error:", err.message);
  }
}

const PORT = process.env.PORT || 3000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});