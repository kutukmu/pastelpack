import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  image: { type: String, required: true },

  qty: { type: Number, required: true },
  itemid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const shippingSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  states: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shipping: shippingSchema,
    orderItems: [orderItemSchema],
    payment: { type: String, default: "Card" },
    itemTotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    taxFee: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
