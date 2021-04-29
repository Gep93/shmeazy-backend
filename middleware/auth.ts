import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import config from "config";

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret') || process.env.SHMEAZY_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

export default auth;
