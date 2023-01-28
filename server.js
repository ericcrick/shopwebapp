import express, { urlencoded } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { router } from "./src/router/router.js";
import * as dotenv from 'dotenv';
import swaggerJsdoc  from "swagger-jsdoc";
import * as swaggerUI from 'swagger-ui-express';

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



//configuring swagger-ui express documentation
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shop Web Api Documentation",
      version: "1.0.0",
      description:
        "This is a CRUD API created with Nodejs and Swagger_UI for Documentation ",
      license: {
        name: "MIT",
        url: "https://shop-api-backend.herokuapp.com/",
      },
      contact: {
        name: "Eric Nana-Osei",
        email: "kwabenacrick@outlook.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        url: "https://shopweb-api.herokuapp.com/"
      },
    ],
  },
  apis: ["./src/router/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);


//starting server on port 8000
app.listen(PORT, async()=>{
  console.log(`Server listening on port ${PORT}`)
})
