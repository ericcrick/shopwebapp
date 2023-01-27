import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();


//mongo url
const mongoUrl = `mongodb+srv://eric:${process.env.MONGO_PASSWORD}@shopapi.epodua4.mongodb.net/?retryWrites=true&w=majority`;


mongoose.set('strictQuery', false)
//creating a new mongo url connection
export const mongoDbConnection = mongoose.connect(mongoUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("Database connection establised");
}).catch((err)=>{
  console.log(err);
})