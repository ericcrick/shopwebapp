import { validationResult } from 'express-validator';
import ProductService from '../services/product.service.js';

//get all product controller
const getAllProducts = (req, res) => {
  ProductService.readAllProducts().then(result => {
    res.status(200).json(result);
  }).catch(error => res.status(500).send("Error Occured"));
}

//create product handler method
const createProduct = async (req, res) => {
  try {
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
        if(result){
          return res.status(201).json(result);
        }
        return res.status(400).json("Invalid Request");
      }).catch((err)=>{
        if(err.code === 11000){
          return res.status(400).json({message: "Product Name Already Exist", status: 400});
        }
        res.status(500).json(err);
      })
    }
  } catch (error) {
    return res.json({message: "Server Error"});
  }
};

// get one product with id, handler method
const getOneProductById = async(req,res) => {
  //get id from request parameter
  const id = req.params.id;
  //search product 
  ProductService.readOneProductById(id).then((result)=>{
    if(result){
      return res.status(200).json(result);
    }
    res.status(404).json({message: "Product Not Found"});
  }).catch((error)=>{
    return res.status(500).json({message: "Server Error"});
  })
}

const updateOneProductById = (req, res)=>{

  //check if there are any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;
  //update product
  ProductService.updateProductById(id,req.body).then((result)=>{
    if(result){
      return res.status(200).json(result);
    }
    return res.status(400).json({ message: "Invalid Request"})
  }).catch((error)=>{
    return res.status(500).json("Server Error");
  })
} 

const deleteOneProductById = (req, res)=>{
  try {
    //get id from request parameter
    const id = req.params.id;
    //search product 
    ProductService.deleteOneProduct(id).then((result)=>{
      if(result){
        return res.status(200).json(result);
      }
      return res.status(404).json({ message: "Product Not Found"})
    }).catch((error)=>{
      return res.status(400).json("Invalid Request");
    })

  } catch (error) {
    return res.json({ error: error.message })
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