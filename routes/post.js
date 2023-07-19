import express from "express";
import { ensureAuth } from "../midleware/auth.js";
import { ensureSignUp, ensureCreator } from "../midleware/user.js";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import user from '../models/User.js';
import moment from "moment/moment.js";
import Comment from "../models/Comment.js";
const router = express.Router();

router.get("/create/post", ensureAuth, ensureCreator, (req, res) => {
  res.render("create-post");
});

router.post(
  "/create/post",
  ensureAuth,
  ensureSignUp,
  ensureCreator,
  async (req, res) => {
    try {
      const user = req.user;
      const post = await Post.create({
        ...req.body,
        userId: user._id,
      });
      console.log(post);
      res.status(200).send(post);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Something went wrong",
      });
    }
  }
);

router.get('/post/:id',ensureAuth,async(req,res)=>{
    const postId=req.params.id;
    console.log(postId);
    try{
      const post=await Post.findById(postId);
      if(!post){
        return res.redirect('/post-not-find');
      }
      const author=await user.findById(post.userId);
      const postDate=moment(post.createAt).format('dddd,MMMM Do YYYY');
      const comments=await Comment.find({postId:postId,depth:1});
      res.locals.post=post;
      res.locals.comments=comments;
      res.locals.author=author;
      res.locals.postDate=postDate;
      res.render('post');

    }catch(err){
        console.log(err);
        res.render('error-500');
    }
})


export default router;
