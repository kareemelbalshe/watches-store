import { Schema, model } from "mongoose";
import Joi from "joi";

const Product = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: {
      type: [Object],
      default: [{ url: "", publicId: null }],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "at least one image is required",
      },
    },
    views: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    discount: { type: Number, default: 0 },
    priceAfterDiscount: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    salesLast24h: { type: Number, default: 0 },
    salesHistory: [
      {
        date: { type: Date, required: true },
        count: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const validateCreateProduct = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().required().label("Title is required"),
    description: Joi.string()
      .trim()
      .required()
      .label("Description is required"),
    price: Joi.number().required().label("Price is required"),
    stock: Joi.number().required().label("Stock is required"),
    category: Joi.string().trim().required().label("Category is required"),
    discount: Joi.number().min(0).max(100).default(0),
  });

  return schema.validate(obj);
};
export const validateUpdateProduct = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().label("Title is required"),
    description: Joi.string().trim().label("Description is required"),
    price: Joi.number().label("Price is required"),
    stock: Joi.number().label("Stock is required"),
    category: Joi.string().trim().label("Category is required"),
    discount: Joi.number().min(0).max(100).default(0),
  });
  return schema.validate(obj);
};

export default model("Product", Product);
