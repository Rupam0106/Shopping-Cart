const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { emptyCart } = require("../utils/helper");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

// create order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const { cartId } = req.body;
  if (!cartId) {
    return next(new ErrorHandler(`Please send your cart id!`, 400));
  }

  // getting cart details using cartId
  const cart = await Cart.findById(cartId);
  if (!cart.items.length) {
    return next(new ErrorHandler("Your Cart is Empty", 404));
  }

  for (let i = 0; i < cart.items.length; i++) {
    const product = await Product.findById(cart.items[i].productId);
    if (product._id.toString() == cart.items[i].productId.toString()) {
      product.stock -= cart.items[i].quantity;
    }
    await product.save();
  }

  if (!cart || !cart.totalItems) {
    return next(
      new ErrorHandler(
        `${!cart ? "cart not found!" : " Your cart is empty!"}`,
        400
      )
    );
  }

  // creting an object to create a new order
  const Obj = JSON.parse(JSON.stringify(cart));

  // remocing extra field of the object
  [("_id", "createdAt", "updatedAt", "__v")].map((el) => delete Obj[el]);

  // create a order after removing unwanted field
  const order = await Order.create(Obj);

  //after successfully order creation making card empty
  await emptyCart(cart);
  await Cart.findByIdAndDelete(cartId);

  res.status(201).json({
    status: true,
    message: "Your Order Placed Successfully",
    data: {
      order,
    },
  });
});

//cancel the order
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.body.orderId);
  // if not order with this id
  if (!order) {
    return next(
      new ErrorHandler(`No order found with id: ${req.body.orderId}.`, 404)
    );
  }

  if (!order.cancellable) {
    return next(new ErrorHandler(`This order will not be cancel!`, 400));
  }

  // if order status is canceled
  if (order.status === "canceled") {
    return next(new ErrorHandler(`This order already canceled!`, 400));
  }
  for (let i = 0; i < order.items.length; i++) {
    const product = await Product.findById(order.items[i].productId);
    if (product._id.toString() == order.items[i].productId.toString()) {
      product.stock += order.items[i].quantity;
    }
    await product.save();
  }
  // finally cancel the order
  order.status = "canceled";
  await order.save();
  res.status(200).json({
    status: true,
    message: "Success",
    data: {
      order,
    },
  });
});

//cancel the order
exports.completedOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.body.orderId);

  // if not order wwith this id
  if (!order) {
    return next(
      new ErrorHandler(`No order found with id: ${req.body.orderId}.`, 404)
    );
  }

  if (!order.cancellable) {
    return next(new ErrorHandler(`This order will not be cancel!`, 400));
  }

  // if order status is canceled
  if (order.status === "canceled") {
    return next(new ErrorHandler(`This order already canceled!`, 400));
  }

  // finally complete the order
  order.status = "completed";
  await order.save();
  res.status(200).json({
    status: true,
    message: "Order Successfully Delivered...",
    data: {
      order,
    },
  });
});
