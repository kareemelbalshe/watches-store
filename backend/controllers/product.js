import Product, { validateUpdateProduct } from "../models/Product.js";
import asyncHandler from "express-async-handler";
import {
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const __dirname = path.resolve();
import fs from "fs";

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const { category, page = 1, limit } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = limit ? Math.max(1, parseInt(limit, 10)) : undefined;
    const skip = limitNum ? (pageNum - 1) * limitNum : 0;

    const filter = category ? { category } : {};

    const totalProducts = await Product.countDocuments(filter);

    const query = Product.find(filter).sort({ createdAt: -1 }).skip(skip);

    if (limitNum) {
      query.limit(limitNum);
    }

    const products = await query;

    res.status(200).json({
      products,
      totalProducts,
      totalPages: limitNum ? Math.ceil(totalProducts / limitNum) : 1,
      currentPage: pageNum,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getMostSalesProducts = asyncHandler(async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = req.query.limit
      ? Math.max(1, parseInt(req.query.limit, 10))
      : undefined;
    const skip = limit ? (page - 1) * limit : 0;

    const totalProducts = await Product.countDocuments({
      sales: { $gt: 0 },
      stock: { $gt: 0 },
    });
    const query = Product.find({ sales: { $gt: 0 }, stock: { $gt: 0 } })
      .sort({ sales: -1 })
      .skip(skip);

    if (limit) {
      query.limit(limit);
    }

    const products = await query;

    res.status(200).json({
      products,
      totalProducts,
      totalPages: limit ? Math.ceil(totalProducts / limit) : 1,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getLessStockProducts = asyncHandler(async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = req.query.limit
      ? Math.max(1, parseInt(req.query.limit, 10))
      : undefined;
    const skip = limit ? (page - 1) * limit : 0;

    const totalProducts = await Product.countDocuments({ stock: { $gte: 0 } });
    const query = Product.find({ stock: { $gt: 0 } })
      .sort({ stock: 1 })
      .skip(skip);

    if (limit) {
      query.limit(limit);
    }

    const products = await query;

    res.status(200).json({
      products,
      totalProducts,
      totalPages: limit ? Math.ceil(totalProducts / limit) : 1,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  if (!result || !result.secure_url || !result.public_id) {
    return res.status(500).json({ message: "Failed to upload image" });
  }
  try {
    const priceAfterDiscount =
      req.body.price - (req.body.price * req.body.discount) / 100;

    const product = await Product.create({
      image: { url: result.secure_url, publicId: result.public_id },
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      discount: req.body.discount,
      priceAfterDiscount,
    });

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});

export const updateProduct = async (req, res) => {
  try {
    const { error } = validateUpdateProduct(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedData = {
      title: req.body.title ?? product.title,
      description: req.body.description ?? product.description,
      price: req.body.price ?? product.price,
      stock: req.body.stock ?? product.stock,
      category: req.body.category ?? product.category,
      discount: req.body.discount ?? product.discount,
    };

    updatedData.priceAfterDiscount = parseFloat(
      (
        updatedData.price -
        (updatedData.price * updatedData.discount) / 100
      ).toFixed(2)
    );

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const addProductImage = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);

    if (!result || !result.secure_url) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $push: {
          image: {
            url: result.secure_url,
            publicId: result.public_id,
          },
        },
      },
      { new: true }
    );

    fs.unlinkSync(imagePath);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product image" });
  }
});

export const deleteProductImage = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await cloudinaryRemoveImage(req.params.imageId);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $pull: {
          image: { publicId: req.params.imageId },
        },
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product image" });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await cloudinaryRemoveMultipleImage(
      product.image?.map((img) => img.publicId) || []
    );
    await Product.findByIdAndDelete(req.params.productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});
