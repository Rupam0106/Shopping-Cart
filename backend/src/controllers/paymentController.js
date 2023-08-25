const catchAsyncError = require("../middlewares/catchAsyncError");
const stripe = require("stripe")(process.env.SCRET_STRIPE_KEY);
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");

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

//send mail order Details
exports.sendOrderDetailsByMail = catchAsyncError(async (req, res, next) => {
  const orderId = req.body.orderId;
  const userId = req.user.id;
  const user = await userModel.findById(userId);
  const order = await orderModel
    .findById(orderId)
    .populate("orderDetails.products.productId");
  const date = new Date(order.createdAt);
  const hours = date.getHours();
  const amOrPm = hours >= 12 ? "AM" : "PM";
  const message = `
  <div style="background-color: powderblue;padding:20px">
    <h1 style="color:black; text-align:center" >Welcome to R-Shop<h1>
    <h1 style="color:black; text-align:center" >Hi, ${
      order.shippingDetails.name
    } <h1>
    <h3 style="color:black; text-align:center"> Woo hoo! Your order is on its way. Your order details can be found below.</h3>
    <h3> Track Your Order : <a href="https://ru-shop.netlify.app/user/order/payment/track/${orderId}">Click here </a></h3>

    <h3>Order Summary :-</h3>
    <div style="padding:3px"><strong>OrderId: </strong>#${orderId}</div>
    <div style="padding:3px"><strong>Date: </strong> ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${amOrPm}</div> 
    <div style="padding:3px"><strong> Name: </strong>${
      order.shippingDetails.name
    } </div>
    <div style="padding:3px"><strong> Shipping Address:</strong> ${
      order.shippingDetails.address.house
    } ,
    ${order.shippingDetails.address.street} ,
    ${order.shippingDetails.address.city} ,
    ${order.shippingDetails.address.state} ,
    ${order.shippingDetails.address.pincode}</div>
    <div style="padding:3px"><strong> Status: </strong>${
      order.status
    }<span style=" color:green;"> ✔</span>
    </div>
    <div style="padding:3px"><strong>TotalItem:  </strong>${
      order.orderDetails.totalItems
    }</div>
    <div style="padding:3px"><strong>TotalPrice:  </strong>${
      order.orderDetails.totalPrice
    }</div>
    
    <h3 style="color:black; text-align:center">We hope you enjoyed your shopping experience with us and that you will visit us again soon.</h3>
  </div>
  `;
  try {
    await sendEmail({
      email: user.email,
      subject: `Order Receipt.`,
      message: message,
    });

    res.status(200).json({
      success: true,
      msg: `Email sent to ${user.email} successfully`,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
