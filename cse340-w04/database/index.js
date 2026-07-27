const { Pool } = require("pg")
require("dotenv").config()

/* ***************
 * Connection Pool
 * Local Postgres does NOT support SSL,
 * so we only enable it when running in production
 * (e.g. on Render), not on your own machine.
 * *************** */
let pool

if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params)
        console.log("executed query", { text })
        return res
      } catch (error) {
        console.error("error in query", { text })
        throw error
      }
    },
  }
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })
  module.exports = pool
}