import { User } from '../models/user.model';
const jwt = require('jsonwebtoken');
export const isAuthenticated = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = await User.findById(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}
