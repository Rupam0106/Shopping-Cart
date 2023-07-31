const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const productModel = require("../models/productModel");
const aws = require("../Aws/aws.js");

//createProduct
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let user = req.user.id;
  let productImage = await aws.uploadFile(req.files[0]);

  const { title, description, price ,stock} = req.body;
  const product = await productModel.create({
    user,
    title,
    description,
    price,
    productImage,
    stock
  });

  res.status(201).json({
    success: true,
    product,
  });
});

//get all Products
exports.getAllProduct = catchAsyncError(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// get product Details
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorHandler(`No product exist with this id : ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorHandler(`No product exist with this id : ${req.params.id}`)
    );
  }
  const updateProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    updateProduct,
  });
});

//delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorHandler(`No product exist with this id : ${req.params.id}`)
    );
  }

  await product.remove({});
  res.status(200).json({
    success: true,
    message: "Product is Successfully Deleted",
  });
});
