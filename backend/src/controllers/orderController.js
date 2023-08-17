const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");

// create order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  let userId = req.user.id;
  if (userId) {
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
    cart.cartItems.forEach(async (item) => {
      await productModel.findByIdAndUpdate(
        item.productId._id,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    });

    return res.status(200).send({ status: true, msg: "Order Done", userOrder });
  } else {
    let cart = await cartModel
      .findOne({ userId: userId })
      .populate("cartItems.productId", "stock");
    if (!cart) {
      return res
        .status(404)
        .send({ status: false, msg: "User cart not found" });
    }
    if (cart.cartItems.length <= 0) {
      if (cartItems.length <= 0) {
        return res.status(400).send({
          status: false,
          msg: "Please add some items in cart to place order",
        });
      }
      const filterProduct = cartItems.filter(
        (x) => x.quantity > x.productId.stock
      );
      if (filterProduct.length > 0) {
        return res.status(400).send({
          status: false,
          msg: "Products are Out of Stock",
          filterProduct,
        });
      }
      let order = {
        userId,
        orderDetails: {
          totalItems: cart.totalItems,
          totalPrice: cart.totalPrice,
          products: cart.cartItems,
          totalItems: totalItems,
          totalPrice: totalPrice,
          products: cartItems,
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
      return res
        .status(200)
        .send({ status: true, msg: "Order Done", userOrder });
    }
  }
});

exports.getOrder = catchAsyncError(async (req, res, next) => {
  let userId = req.user.id;
  let order = await orderModel
    .find({ userId, status: { $in: ["pending", "delivered","payed","canceled"] } })
    .populate("orderDetails.products.productId");
  if (!order) {
    return next(new ErrorHandler("Not completed any order", 404));
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
      .send({ status: false, msg: "Please provide orderId" });
  }

  let userOrder = await orderModel.findById(orderId);

  if (userOrder.status !== "pending") {
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
  await orderModel.findByIdAndUpdate(
    orderId,
    { $set: { status: "cancled" } },
    { new: true }
  );
  return res.status(204).send({ status: true, msg: "order cancled" });
});

//updatedOrder the order
exports.updatedOrder = catchAsyncError(async (req, res, next) => {
  let { productId } = req.body;
  let orderId = req.params.orderId;

  let userOrder = await orderModel.findById(orderId);
  if (!userOrder) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  if (userOrder.status !== "pending") {
    return next(new ErrorHandler("Order cannot be updated", 400));
  }

  let product = await productModel.findById(productId);
  if (!product) {
    return next(new ErrorHandler("productId invalid", 404));
  }

  if (userOrder.orderDetails.products.length === 0) {
    return res
      .status(400)
      .send({ status: false, msg: "your order is already empty" });
  }

  // get quantity of removed product
  let quantity = 0;
  userOrder.orderDetails.products.map((x) => {
    if (x.productId.valueOf() === productId) {
      quantity = x.quantity;
    }
  });
  const filteredProducts = userOrder.orderDetails.products.filter(
    (x) => x.productId.valueOf() !== productId
  );

  if (filteredProducts.length === userOrder.orderDetails.products.length) {
    return next(new ErrorHandler("given product not found in your order", 404));
  }

  product.stock += quantity;
  await product.save();
  const updatedData = {};

  // if no products left after Filter
  if (filteredProducts.length === 0) {
    (updatedData.products = filteredProducts),
      (updatedData.totalItems = userOrder.orderDetails.totalItems - 1),
      (updatedData.totalPrice =
        userOrder.orderDetails.totalPrice - product.price * quantity);
    await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { orderDetails: updatedData, status: "cancled" } },
      { new: true }
    );
    return res.status(204).send({ status: true, msg: "order cancled" });
  } else {
    (updatedData.products = filteredProducts),
      (updatedData.totalItems = userOrder.orderDetails.totalItems - 1),
      (updatedData.totalPrice =
        userOrder.orderDetails.totalPrice - product.price * quantity);
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { orderDetails: updatedData } },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, msg: "product cancled", updatedOrder });
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
  return res.status(200).send({ status: true, msg: "User order", order });
});
