import { boolean } from "joi";
import mongoose from "mongoose";
import {IUser} from "../interfaces";

const User = mongoose.model<IUser & mongoose.Document>(
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
    }
    // shoppingLists: [{
    //   name: String,
    //   created: String,
    //   items: [{
    //       name: String,
    //       quantity: String,
    //       unit: String,
    //       packaging: String,
    //       note: String
    //   }]
    // }],
  })
);

export default User;
