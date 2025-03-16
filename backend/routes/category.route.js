import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  updateCategoryImage,
} from "../controllers/category.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { photoUpload } from "../middlewares/photoUpload.js";

const router = Router();

router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.post("/", verifyToken, photoUpload.single("image"), createCategory);
router.put("/:categoryId", verifyToken, updateCategory);
router.put(
  "/:categoryId/image",
  verifyToken,
  photoUpload.single("image"),
  updateCategoryImage
);
router.delete("/:categoryId", verifyToken, deleteCategory);

export default router;
