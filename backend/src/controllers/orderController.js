const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");

// create order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  let userId = req.user.id;
  let { name, phone, house, street, city, state, pincode } = req.body.form;
  let cart = await cartModel
    .findOne({ userId: userId })
    .populate("cartItems.productId", "stock");
  if (!cart) {
    return next(new ErrorHandler("User cart not found", 404));
  }
  if (cart.cartItems.length <= 0) {
    return next(new ErrorHandler("Cart Is Empty!", 400));
  }
  const filter = cart.cartItems.filter((x) => x.quantity > x.productId.stock);
  if (filter.length > 0) {
    return next(new ErrorHandler("Out of Stock", 400));
  }
  let order = {
    userId,
    orderDetails: {
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      products: cart.cartItems,
    },
    shippingDetails: {
      name,
      phone,
      address: {
        house,
        street,
        city,
        state,
        pincode,
      },
    },
  };
  let userOrder = await orderModel.create(order);
  cart.cartItems.forEach(async (item) => {
    await productModel.findByIdAndUpdate(
      item.productId._id,
      { $inc: { stock: -item.quantity } },
      { new: true }
    );
  });

  await cartModel.findByIdAndUpdate(
    cart._id,
    { $set: { cartItems: [], totalItems: 0, totalPrice: 0 } },
    { new: true }
  );

  return res.status(200).send({ status: true, message: "Order Done", userOrder });
});

exports.getOrder = catchAsyncError(async (req, res, next) => {
  let userId = req.user.id;
  let order = await orderModel
    .find({
      userId,
      status: { $in: ["pending", "delivered", "payed", "cancled"] },
    })
    .populate("orderDetails.products.productId");

  if (!order) {
    return next(new ErrorHandler("You Don't have any order", 404));
  }

  return res.status(200).send({ status: true, msg: "User order", order });
});

exports.getSpecificOrder = catchAsyncError(async (req, res, next) => {
  let orderId = req.params.orderId;
  let order = await orderModel
    .findById(orderId)
    .populate("orderDetails.products.productId");
  return res.status(200).send({ status: true, order });
});

//cancel the order
exports.cancelOrder = catchAsyncError(async (req, res, next) => {
  let orderId = req.params.orderId;
  if (!orderId) {
    return res
      .status(400)
      .send({ status: false, message: "Please provide orderId" });
  }
  let userOrder = await orderModel.findById(orderId);

  if (userOrder.status !== "payed") {
    return res
      .status(400)
      .send({ status: false, msg: "Order cannot be cancel" });
  }
  userOrder.orderDetails.products.forEach(async (product) => {
    await productModel.findByIdAndUpdate(
      product.productId,
      { $inc: { stock: +product.quantity } },
      { new: true }
    );
  });
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { $set: { status: "cancled" } },
    { new: true }
  );
  return res.status(200).send({ status: true, message: "order cancled", order });
});

//updatedOrder the order
exports.updatedOrder = catchAsyncError(async (req, res, next) => {
  let { productId } = req.body;
  let orderId = req.params.orderId;
  if (!orderId) {
    return res
      .status(400)
      .send({ status: false, message: "Please provide orderId" });
  }

  if (!productId) {
    return res
      .status(400)
      .send({ status: false, message: "Please provide productId" });
  }

  let userOrder = await orderModel.findById(orderId);
  if (!userOrder) {
    return res
      .status(404)
      .send({ status: false, message: "order not found with this id" });
  }

  if (userOrder.status !== "payed") {
    return res
      .status(400)
      .send({ status: false, message: "Order cannot be updated" });
  }
  let product = await productModel.findById(productId);
  if (!product) {
    return res.status(404).send({ status: false, message: "productId invalid" });
  }
  if (userOrder.orderDetails.products.length === 0) {
    return res
      .status(400)
      .send({ status: false, message: "your order is already empty" });
  }
  // get quantity of removed product
  let quantity = 0;
  userOrder.orderDetails.products.map((x) => {
    if (x.productId.valueOf() === productId) {
      quantity = x.quantity;
      x.cancel = true;
    }
  });
  const filteredProducts = userOrder.orderDetails.products.filter(
    (x) => x.productId.valueOf() !== productId
  );

  if (filteredProducts.length === userOrder.orderDetails.products.length) {
    return res
      .status(404)
      .send({ status: false, message: "given product not found in your order" });
  }

  product.stock += quantity;
  await product.save();
  const updatedData = {};

  // if no products left after filteration
  if (filteredProducts.length === 0) {
    (updatedData.products = filteredProducts),
      (updatedData.totalItems = userOrder.orderDetails.totalItems - quantity),
      (updatedData.totalPrice =
        userOrder.orderDetails.totalPrice - product.price * quantity);
    let order = await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { orderDetails: updatedData, status: "cancled" } },
      { new: true }
    );
    return res.status(200).send({ status: true, message: "order cancled", order });
  } else {
    (updatedData.products = filteredProducts),
      (updatedData.totalItems = userOrder.orderDetails.totalItems - quantity),
      (updatedData.totalPrice =
        userOrder.orderDetails.totalPrice - product.price * quantity);

    userOrder.orderDetails.products.forEach(async (product) => {
      await productModel.findByIdAndUpdate(
        product._id,
        { $inc: { stock: +product.quantity } },
        { new: true }
      );
    });
    const order = await orderModel
      .findByIdAndUpdate(
        orderId,
        { $set: { orderDetails: updatedData } },
        { new: true }
      )
      .populate("orderDetails.products.productId");
    return res
      .status(200)
      .send({ status: true, message: "product cancled", order });
  }
});

exports.getOrderOfCurrentUser = catchAsyncError(async (req, res, next) => {
  let userId = req.user.id;
  let order = await orderModel
    .find({ userId })
    .populate("orderDetails.products.productId");
  if (!order) {
    return next(new ErrorHandler("Not completed any order", 404));
  }
  return res.status(200).send({ status: true, message: "User order", order });
});
