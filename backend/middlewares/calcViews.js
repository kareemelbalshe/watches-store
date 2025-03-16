import mongoose from "mongoose";
import Product from "../models/Product.js";

export const recordView = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    await Product.updateOne(
      { _id: productId },
      { $inc: { views: 1 } }
    );

    next(); 
  } catch (error) {
    console.error("Error updating product views:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
