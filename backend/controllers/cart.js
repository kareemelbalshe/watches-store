import Product from "../models/Product.js";
import cron from "node-cron";
import asyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";

export const getAllCarts = asyncHandler(async (req, res) => {
  try {
    let { page = 1, limit } = req.query;

    const pageNum = isNaN(parseInt(page, 10))
      ? 1
      : Math.max(1, parseInt(page, 10));
    const limitNum = isNaN(parseInt(limit, 10))
      ? 10
      : Math.max(1, parseInt(limit, 10));

    const skip = (pageNum - 1) * limitNum;

    const totalCarts = await Cart.countDocuments();

    const carts = await Cart.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      carts,
      totalCarts,
      totalPages: Math.ceil(totalCarts / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    console.error("Error:", error); 
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});


export const getCartById = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId).populate("products.product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const createCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      products: req.body.products,
      totalPrice: req.body.totalPrice,
    });

    await recordSale(req.body.products);
    res.status(201).json(cart);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: `Validation Error ${validationErrors}` });
    }
    res.status(500).json({ message: "Failed to create cart" });
  }
});


export const deleteCart = asyncHandler(async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed delete cart" });
  }
});


export const recordSale = async (products) => {
  try {
    const bulkOperations = products.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: { sales: item.quantity, stock: -item.quantity },
          $push: {
            salesHistory: { date: new Date(), count: item.quantity },
          },
        },
      },
    }));

    await Product.bulkWrite(bulkOperations);
  } catch (error) {
    console.error("Error recording sales:", error);
  }
};


export const updateSalesLast24h = async () => {
  try {
    const last24h = new Date();
    last24h.setHours(last24h.getHours() - 24);

    const products = await Product.find({}, "salesHistory");

    const bulkOperations = products.map((product) => {
      const salesLast24h = product.salesHistory
        .filter((sale) => sale.date >= last24h)
        .reduce((acc, sale) => acc + sale.count, 0);

      return {
        updateOne: {
          filter: { _id: product._id },
          update: { salesLast24h },
        },
      };
    });

    await Product.bulkWrite(bulkOperations);
    console.log("SalesLast24h updated successfully.");
  } catch (error) {
    console.error("Error updating salesLast24h:", error);
  }
};


cron.schedule("0 * * * *", () => {
  console.log("Updating sales last 24 hours...");
  updateSalesLast24h();
});
