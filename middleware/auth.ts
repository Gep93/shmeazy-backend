import jwt from "jsonwebtoken";
import User from "../models/user";
import * as dotenv from "dotenv";
import config from "config";

interface Iuser {
  [key: string]: any;
}

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  console.log('token', token);
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret') || process.env.SHMEAZY_JWT_SECRET);
    let user: Iuser = await User.findOne({ _id: decoded._id });
    if (!user.verified) return res.status(400).send("User not verified.");
    req.user = decoded;
    res.locals.params = req.params;
    next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
}

export default auth;
