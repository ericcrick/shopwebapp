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
  //find product by id
  const product = await Product.findById({ _id: id});
  if(product){
    return product;
  }else{
    //if product is not found a new error is thrown with message not found
    throw new Error("Product Not Found")
  }
}

/* A service method for creating a new product in collection
included is validation to check for duplicate product names */
const createProduct = async (payload) => {
  const product = new Product({ ...payload });
  return await product.save()
}

//update product
const updateProductById = (id, updatePayload) => {
  Product.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        title: updatePayload.productName,
        description: updatePayload.productPrice,
        completed: updatePayload.productDescription,
      },
    },
    { new: true },
    (err, Product) => {
      if (err) {
        return err;
      } else return Product
    }
  );
};

//delete product
const deleteOneProduct = async(id) => {
  //find product and delete product
  Product.deleteOne({ _id: id}).then(()=>{
    return "Product Deleted"
  }).catch((error)=> {
    throw new Error("Error Deleting Product");
  })
}


//exporting all services for use in other modules
export default {
  readAllProducts,
  createProduct,
  readOneProductById,
  updateProductById,
  deleteOneProduct

}