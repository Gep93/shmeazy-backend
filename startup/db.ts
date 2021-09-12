import mongoose from "mongoose";
import * as dotenv from "dotenv";
import config from "config";

export default function() {
    dotenv.config();
    const uri = config.get('mongoDB.connectionString') || process.env.SHMEAZY_CONNECTION_STRING;

    mongoose.set("useCreateIndex", true);
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
    console.log("Connected to MongoDB...");
    });
}