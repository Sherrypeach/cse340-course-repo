const Util = {}

/* ************************
 * Wrap controller functions so any thrown/rejected
 * error is passed to Express's error-handling middleware
 * without needing try/catch in every route.
 ************************* */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
