const fs = require("fs");
const path = require("path");
const pool = require("../database");

async function initDb() {
  try {
    const check = await pool.query(
      "SELECT to_regclass('public.organizations') AS exists"
    );

    if (check.rows[0].exists) {
      console.log("DB already initialized, skipping setup.sql");
      await pool.end();
      return;
    }

    const sql = fs.readFileSync(
      path.join(__dirname, "..", "src", "setup.sql"),
      "utf8"
    );
    await pool.query(sql);
    console.log("Database initialized from setup.sql");
    await pool.end();
  } catch (err) {
    console.error("initDb error:", err.message);
    await pool.end();
    process.exit(1);
  }
}

initDb();