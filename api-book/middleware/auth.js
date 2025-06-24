const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token, 'token..')
    if (!token || token == null) {
      return res.status(401).send({ error: "Access denied. No token provided." });
    }
    try {
      //const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
     // req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send({ error: "Invalid token." });
    }
  };
  
  module.exports = auth;