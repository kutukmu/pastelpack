import express from "express";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserRoute from "./Routes/User";
import Order from "./Routes/Order/order";
import Orders from "./Routes/Orders/orders";
import UserModel from "./Models/userModel";
import ProductRoute from "./Routes/Product";
import stripe from "./Routes/Stripe";
import uplaodRoutes from "./Routes/uploadRoutes";
import contact from "./Routes/Contact/contact";
import path from "path";

const { MONGODB_URL, JWT_SECRET } = config;
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use("/api/user", UserRoute);
app.use("/api/product", ProductRoute);
app.use("/api/order", Order);
app.use("/api/orders", Orders);
app.use("/api/stripe", stripe);
app.use("/api/contact", contact);
app.use("/api/uploads", uplaodRoutes);

app.get("/api/confirmation/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findByIdAndUpdate(
      { _id: id },
      { confirmed: true }
    );
  } catch (error) {
    res.send(error);
  }

  return res.redirect("http://localhost:3000/signin");
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", function (req, res) {
  const index = path.join(__dirname, "/../frontend/build", "index.html");
  res.sendFile(index);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(config.PORT, () => console.log("started"));
