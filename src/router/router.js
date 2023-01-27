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
param('id').isLength({min: 24, max: 24}),
productController.getOneProductById
)

//create product handler
router.post('/products',body('productName').notEmpty().isLength({ max: 100}),
body('productPrice').isFloat().notEmpty(),
productController.createProduct
);


//update product by id handler
router.put('/products/:id', param('id').isLength({min: 24, max: 24}),
body('productName').isLength({ max: 100}), productController.updateOneProductById
)

//delete one product by id
router.delete('/products/:id',
param('id').isLength({min: 24, max: 24}),
productController.deleteOneProductById
);


//get all users
router.get('/user', userController.getAllUsersHandler);


//get user by id
router.get('/user/:id', param('id').isLength({min: 24, max: 24}), userController.getUserByIdHandler);


//login user
router.post('/user/login', body('email').isEmail().notEmpty(),
body('password').notEmpty(),
userController.loginUserHandler
);

//register user
router.post('/user', body('email').isEmail().notEmpty(),
body('password').notEmpty(),
body('name').notEmpty(),
body('role').notEmpty(),
userController.registerUserHandler
);

//delete user
router.delete('/user/:id', param('id').isLength({min: 24, max: 24}), userController.deleteUserHandler);


//export router for accessibility by other modules
export default router;