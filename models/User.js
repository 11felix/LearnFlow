import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "",
  },
  displayName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    lowerCase: true,
    unique: true,
    trim: true,
  },
  role: {
    type: Number,
  },
  image: {
    type: String,
    default: "",
  },
  cover: {
    type: String,
    default: "./img/theme/light/code-1.jpg",
  },
  about:{
   type:String,
   default:""
  },
  gender: {
    type: String,
    default: "",
  },
  birthdate: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "+91 1234567890",
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const user = mongoose.model("user", UserSchema);

export default user;
