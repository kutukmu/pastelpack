import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, default: 1 },
  comment: { type: String, required: true },
  createdAt: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, require: true },
  image: { type: String, require: true },
  description: { type: String, require: true },
  stock: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  qty: { type: Number, default: 1 },
  size: { type: String, default: "S" },
  reviews: [reviewSchema],
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
