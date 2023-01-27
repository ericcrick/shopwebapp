import mongoose from "mongoose";

//declare user types
const userTypes = {
  "admin": "admin",
  "user": "user"
}

//creating product schema for items
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true
  },

  userRole: {
    type: userTypes,
    default: userTypes.user,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);