import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';


//creating register user service
const registerUserService = async (payload)=>{
  try {
    let { email, password } = payload
  
    //Check if the user already exist or not
    const userExist = await User.findOne({ email: email});
    if (userExist) {
        return { message: 'User already exist with the given emailId' };
    }
    //Hash the provided password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    password = hashPassword;
    const user = new User({ ...payload, password});
    await user.save();
    const token = jwt.sign({
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

//Get user by id
const getUserByIdService = async (id) =>{
  try {
    return await User.findById({ _id: id});
  } catch (error) {
    return error;
  }
}

//creating deleting user by id service
const deleteUserByIdService = async (id)=>{
  try {
    return await User.findByIdAndRemove({_id: id });
  } catch (error) {
    return error;
  }
};

//update user by service
const updateUserByService = async( id, updatePayload)=>{
  try {
    const salt = await bcrypt.genSalt(10);
    //update user by id
    return await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: updatePayload?.name,
          password: await bcrypt.hash(updatePayload?.password, salt) ,
          email: updatePayload?.email
        },
      }
    );
  } catch (error) {
    return error;
  }
}


//login user service
const loginUserService = async (payload)=>{
  try {
    const { email, password } = payload;

    //Check if the user already exist or not
    const userExist = await User.findOne({ email: email});
    if(!userExist){
        return { message:'Wrong credentials'}
    }
    //Check password match
    const isPasswordMatched = await bcrypt.compare(password,userExist.password);
    if(!isPasswordMatched){
        return { message:'Wrong credentials pass'};
    }
    const token = jwt.sign({ 
      id: userExist._id , 
      email: userExist.email, 
      role: userExist.role }, 
      process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
} catch (error) {
    return error;
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