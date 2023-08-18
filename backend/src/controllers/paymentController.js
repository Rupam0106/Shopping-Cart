const catchAsyncError = require("../middlewares/catchAsyncError");
const stripe = require("stripe")(process.env.SCRET_STRIPE_KEY);
const orderModel = require("../models/orderModel");

exports.createPayment = catchAsyncError(async (req, res, next) => {
  let session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.cart.cartItems.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.productId.title,
          images: [item.productId.productImage],
        },
        unit_amount: item.productId.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.HOST_NAME}/success`,
    cancel_url: `${process.env.HOST_NAME}/failed`,
  });
  if (req.body.form.email) {
    let order = await orderModel.findOne({
      email: req.body.form.email,
      paymentStatus: "payment_pending",
    });
    if (order) {
      order.paymentId = session.id;
      await order.save();
    }
  } else {
    let order = await orderModel.findOne({
      userId: req.body.cart.userId,
      paymentStatus: "payment_pending",
    });
    console.log(order);
    if (order) {
      order.paymentId = session.id;
      await order.save();
    }
  }
  res.status(200).json(session);
});

exports.paymentStatus = catchAsyncError(async (req, res, next) => {
  const c_id = req.body.id;
  console.log(req.body);

  let session = await stripe.checkout.sessions.retrieve(c_id);
  console.log("session", session.payment_status);
  let paymentIntent = "";
  if (session.payment_intent) {
    paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );
    console.log("paymentIntent.status", paymentIntent.status);
    paymentIntent = paymentIntent.status;
  } else {
    paymentIntent = "payment_failed";
  }
  let order = await orderModel.findOne({ paymentId: c_id });
  if (order) {
    order.status = paymentIntent;
    order.paymentStatus = paymentIntent;
    await order.save();
  }

  res.status(200).json(paymentIntent);
});

exports.trackOrder = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await orderModel
    .findById(orderId)
    .populate("orderDetails.products.productId");
  res.status(200).json({ order: order });
});
