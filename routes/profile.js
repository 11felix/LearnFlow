

import express from "express";
const router=express.Router();
import { ensureAuth } from "../midleware/auth.js";
import { ensureSignUp } from "../midleware/user.js";
router.get('/profile',ensureAuth,ensureSignUp,(req,res)=>{
   res.render('profile-setting.ejs');
});

router.patch('/profile',ensureAuth,ensureSignUp,async(req,res)=>{
   try{
      const profileData=req.body;
      const user=req.user;
      for(const key in profileData){
         user[key]=profileData[key];
      }
      await user.save();
      res.send(user);
   }
   catch(err){
      console.log('err');
   }
   
})

export default router;
