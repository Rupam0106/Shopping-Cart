const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      unique: true,
      trim: true,
    },
    items: {
      type: [
        {
          productId: {
            type: ObjectId,
            ref: "Product",
            required: [true, "Please provide productId!"],
          },
          quantity: {
            type: Number,
            required: [true, "Please enter a Qty!"],
            min: 1,
          },
          price: {
            type: Number,
            require: [true, "Please provide price of product!"],
            select: false,
          },
        },
      ],
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalQuantity: {
      type: Number,
      default: 1,
    },
    totalItems: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
