import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Living Room", "Bedroom", "Dining & Kitchen", "Decor & Lighting"]
  },
  status: {
    type: String,
    default: "available",
    enum: ["available", "sold"]
  }
}, {
  timestamps: true
});
const Product = mongoose.model("Product", productSchema);
export default Product;