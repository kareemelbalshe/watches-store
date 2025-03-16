import { Schema, model } from "mongoose";

const Cart = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i.test(value);
        },
        message: "Invalid email address",
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^(010|011|012|015)\d{8}$/.test(value);
        },
        message:
          "Invalid Egyptian phone number. It should start with 010, 011, 012, or 015 and be 11 digits long.",
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default model("Cart", Cart);
