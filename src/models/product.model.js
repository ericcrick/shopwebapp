import mongoose from "mongoose";

//creating product schema for items
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true
  },
  productDescription: {
    type: String,
    required: false
  },

  productPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

export const Product = mongoose.model("Product", ProductSchema);