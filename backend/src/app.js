const ErrorHandler = require("./middlewares/error");
const express = require("express");
const cors = require("cors");

const User = require("./routes/userRoute");
const Product = require("./routes/productRoute");
const Cart = require("./routes/cartRoute");
const WishList = require("./routes/wishRoute");
const Order = require("./routes/orderRoute");
const Payment = require("./routes/paymentRoute");

const cookie = require("cookie-parser");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const swaggerDocs = require('./swagger/swagger')

app.use(cookie());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
const upload = multer();
app.use(upload.any());
app.use(cors("*"));

swaggerDocs(app, process.env.PORT)

app.use("/api/v1/user", User);
app.use("/api/v1", Product);
app.use("/api/v1/cart", Cart);
app.use("/api/v1/wish", WishList);
app.use("/api/v1/order", Order);
app.use("/api/v1/payment", Payment);

//error handle middleware
app.use(ErrorHandler);

module.exports = app;
