//create a new router
import { Router } from "express";

export const router = Router();

router.get('/', (req, res)=>{
  res.send("Shop Api starting.....")
});


//export router for accessibility by other modules