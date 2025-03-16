import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../../lib/axios/axios";
import { Category } from "../../../../lib/types/types";

interface CategoryState {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

export const handleGetAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/categories");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Get all categories failed"
      );
    }
  }
);

export const handleGetCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/categories/${categoryId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Get category by ID failed"
      );
    }
  }
);

export const handleCreateCategory = createAsyncThunk(
  "category/createCategory",
  async (
    { title, image }: { title: string; image: File },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);

      const response = await axiosInstance.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Create category failed"
      );
    }
  }
);

export const handleUpdateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category: Category, { rejectWithValue }) => {
    try {
      const { _id, ...data } = category;
      const response = await axiosInstance.put(`/categories/${_id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Update category failed"
      );
    }
  }
);

export const handleUpdateCategoryImage = createAsyncThunk(
  "category/updateCategoryImage",
  async (
    { categoryId, image }: { categoryId: string; image: File },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axiosInstance.put(
        `/categories/${categoryId}/image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Update category image failed"
      );
    }
  }
);

export const handleDeleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/categories/${categoryId}`);
      return categoryId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Delete category failed"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(handleGetCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(handleCreateCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(handleUpdateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(handleUpdateCategoryImage.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        const index = state.categories.findIndex(
          (cat) => cat._id === updatedCategory._id
        );
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(handleDeleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;
