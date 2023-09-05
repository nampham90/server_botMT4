const jwt = require("jsonwebtoken");

module.exports  = (req, next) => {
  // since you are sending the token with the query
  console.log(req);
  return next();
 
};