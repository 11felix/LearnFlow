import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    subtitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
      type:String,
      required:true
    },
    createAt:{
        type:Number,
        default:Date.now()
    }
});

const Post=mongoose.model('post',PostSchema);
export default Post;