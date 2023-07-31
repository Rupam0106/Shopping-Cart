const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter userId"],
    },
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: [true, "Please provide product id!"],
        },
        quantity: {
          type: Number,
          required: [true, "Please provide Qty!"],
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Total price required!"],
    },
    totalItems: {
      type: Number,
      required: [true, "Total Item required!"],
    },

    totalQuantity: {
      type: Number,
      required: [true, "Total qty required!"],
    },

    cancellable: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "completed", "canceled"],
        message: 'status should be in "pending", "completed", "canceled"',
      },
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
