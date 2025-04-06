import { Schema, model } from "mongoose";
import Joi from "joi";

const Category = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
  },
  { timestamps: true }
);

export const validateCreateCategory = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(30).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must be at most 30 characters",
    }),
  });

  return schema.validate(obj, { abortEarly: false });
};

export default model("Category", Category);
