import mongoose from "mongoose";
import express from "express";
import User from "../models/user";
import Joi from "joi";
import sendMail, { getUserValidationBody } from "../services/mailService";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import config from "config";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  try {
    req.body.password = await argon2.hash(req.body.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 4,
      parallelism: 2,
    });
  } catch (err) {
    console.log(err);
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    dateCreated: new Date().getTime(),
    verified: false,
  });

  try {
    user = await user.save();

    let token = jwt.sign({ _id: user._id, verified: false }, config.get('jwtSecret') || process.env.SHMEAZY_JWT_SECRET );
    let html = getUserValidationBody(token);
    sendMail(
      process.env.SHMEAZY_NODEMAILER_MAIL || config.get('nodemailer.mail'),
      "gal.erzen.pajic@gmail.com",
      "Account Verification",
      "",
      html
    );
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

export default router;
