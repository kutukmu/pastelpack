import express from "express";
import UserModel from "../../Models/userModel";
import bcrypt from "bcryptjs";
import { getToken } from "../../utils";
import transporter from "../../transporter";
import Product from "../../Models/ProductModel";
import config from "../../config.js";
import { isAdmin, isAuth } from "../../utils";
const { ADMIN_PASSWORD } = config;
const Route = express.Router();

Route.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const extUser = await UserModel.findOne({ email: email });

  if (!extUser) {
    const user = new UserModel({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash;

        const newUser = await user.save();
        const token = getToken(newUser);
        const sendUser = { ...newUser._doc, token };
        const url = "http://localhost:5000/api/confirmation/" + newUser._id;

        let info = await transporter.sendMail({
          from: '"PastelPack 👻" <pastelpack0@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "✔ Email Confirmation", // Subject line
          html: `<h1>Thank you for Signing up to Pastel Pack, please click the link down below to verify email</h1>
    <a href="${url}">Confirm Email</a>`, // html body
        });

        res.status(201).send({ message: "User Created", user: sendUser });
      });
    });
  } else {
    res.status(500).send({ message: "User already exist" });
  }
});

Route.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const extUser = await UserModel.findOne({ email: email });

  if (!extUser) {
    res.status(400).send({ message: "User does not exist" });
  } else {
    const token = getToken(extUser);
    const sendUser = { ...extUser._doc, token };
    const isMatch = await bcrypt.compare(password, extUser.password);

    if (!isMatch) {
      res.status(400).send({ message: "Email or Password is wrong" });
    } else if (isMatch && !extUser.confirmed) {
      res.status(400).send({ message: "Please confirm your email" });
    } else if (isMatch && extUser.confirmed) {
      res.status(200).send({ message: "Login Succesfull", user: sendUser });
    }
  }
});

Route.get("/createadmin", async (req, res) => {
  try {
    const user = new UserModel({
      name: "Kerim",
      email: "kutukmu@gmail.com",
      confirmed: true,
      password: ADMIN_PASSWORD,
      isAdmin: true,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash;
        const newUser = await user.save();
      });
    });

    res.send("Admin created");
  } catch (error) {
    res.send({ msg: error.message });
  }
});

Route.get("/:id/cart", isAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    const foundItems = user.cartItems;
    res.status(201).send({ message: "Items found", foundItems });
  } catch (error) {
    res.status(400).send({ message: "cart items not found" });
  }
});

Route.post("/:id/cart", isAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const productid = req.body.productid;
    const user = await UserModel.findById(id);
    const product = await Product.findById(productid);
    const obj = {
      itemid: productid,
      image: product.image,
      name: product.name,
      price: Number(product.price),
      qty: 1,
    };

    user.cartItems.push(obj);

    const newuser = await user.save();

    res.status(201).send({ message: "Item Added to Cart", item: product });
  } catch (error) {
    res.status(400).send({ message: "Item not added to cart" });
  }
});

Route.delete("/:id/cart/:itemid", isAuth, async (req, res) => {
  try {
    const userid = req.params.id;
    const itemid = req.params.itemid;

    const user = await UserModel.findById(userid);

    const newitems = user.cartItems.filter((n) => n._id != itemid);

    user.cartItems = newitems;

    await user.save();
    res.status(201).send({ message: "item deleted" });
  } catch (error) {
    res.status(400).send({ message: "imte not deleted" });
  }
});

Route.put("/:id/cart/:itemid", isAuth, async (req, res) => {
  try {
    const userid = req.params.id;
    const itemid = req.params.itemid;
    const newval = req.body.val;
    const user = await UserModel.findById(userid);
    const newitems = user.cartItems.map((n) => {
      if (n._id == itemid) {
        return {
          itemid: n.itemid,
          image: n.image,
          name: n.name,
          price: n.price,
          qty: newval,
          size: n.size,
        };
      } else {
        return n;
      }
    });

    user.cartItems = newitems;

    await user.save();
    res.status(201).send({ message: "qty updated" });
  } catch (error) {
    res.status(400).send({ message: "qty not updated" });
  }
});

Route.put("/:id/cart/:itemid/size", isAuth, async (req, res) => {
  try {
    const userid = req.params.id;
    const itemid = req.params.itemid;
    const newval = req.body.val;
    const user = await UserModel.findById(userid);
    const newitems = user.cartItems.map((n) => {
      if (n._id == itemid) {
        return {
          itemid: n.itemid,
          image: n.image,
          name: n.name,
          price: n.price,
          qty: n.qty,
          size: newval,
        };
      } else {
        return n;
      }
    });

    user.cartItems = newitems;

    await user.save();
    res.status(201).send({ message: "qty updated" });
  } catch (error) {
    res.status(400).send({ message: "qty not updated" });
  }
});

export default Route;
