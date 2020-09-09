import express from "express";
import Order from "../../Models/OrderModel";

let Route = express.Router();

Route.get("/:id", async (req, res) => {
  try {
    let orderid = req.params.id;

    let order = await Order.findById(orderid);
    res.status(201).send({ message: "Order found", order });
  } catch (error) {
    res.status(400).send({ message: "order not found" });
  }
});

Route.patch("/:id", async (req, res) => {
  try {
    let orderid = req.params.id;
    const paid = req.body.isPaid;
    const delivered = req.body.isDelivered;
    if (paid) {
      let order = await Order.findById(orderid);
      order.isPaid = paid;
      await order.save();
    }
    if (delivered) {
      let order = await Order.findById(orderid);
      order.isDelivered = delivered;
      await order.save();
    }

    res.status(201).send({ message: "Order updated" });
  } catch (error) {
    res.status(400).send({ message: "order not updated" });
  }
});

Route.post("/", async (req, res) => {
  const {
    userid,
    shipping,
    subtotal,
    taxFee,
    shippingfee,
    total,
    orderitems,
  } = req.body;

  const newitems = orderitems.map((item) => {
    const { name, price, size, image, qty, itemid } = item;

    return {
      name,
      price,
      size,
      image,
      qty,
      itemid,
    };
  });

  try {
    const order = new Order({
      user: userid,
      shipping,
      itemTotal: subtotal,
      shippingFee: shippingfee,
      taxFee: taxFee,
      total,
      orderItems: newitems,
    });

    const neworder = await order.save();
    res.status(201).send({ message: "Order Created", order: neworder });
  } catch (error) {
    res.status(400).send({ message: "Order not created" });
  }
});

export default Route;
