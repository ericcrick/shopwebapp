import userService from "../services/user.service.js"
import { validationResult } from "express-validator";

//defining getting all users
const getAllUsersHandler = async (req,res)=>{
  try {
    const users = await userService.getAllUserService();
    if(users){
      return res.status(200).json(users);
    }
    return res.status(500).json("Users Not Available Now")
  } catch (error) {
    return res.status(500).json("Error Occured")
  }
}

const getUserByIdHandler = (req, res)=> {
  console.log(req.params.id);
  //check if errors are thrown by validation middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = userService.getUserByIdService(id).then((user)=>{
    return res.status(200).json(user);
  }).catch((err)=>{
    res.status(404).json({ message: "User Not Found"});
  })
}

export default {
  getAllUsersHandler,
  getUserByIdHandler
}