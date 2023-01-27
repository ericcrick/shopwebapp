import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';


//creating register user service
const registerUserService = async (payload)=>{
  try {
    const { email, password } = payload
  
    //Check if the user already exist or not
    const userExist = await User.findOne({ email: email});
    if (userExist) {
        return { message: 'User already exist with the given emailId' };
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    password = hashPassword;
    const user = new User({ ...payload });
    await user.save();
    const token = await jwt.sign({
       id: user._id,
       email: user.email,
       role: user.role
      },
      process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return { user, token}
  } catch (error) {
    return error;
  }
}

//creating get user service
const getAllUserService = async ()=>{
  try {
    return await User.find();
  } catch (error) {
    return error;
  }
}

//creating get user by id service
const getUserByIdService = async (id) =>{
  try {
    const findUser = await User.findById({ _id: id});
    if(findUser){
      return findUser
    }
    return { message: "User Not Found "};
  } catch (error) {
    return error;
  }
}

//creating deleting user by id service
const deleteUserByIdService = async (id)=>{
  try {
    const findUser = await getUserByIdService(id);
    if(findUser){
      return await User.deleteOne({_id: id });
    }
    return {message: "User Not Found"}
  } catch (error) {
    return error;
  }
};

//update user by service
const updateUserByService = async(id, updatePayload)=>{
  try {
    //find if user exist
    const findUser = await getUserByIdService(id);
    if(findUser){
      //update user info
      const updateUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: updatePayload.name ? updatePayload.name : findUser.name,
            password: updatePayload.password ? bcrypt.hash(8,updatePayload.password) : findUser.password,
            email: updatePayload.email ? updatePayload.email : findUser.email
          },
        }, { new: true }
        );
        if(updateUser){
          return updateUser;
        }
        return { message: "Error Updating User"}
    }
    return { message: "User Not Found"};
  } catch (error) {
    return error;
  }
}


//login user service
const loginUserService = async (payload)=>{
  try {
    const { email, password } = payload;

    //Check if the user already exist or not
    const userExist = await userModel.findOne({email:req.body.email});
    if(!userExist){
        return {message:'Wrong credentials'}
    }
    //Check password match
    const isPasswordMatched = await bcrypt.compare(password,userExist.password);
    if(!isPasswordMatched){
        return {message:'Wrong credentials pass'};
    }
    const token = jwt.sign({ 
      id: userExist._id , 
      email: userExist.email, 
      role: userExist.role }, 
      process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return { token }
} catch (error) {
    return res.json({ error: error });
}
}



//exporting user services
export default {
  registerUserService,
  getAllUserService,
  getUserByIdService,
  deleteUserByIdService,
  loginUserService,
  updateUserByService
}