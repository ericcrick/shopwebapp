import express from "express";
import { router } from "./src/router/router.js";
import * as dotenv from 'dotenv';
dotenv.config();

import { mongoDbConnection } from "./src/database/connection.js";

//server port
const PORT = process.env.PORT || 8000;

//creating a new express instance
const app = express();

//mongodb connection
mongoDbConnection


//use routers
app.use(router)



//starting server on port 8000
app.listen(PORT, async()=>{
  console.log(`Server listening on port ${PORT}`)
})
