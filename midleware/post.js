import mongoose from "mongoose"

import Post from "../models/Post.js"

const fetchAllPost=async(req,res,next)=>{
    const post=await Post.find({});
    res.locals.posts=post;
    next();
}

export {fetchAllPost};