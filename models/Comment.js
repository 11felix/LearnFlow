import mongoose from "mongoose";
const commnetSchema=new mongoose.Schema({
    postId:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    authorImg:{
        type:String,
        required:true
    },
    commentText:{
        type:String,
        required:true 
    },
    parentId:{
        type:String,
        default:null 
    },
    depth:{
        type:Number,
        default:1 
    },
    createdAt:{
        type:Number,
        default:Date.now() 
    }
});

const Comment= mongoose.model('comment',commnetSchema);
export default Comment;