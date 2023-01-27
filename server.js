import express, { urlencoded } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { router } from "./src/router/router.js";
import * as dotenv from 'dotenv';

//configuring dotenv to enable loading of environmental variables
dotenv.config();

import { mongoDbConnection } from "./src/database/connection.js";

//server port
const PORT = process.env.PORT || 8000;

//creating a new express instance
const app = express();

//mongodb connection
mongoDbConnection


//Cofiguring Cross Origin Resource Sharing
app.use(cors());

//Using express.json to get request of json data
app.use(express.json())
//Configuring cookie-parser
app.use(cookieParser()); 

//usingn urlencoded to parse incoming urls
app.use(urlencoded({ extended: false }));

//all routers
app.use(router);


//starting server on port 8000
app.listen(PORT, async()=>{
  console.log(`Server listening on port ${PORT}`)
})
