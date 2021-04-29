import mongoose from "mongoose";
import express from "express";
import User from "../models/user";
import Joi from "joi";
import sendMail, { getUserValidationBody } from "../services/mailService";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";

const router = express.Router();
interface Iuser {
  [key: string]: any;
}

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user: Iuser = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");
  if (!user.verified) return res.status(400).send("User not verified.");

  try {
    if (await argon2.verify(user.password, req.body.password)) {
      let token = jwt.sign(
        { _id: user._id, verified: false },
        "8y/B?E(G+KbPeShV"
      );
      return res.header("x-auth-token", token).send("Verified");
    } else {
      return res.status(400).send("Invalid");
    }
  } catch (err) {
    console.log(err);
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
}

export default router;
