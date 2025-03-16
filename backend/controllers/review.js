import Review from "../models/Review.js";
import asyncHandler from "express-async-handler";
import {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const __dirname = path.resolve();
import fs from "fs";


export const getAllReviews = asyncHandler(async (req, res) => {
  try {

    const reviews = await Review.find().sort({ createdAt: -1 })

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const createReview = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "no image provided" });
    }

    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);
    const review = await Review.create({
      image: { url: result.secure_url, publicId: result.public_id },
    });
    res.status(201).json(review);
    fs.unlinkSync(imagePath);
  } catch (error) {
    res.status(500).json({ message: "Failed create review" });
  }
});


export const deleteReview = asyncHandler(async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await cloudinaryRemoveImage(review.image.publicId);
    await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
});
