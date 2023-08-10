const catchAsyncError = require("../middlewares/catchAsyncError");
const stripe = require("stripe")(process.env.SCRET_STRIPE_KEY);
exports.createPayment = catchAsyncError(async (req, res, next) => {
  token = req.body.token;
  console.log(req.body);
  stripe.customers
    .create({
      email: "rupam.gupta@rudrainnovative.in",
      source: token.id,
    })
    .then((customer) => {
      console.log(customer);
      return stripe.charges.create({
        amount: 1000,
        description: "Welcome to R-shop",
        currency: "USD",
        customer: customer.id,
      });
    })
    .then((charge) => {
      console.log(charge);
      res.json({
        data: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        data: "failure",
      });
    });
  return true;
});
