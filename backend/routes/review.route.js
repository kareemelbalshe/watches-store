import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
} from "../controllers/review.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { photoUpload } from "../middlewares/photoUpload.js";

const router = Router();

router.get("/", getAllReviews);
router.post("/", verifyToken, photoUpload.single("image"), createReview);
router.delete("/:reviewId", deleteReview);

export default router;
