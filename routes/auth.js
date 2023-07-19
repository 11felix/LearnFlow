import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    const User=req.user;
    if(User.role!=0 || User.role!=1){
      return res.redirect('/signup');
    }
    res.redirect("/dashboard");
  }
);

router.get('/logout',(req,res)=>{
  req.logOut(()=>{
    res.redirect('/');
  })
})

export default router;
