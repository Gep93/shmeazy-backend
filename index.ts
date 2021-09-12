import path from "path";
import express from "express";
import routes from "./startup/routes"
import connectDb from "./startup/db";

const app = express();
routes(app);

// Connect to database
connectDb();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
