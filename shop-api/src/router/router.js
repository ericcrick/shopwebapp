//create a new router
import { Router } from "express";
import { body, param } from 'express-validator';

export const router = Router();

import productController from "../controllers/product.controller.js";
import userController from "../controllers/user.controller.js";

//root handler
router.get('/', (req, res)=>{
  res.send("Shop Api starting.....")
});

//get all product handler
router.get('/products', productController.getAllProducts);

//get product by id handler
router.get('/products/:id',
param('id').isUUID('all'),
productController.getOneProductById
)

//create product handler
router.post('/products',
body('productName').notEmpty().isLength({ max: 100}),
body('productPrice').isFloat().notEmpty(),
productController.createProduct
);


//update product by id handler
router.put('/products/:id',
param('id').isUUID('all'),
body('productName').isLength({ max: 100}),
body('productPrice').isFloat(),
productController.updateOneProductById
)

//delete one product by id
router.delete('/products/:id',
param('id').isUUID('all'),
productController.deleteOneProductById
);


//user routes
router.get('/user', userController.getAllUsersHandler);


//export router for accessibility by other modules
export default router;