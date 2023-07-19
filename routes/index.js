import express from "express";
import passport from "passport";
const router = express.Router();
import { ensureAuth, ensureGuest } from "../midleware/auth.js";
import {fetchAllPost} from '../midleware/post.js';

import {
  ensureCreator,
  ensureNewUser,
  ensureSignUp,
  ensureStudent,
} from "../midleware/user.js";

router.get("/", ensureGuest, (req, res) => {
  res.render("login");
});

router.get("/dashboard", ensureAuth, ensureSignUp,fetchAllPost, (req, res) => {
  res.render("dashboard");
});

router.get("/signup", ensureAuth, ensureNewUser, (req, res) => {
  res.render("signup-profile");
});
router.patch(
  "/user/update/role",
  ensureAuth,
  ensureNewUser,
  async (req, res) => {
    try {
      const user = req.user;
      user.role = Number(req.body.role);
      await user.save();
      res.status(200).send({});
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "something went wrong",
      });
    }
  }
);
export default router;
