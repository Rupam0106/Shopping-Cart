const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const wishSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    productId: [
      {
        type: ObjectId,
        ref: "Product",
        required: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const Wish = mongoose.model("Wish", wishSchema);
module.exports = Wish;
