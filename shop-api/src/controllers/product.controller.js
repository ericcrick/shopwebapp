import { body, validationResult } from 'express-validator';
import ProductService from '../services/product.service.js';

//get all product controller
const getAllProducts = async (req, res) => {
  //find all product
  const allProduct = await ProductService.readAllProducts();
  if(allProduct){
    return res.status(200).json({
      message: "All Product",
      data: allProduct
    });
  }else{
    return res.status(500).json({
      message: "Server Error",
      data: null
    })
  }
}

//create product handler method
const createProduct = async (req, res) => {
  //check if errors are thrown by validation middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }else{
    //create product if there are no errors
    const payload = {
      productName : req.body.productName,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
    }
    ProductService.createProduct(payload).then((result)=>{
      res.status(201).json(result);
    }).catch((err)=>{
      res.status(400).json(err);
    })
  }
};

// get one product with id, handler method
const getOneProductById = async(req,res) => {
  try {
    //get id from request parameter

    //check if errors are thrown by validation middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }else{
      const id = req.params.id;
      //search product 
      const product = await ProductService.readOneProductById(id);
      return res.status(200).json(product);
    }

  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const updateOneProductById = (req, res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }else{
      //update product if there are no errors
      const updatePayload = {
        productName : req.body.productName,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
      }
      const id = req.params.id;
      const product = ProductService.updateProductById(id,updatePayload);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message});
  }
}

const deleteOneProductById = (req, res)=>{
  try {
    //get id from request parameter

    //check if errors are thrown by validation middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }else{
      const id = req.params.id;
      //search product 
      const product = ProductService.deleteOneProduct(id);
      return res.status(200).json(product);
    }

  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//export route handler methods for products
export default {
  getAllProducts,
  getOneProductById,
  createProduct,
  updateOneProductById,
  deleteOneProductById
}