import express from "express";
import cors from "cors";
import users from "../routes/users";
import verification from "../routes/verification";
import verify from "../middleware/verify";
import auth from "../routes/auth";
import authorize from "../middleware/auth";
import lists from "../routes/lists";

export default function(app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.static("public"));
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("/verification/:token", verify, verification);
    app.use("/lists", authorize, lists);
    app.use( (err, req, res, next) => {
        if(err.status) return res.status(err.status).send();
        res.status(500).send({});
    })
}