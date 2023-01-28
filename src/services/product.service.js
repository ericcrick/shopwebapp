import { Product } from "../models/product.model.js"

/* A service method for get all a list of all products in available in collection
with pagination enabled */
const readAllProducts = async ()=>{
  try {
    return await Product.find();

  } catch (error) {
    return error;
  }
}

/* A service method for getting one single product 
using product id */
const readOneProductById = async (id)=>{
  return await Product.findById({ _id: id});
}

/* A service method for creating a new product in collection
included is validation to check for duplicate product names */
const createProduct = async (payload) => {
  const product = new Product({ ...payload });
  return await product.save()
}

//update product
const updateProductById = async (id, updatePayload) => {
  try {
    return await Product.findByIdAndUpdate(id, updatePayload, { useFindAndModify: false });
  } catch (error) {
    return error
  }
};

//delete product
const deleteOneProduct = async(id) => {
  
  //find product and delete product
  const product = await readOneProductById(id);
  if(product){
    return await Product.deleteOne({ _id: id})
  }
  return product;

}


//exporting all services for use in other modules
export default {
  readAllProducts,
  createProduct,
  readOneProductById,
  updateProductById,
  deleteOneProduct

}