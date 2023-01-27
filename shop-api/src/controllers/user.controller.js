import userService from "../services/user.service.js"

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

export default {
  getAllUsersHandler
}