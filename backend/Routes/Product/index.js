import Product from "../../Models/ProductModel";
import express from "express";
import { isAdmin, isAuth } from "../../utils";
const Route = express.Router();

Route.post("/", isAuth, isAdmin, async (req, res) => {
  const {
    name,
    price,
    image,
    description,
    stock,
    category,
    isFeatured,
  } = req.body;

  const product = new Product({
    name,
    price,
    image,
    description,
    stock,
    category,
    isFeatured: isFeatured,
  });

  const newProduct = await product.save();

  if (newProduct) {
    res.status(201).send({ message: "Prodcut Created", product: newProduct });
  } else {
    res.status(500).send({ message: "Product creation error" });
  }
});

Route.get("/", async (req, res) => {
  const list = await Product.find();

  if (list) {
    res.status(201).send({ message: "Prodcuts Found", list });
  } else {
    res.status(400).send({ message: "Products not Found" });
  }
});
Route.get("/featured", async (req, res) => {
  const featured = await Product.findOne({ isFeatured: true });

  if (featured) {
    res
      .status(201)
      .send({ message: "feature Prodcut Found", product: featured });
  } else {
    res.status(400).send({ message: "featured Product not Found" });
  }
});

Route.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (product) {
    await product.remove();
    res.status(200).send({ message: "Product deleted" });
  } else {
    res.status(400).send({ message: "Product not found" });
  }
});

Route.put("/:id/review", isAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, rating, comment, createdAt } = req.body;
    const product = await Product.findById(id);

    product.reviews.push({ name, rating, comment, createdAt });

    await product.save();

    res.status(201).send({ message: "Review Added", data: "Success" });
  } catch (error) {
    res.status(400).send({ message: "Review not added", data: "Fail" });
  }
});

Route.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(201).send({ message: "Prodcut Found", product });
  } else {
    res.status(400).send({ message: "Product not Found" });
  }
});

Route.put("/:id", isAuth, isAdmin, async (req, res) => {
  const {
    name,
    price,
    image,
    description,
    stock,
    category,
    isFeatured,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.image = image;
    product.price = price;
    product.description = description;
    product.stock = stock;
    product.category = category;
    product.isFeatured = isFeatured;
    const updatedProduct = await product.save();
    res.status(201).send({ message: "Prodcut Updated", updatedProduct });
  } else {
    res.status(400).send({ message: "Product not updated" });
  }
});

export default Route;
