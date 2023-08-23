const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const wishModel = require("../models/wishModel");

// create a cart
exports.createWishList = catchAsyncError(async (req, res, next) => {
  let productId = req.body.productId;
  let userId = req.user.id;
  let userWish = await wishModel.findOne({ userId: userId });
  let item = userWish.productId.findIndex(
    (item) => item._id.toString() == productId.toString()
  );
  if (item!==-1) {
    return next(new ErrorHandler("Item already Present in Wishlist", 400));
  }
  if (!userWish) {
    const wishDetails = {
      userId,
      productId,
    };
    let newCart = await wishModel.create(wishDetails);
    return res
      .status(201)
      .send({ status: true, msg: " Added to WishList", cart: newCart });
  } else {
    userWish.productId.push(productId);
    userWish.save();
    return res.status(200).send({
      status: true,
      msg: "Item Added to WishList",
      wishList: userWish,
    });
  }
});

//update cart
exports.updateWishListById = catchAsyncError(async (req, res, next) => {
  let userId = req.user.id;
  let { productId } = req.body;
  let wishCart = await wishModel.findOne({ userId });
  let item = wishCart.productId.findIndex(
    (item) => item._id.toString() == productId.toString()
  );
  if (item === -1) {
    return res
      .status(404)
      .send({ status: false, msg: "This product not found in your Wish list" });
  } else {
    wishCart.productId.splice(item, 1);
    let wishList = await wishModel
      .findByIdAndUpdate(wishCart._id, wishCart, {
        new: true,
      })
      .populate("productId");
    return res
      .status(200)
      .send({ status: true, msg: "wishlist updated", wishList });
  }
});

//get wish details by id
exports.getWishListById = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const wishList = await wishModel
    .findOne({ userId: userId })
    .populate("productId");
  res.status(200).json({
    status: true,
    message: "Success",
    wishList,
  });
});
