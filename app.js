import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import ConnectDb from "./db/connectDb.js";
import connectMongo from "connect-mongo";
import session from "express-session";
import auth from "./routes/auth.js";
import "./config/passport.js";
import "./models/Post.js";
import passport from "passport";
import indexRoute from './routes/index.js';
import profileRoute from './routes/profile.js';
import routePost from './routes/post.js';
import routerComment from './routes/comments.js';
const app = express();
const MongoStore = connectMongo(session);

app.set("view engine", "ejs"); //template engine
ConnectDb();

app.use(express.json())
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);
app.use('/',indexRoute);
app.use('/',profileRoute);
app.use('/',routePost);
app.use('/',routerComment);
app.use('/*',(req,res)=>{
  res.render('error-404')
})
app.listen(3000, () => {
  console.log("App is listening at port 3000");
});
