const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const { updateCart, addToCart } = require("../utils/helper");

// create a cart
exports.createCart = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.body;
  if (!productId) {
    return next(new ErrorHandler(` ProductId is missing!`, 400));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler(`Product not found!`, 404));
  }
  if (product.stock > 1) {
    return next(new ErrorHandler("Out of Stock !", 400));
  }

  // fetching user cart if already created
  const userCart = await Cart.findOne({ userId });

  const price = product.price;
  req.body.totalPrice = price;
  // setting items in body for new Card creation
  req.body.items = { productId, quantity: 1, price: price };
  req.body.userId = userId;
  //if no user cart then we have to create new cart
  if (!userCart) {
    const newCart = await Cart.create(req.body);
    return res.status(201).json({
      status: true,
      message: "Success",
      data: {
        newCart,
      },
    });
  }

  // if user already in the cart
  // getting index of the product in cart itmes array
  const ind = userCart.items.findIndex((p) => p.productId == productId);

  // the adding the details to cart if product found will increment else add new product to array
  const newCart = await addToCart(userCart, ind, req.body.items, price).save();
  res.status(201).json({
    status: true,
    message: "Success",
    data: {
      newCart,
    },
  });
});

//update cart
exports.updateCartById = catchAsyncError(async (req, res, next) => {
  const { cartId, removeProduct, productId } = req.body;
  const userId = req.user.id;
  // fetching cart
  const cart = await Cart.findOne({ userId }).select("+items.price");
  // if cart not found
  if (!cart) {
    return next(new ErrorHandler(`The cart with this id dose not exist!`, 404));
  }

  if (cart._id != cartId) {
    return next(new ErrorHandler(`CartId in body is not correct!`, 400));
  }

  //finding index of the itme in cart.items in array
  const ind = cart.items.findIndex((p) => p.productId == productId);

  // if item not found
  if (ind === -1) {
    return next(
      new ErrorHandler(
        `This Product is not in your cart!, Please provide valid productId`,
        400
      )
    );
  }

  // updating details to the cart
  const cartNew = await updateCart(removeProduct, cart, ind).save();

  res.status(200).json({
    status: true,
    message: "Success",
    data: {
      cartNew,
    },
  });
});

//get cart details by id
exports.getCartById = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart) {
    return next(new ErrorHandler(`Cart dose not found for this user!`, 404));
  }
  res.status(200).json({
    status: true,
    message: "Success",
    data: {
      cart,
    },
  });
});
