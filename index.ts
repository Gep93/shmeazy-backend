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

const PORT = process.env.PORT ? process.env.PORT : 5000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
