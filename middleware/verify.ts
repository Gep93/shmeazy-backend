import jwt from "jsonwebtoken";

function verify(req, res, next) {
  console.log("token", req.params.token);
  const token = req.params.token;
  if (!token) return res.status(400).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, "8y/B?E(G+KbPeShV");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

export default verify;
