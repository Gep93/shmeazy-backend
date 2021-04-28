import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, "8y/B?E(G+KbPeShV");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

export default auth;
