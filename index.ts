import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import users from "./routes/users";
import verification from "./routes/verification";
import verify from "./middleware/verify";
import auth from "./routes/auth";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import config from "config";

const app = express();

dotenv.config();
const uri = config.get('mongoDB.connectionString') || process.env.SHMEAZY_CONNECTION_STRING;

mongoose.set("useCreateIndex", true);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB...");
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/verification/:token", verify, verification);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});

const shmeazySchema = new mongoose.Schema({
  shopping_lists: [
    { name: String, items: [{ name: String, quantity: String, note: String }] },
  ],
});

const Shmeazy = mongoose.model("Shmeazy", shmeazySchema, "shmeazy");

async function getShopingLists() {
  const shmeazy = await Shmeazy.find();
  return shmeazy;
}

app.get("/shoppingLists", async (req, res) => {
  const lists = await getShopingLists();
  res.send(lists);
  console.log(lists);
});
