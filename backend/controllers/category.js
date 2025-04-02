import Category, { validateCreateCategory } from "../models/Category.js";
import asyncHandler from "express-async-handler";
import {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
// import path from "path";
// import { fileURLToPath } from "url";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// // const __dirname = path.resolve();
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const createCategory = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }

  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  try {
    const result = await cloudinaryUploadImage(imagePath);

    if (!result?.secure_url || !result?.public_id) {
      return res.status(500).json({ message: "Failed to upload image" });
    }

    const category = await Category.create({
      title: req.body.title,
      image: { url: result.secure_url, publicId: result.public_id },
    });

    res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create category" });
  } finally {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: {
          title: req.body.title,
        },
      },
      { new: true }
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
});

export const updateCategoryImage = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await cloudinaryRemoveImage(category.image.publicId);

    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: {
          image: {
            url: result.secure_url,
            publicId: result.public_id,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update category image" });
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    await cloudinaryRemoveImage(category.image.publicId);
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed delete category" });
  }
});
