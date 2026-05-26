const Cart = require("../models/Cart");

// GET cart
exports.getCart = async (req, res) => {
  const cart = await Cart.find({
    user: req.user._id,
  }).populate("product");

  res.json(cart);
};

// ADD to cart
exports.addToCart = async (req, res) => {
  const { product, quantity } = req.body;

  const cartItem = await Cart.create({
    user: req.user._id,
    product,
    quantity,
  });

  res.status(201).json(cartItem);
};

// REMOVE from cart
exports.removeFromCart = async (req, res) => {
  const cartItem = await Cart.findById(req.params.id);

  if (!cartItem) {
    return res.status(404).json({
      message: "Cart item not found",
    });
  }

  await cartItem.deleteOne();

  res.json({
    message: "Item removed",
  });
};