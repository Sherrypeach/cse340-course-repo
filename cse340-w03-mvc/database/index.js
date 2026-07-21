const { Pool } = require("pg");
require("dotenv").config();

/*
 * On Render (and most cloud Postgres hosts) SSL is required in production
 * but your local Postgres install usually does NOT use SSL.
 * This checks NODE_ENV so it works in both places without changes.
 */
let pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

module.exports = pool;
