import express from "express";
import User from "../models/user";

const router = express.Router();

router.get("/", async (req, res) => {
  interface Iuser {
    [key: string]: any;
  }
  let user: Iuser = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send("User doesn't exist.");
  if (user.verified) return res.status(400).send("User already verified.");

  try {
    let query = { _id: req.user._id };
    const usr = await User.findOneAndUpdate(
      query,
      { verified: true },
      { new: true, useFindAndModify: false }
    );
    res.send(usr);
    // res.header("x-auth-token", token).send(usr);
  } catch (error) {
    console.log(error);
  }
});

export default router;
