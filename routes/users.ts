import mongoose from "mongoose";
import express from "express";
import User from "../models/user";
import Joi from "joi";
import sendMail, { getUserValidationBody } from "../services/mailService";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    dateCreated: new Date().getTime(),
    verified: false,
  });

  try {
    user = await user.save();

    let tkn = jwt.sign({ _id: user._id, verified: false }, "8y/B?E(G+KbPeShV");
    console.log(tkn);
    let html = getUserValidationBody(tkn);

    console.log(html);
    sendMail(
      "gal.eren.pajic@gmail.com",
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
