import { boolean } from "joi";
import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 1024,
    },
    dateCreated: {
      type: Number,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
  })
);

export default User;
