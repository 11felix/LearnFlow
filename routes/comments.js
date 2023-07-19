import exrpess from 'express';
import mongoose from 'mongoose';

const router=exrpess.Router();
import {ensureAuth} from '../midleware/auth.js'
import Comment from '../models/Comment.js';
// const Comment=mongoose.model('comments');

router.post('/create/comment',ensureAuth,async(req,res)=>{
    try{
        const commentData=req.body;
        const author=req.user;
        const comment=await Comment.create({
            ...req.body,
            author:author.displayName,
            authorImg:author.image
        });
        console.log(comment);
        res.status(200).send(comment);
    }
    catch(err){
        console.log(err);
    }

})
router.get("/fetch/reply", ensureAuth, async (req, res) => {
    const parentId = req.query.parentId;
    const parentDepth = Number(req.query.parentDepth);
  
    try {
      const comments = await Comment.find({
        parentId: parentId,
        depth: parentDepth + 1,
      });
      res.status(200).send(comments);
    } catch (error) {
      console.log(error);
      res.status(500).send({});
    }
  });
export default router;