import express from "express";
import Order from "../../Models/OrderModel";

let Route = express.Router();

Route.get("/:userid", async (req, res) => {
  try {
    let userid = req.params.userid;

    let orders = await Order.find({ user: userid });
    res.status(201).send({ message: "Order found", orders });
  } catch (error) {
    res.status(400).send({ message: "order not found" });
  }
});

Route.get("/", async (req, res) => {
  try {
    let orders = await Order.find();
    res.status(201).send({ message: "Order found", orders });
  } catch (error) {
    res.status(400).send({ message: "order not found" });
  }
});

export default Route;
