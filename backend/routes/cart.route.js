import { Router } from "express";
import {
  createCart,
  deleteCart,
  getAllCarts,
  getCartById,
} from "../controllers/cart.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", verifyToken, getAllCarts);
router.get("/:cartId", verifyToken, getCartById);
router.post("/", createCart);
router.delete("/:cartId", deleteCart);

export default router;
