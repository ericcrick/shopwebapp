import mongoose from "mongoose";

//creating product schema for items
const UserSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    minLength:[4,'Name should be minimum of 5 characters']
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  role: {
    type: String,
    enum : ['user','admin'],
    default: 'user'
  },
  password:{
    type:String,
    required:true,
    minLength:[8,'Password should be minimum of 8 characters']
  },
  token:{
    type:String
  }
},  { timestamps: true }
);

export const User =  mongoose.model("User", UserSchema);