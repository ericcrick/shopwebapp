//create a new router
import { Router } from "express";
import { body, param } from 'express-validator';

export const router = Router();

import productController from "../controllers/product.controller.js";


//root handler
router.get('/', (req, res)=>{
  res.send("Shop Api starting.....")
});

//get all product handler
router.get('/products', productController.getAllProducts);

//get product by id handler
router.get('/products/:id',
  param('id').notEmpty(),
  productController.getOneProductById
)

//create product handler
router.post('/product',
body('productName').notEmpty(),
body('productPrice').isFloat().notEmpty(),
productController.createProduct
);


//export router for accessibility by other modules