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
  const id = req.params.id;
  userService.getUserByIdService(id).then((user)=>{
    if(user){
      return res.status(200).json(user);
    }
    return res.status(404).json({
      message: "User Not Found",
      status: 404
    });
  }).catch((err)=>{
    res.status(500).json({ message: "User Not Found"});
  })
};

const registerUserHandler = (req,res)=>{
  try {
    //check if errors are thrown by validation middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //create product if there are no errors
    userService.registerUserService(req.body).then((result)=>{
      if(!result.message){
        return res.status(201).json(result);
      }
      return res.status(400).json(result);
    }).catch((err)=>{
      res.status(500).json(err);
    })
  } catch (error) {
    if(err.code === 11000){
      return res.status(400).json({message: "Email Already Exist", status: 400});
    }
    return res.status(500).json({message: "Server Error", status: 500 })
  }
}

//login user handler
const loginUserHandler = (req,res) =>{
  try {
    //check if errors are thrown by validation middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //create product if there are no errors
    return userService.loginUserService(req.body).then((result)=>{
      if(!result.message){
        
        return res.cookie({"token": result}).json({success:true,message:'LoggedIn Successfully'})
      }
      return res.status(400).json({
        message: "User Not Found/Wrong Credentials"
      });
    })
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      status: 500
    })
  }
}

//delete user
const deleteUserHandler = (req, res)=>{
  const id = req.params.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return userService.deleteUserByIdService(id).then((result)=> {
      if(result){
        console.log(result);
        return res.status(200).json({
          message: "User Deleted"
        })
      }
      return res.status(404).json({
        message: "User Not Found"
      })
    })
  } catch (error) {
    return res.status(500).json(error);
  }
}


export default {
  getAllUsersHandler,
  getUserByIdHandler,
  registerUserHandler,
  loginUserHandler,
  deleteUserHandler
}