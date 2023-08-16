const catchAsyncError = require("../middlewares/catchAsyncError");
const stripe = require("stripe")(process.env.SCRET_STRIPE_KEY);

exports.createPayment = catchAsyncError(async (req, res, next) => {
  let session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.items.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.food.name,
          images: [],
        },
        unit_amount: item.food.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: "http://localhost:4200/user/order/payment/success",
    cancel_url: "http://localhost:4200/user/order/payment/failed",
  });
  let order = await orderModel.findOne({
    items: req.body.items,
  });
  if (order) {
    order.checkout_id = session.id;
    await order.save();
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
  let order = await orderModel.findOne({ checkout_id: c_id });
  if (order) {
    order.status = paymentIntent;
    await order.save();
  }

  res.status(200).json(paymentIntent);
});
