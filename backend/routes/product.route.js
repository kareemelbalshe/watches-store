import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getLessStockProducts,
  getMostSalesProducts,
  getProductById,
  updateProduct,
  addProductImage,
} from "../controllers/product.js";
import { recordView } from "../middlewares/calcViews.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { photoUpload } from "../middlewares/photoUpload.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", verifyToken, photoUpload.single("image"), createProduct);
router.get("/less-stock", getLessStockProducts);
router.get("/most-sales", getMostSalesProducts);
router.get("/:productId", recordView, getProductById);
router.put("/:productId", verifyToken, updateProduct);
router.delete("/:productId", verifyToken, deleteProduct);
router.post(
  "/:productId/image",
  verifyToken,
  photoUpload.single("image"),
  addProductImage
);
router.delete("/:productId/image/:imageId", verifyToken, deleteProductImage);

export default router;
