const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
const { getUserId } = require("../utils/jwtToken");

exports.addToCartFromLocalStorage = async (req, res) => {
  let userId = getUserId();
  let { cartItems } = req.body;
  let userCart = await cartModel
    .findOne({ userId })
    .populate("cartItems.productId");
  if (!userCart) {
    let cartDetails = {
      userId,
      cartItems: cartItems,
      totalPrice: req.body.totalPrice,
      totalItems: req.body.totalItems,
    };
    let newCart = await cartModel.create(cartDetails);
    return res
      .status(201)
      .send({ status: true, message: "Items added to cart", cart: newCart });
  } else {
    let totalItems = 0;
    let totalPrice = 0;

    userCart.cartItems.forEach((x) => {
      let id = x.productId._id.toString();
      cartItems.map((y) => {
        if (y.productId._id === id) {
          x.quantity += y.quantity;
        }
      });
    });

    cartItems.forEach((secondItem) => {
      const existingItem = userCart.cartItems.find(
        (item) =>
          item.productId._id.toString() === secondItem.productId._id.toString()
      );

      if (!existingItem) {
        userCart.cartItems.push(secondItem);
      }
    });

    userCart.cartItems.forEach((x) => {
      totalItems += x.quantity;
      totalPrice += x.quantity * x.productId.price;
    });

    userCart.cartItems = userCart.cartItems;
    userCart.totalPrice = totalPrice;
    userCart.totalItems = totalItems;
    userCart.save();
    return res.status(200).send({ cart: userCart });
  }
};

// create a cart
exports.createCart = catchAsyncError(async (req, res, next) => {
  let productId = req.body.productId;
  let userId = req.user.id;
  let validProduct = await productModel.findById(productId);
  if (!validProduct) {
    return res
      .status(404)
      .send({ status: false, message: "product not found with given id" });
  }

  if (validProduct.stock === 0) {
    return res
      .status(400)
      .send({ status: false, message: "item is not currently available" });
  }

  let userCart = await cartModel.findOne({ userId: userId });
  if (!userCart) {
    let items = [{ productId, quantity: 1 }];
    let cartDetails = {
      userId,
      cartItems: items,
      totalPrice: validProduct.price,
      totalItems: 1,
    };

    let newCart = await cartModel.create(cartDetails);
    return res
      .status(201)
      .send({ status: true, message: "Items added to cart", cart: newCart });
  } else {
    let cartItemIndex = userCart.cartItems.findIndex(
      (x) => x.productId == productId
    );

    // if user added same product in cart
    if (cartItemIndex >= 0) {
      let product = userCart.cartItems[cartItemIndex];
      product.quantity += 1;
      userCart.totalPrice += validProduct.price;
      let updatedCart = await cartModel.findByIdAndUpdate(
        userCart._id,
        userCart,
        { new: true }
      );
      return res
        .status(200)
        .send({ status: true, message: "Item added to cart", cart: updatedCart });
    }

    // if user added different product in cart
    else {
      let cart = {};
      cart.cartItems = userCart.cartItems;
      cart.cartItems.push({ productId, quantity: 1 });
      cart.totalItems = userCart.cartItems.length;
      cart.totalPrice = userCart.totalPrice + validProduct.price;
      let updatedCart = await cartModel.findByIdAndUpdate(userCart._id, cart, {
        new: true,
      });

      return res
        .status(200)
        .send({ status: true, message: "Item added to cart", cart: updatedCart });
    }
  }
});

//update cart
exports.updateCartById = catchAsyncError(async (req, res, next) => {
  let userId = req.user.id;
  let { productId, quantity } = req.body;

  let product = await productModel.findById(productId);
  if (!product) {
    return res
      .status(404)
      .send({ status: false, message: "product not found with given Id" });
  }
  if (quantity > product.stock) {
    return res.status(404).send({
      status: false,
      message: `maximum quantiy to buy is ${product.stock}`,
    });
  }
  let userCart = await cartModel.findOne({ userId });

  let item = userCart.cartItems.findIndex(
    (item) => item.productId == productId
  );
  if (item === -1) {
    return res
      .status(404)
      .send({ status: false, message: "This product not found in your cart" });
  }
  let updatedCart = {};
  const cartItem = userCart.cartItems[item];
  if (quantity < 1) {
    let totalItems = userCart.totalItems - 1;
    let totalPrice = userCart.totalPrice - cartItem.quantity * product.price;
    let cart = await cartModel
      .findByIdAndUpdate(
        userCart._id,
        {
          $pull: { cartItems: { productId: productId } },
          $set: { totalItems, totalPrice },
        },
        { new: true }
      )
      .populate("cartItems.productId");

    return res
      .status(200)
      .send({ status: true, msg: "cart updated", cart: cart });
  } else {
    updatedCart.cartItems = userCart.cartItems;
    updatedCart.totalItems = userCart.totalItems;
    updatedCart.totalPrice =
      userCart.totalPrice +
      (quantity * product.price - cartItem.quantity * product.price);
    cartItem.quantity = quantity;
    let cart = await cartModel
      .findByIdAndUpdate(userCart._id, updatedCart, {
        new: true,
      })
      .populate("cartItems.productId");
    return res
      .status(200)
      .send({ status: true, message: "cart updated", cart: cart });
  }
});

//get cart details by id
exports.getCartById = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const cart = await cartModel
    .findOne({ userId: userId })
    .populate("cartItems.productId");
  res.status(200).json({
    status: true,
    message: "Success",
    cart,
  });
});