const Product = require("../models/Product");

// GET products
exports.getProducts = async (req, res) => {
  const products = await Product.find();

  res.json(products);
};

// GET single product
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
};

// CREATE product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  await product.deleteOne();

  res.json({
    message: "Product deleted",
  });
};