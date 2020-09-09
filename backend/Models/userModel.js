import mongoose, { Schema } from "mongoose";

const cartItemSchema = new mongoose.Schema({
  itemid: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, default: 0 },
  size: { type: String, default: "S" },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false },
  cartItems: [cartItemSchema],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
