import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../../lib/axios/axios";
import { Product } from "../../../../lib/types/types";

interface ProductState {
  productsTable: any;
  productsLess: any;
  productsSales: any;
  product: Product;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  productsTable: {},
  productsLess: {},
  productsSales: {},
  product: {} as Product,
  loading: false,
  error: null,
};

export const handleGetAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (
    {
      page = 1,
      limit,
      category = "",
    }: {
      page: number;
      limit?: number;
      category?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/products?page=${page}&limit=${limit}&category=${category}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Get all products failed"
      );
    }
  }
);

export const handleGetLessStockProducts = createAsyncThunk(
  "product/getLessStockProducts",
  async (
    {
      page = 1,
      limit = 10,
      category = "",
    }: { page: number; limit?: number; category?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/products/less-stock?page=${page}&limit=${limit}&category=${category}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Get less stock products failed"
      );
    }
  }
);

export const handleGetMostSalesProducts = createAsyncThunk(
  "product/getMostSalesProducts",
  async (
    {
      page = 1,
      limit = 10,
      category = "",
    }: { page: number; limit?: number; category?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/products/most-sales?page=${page}&limit=${limit}&category=${category}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Get most sales products failed"
      );
    }
  }
);

export const handleGetProductById = createAsyncThunk(
  "product/getProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Get product by ID failed"
      );
    }
  }
);

export const handleCreateProduct = createAsyncThunk(
  "product/createProduct",
  async (
    { title, image, price, discount, category, description, stock }: any,
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("discount", discount);
      formData.append("category", category);
      formData.append("description", description);

      const response = await axiosInstance.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Create product failed"
      );
    }
  }
);

export const handleUpdateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { productId, product }: { productId: string; product: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/products/${productId}`,
        product
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Update product failed"
      );
    }
  }
);

export const handleDeleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      return productId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Delete product failed"
      );
    }
  }
);

export const handleAddProductImage = createAsyncThunk(
  "product/addProductImage",
  async (
    { productId, image }: { productId: string; image: any },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axiosInstance.post(
        `/products/${productId}/image`,
        formData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Add product image failed"
      );
    }
  }
);

export const handleDeleteProductImage = createAsyncThunk(
  "product/deleteProductImage",
  async (
    { productId, imageId }: { productId: string; imageId: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.delete(
        `/products/${productId}/image/${imageId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Delete product image failed"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetAllProducts.fulfilled, (state, action) => {
        state.productsTable = action.payload;
        state.loading = false;
      })
      .addCase(handleGetAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleGetLessStockProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetLessStockProducts.fulfilled, (state, action) => {
        state.productsLess = action.payload;
        state.loading = false;
      })
      .addCase(handleGetLessStockProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleGetMostSalesProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetMostSalesProducts.fulfilled, (state, action) => {
        state.productsSales = action.payload;
        state.loading = false;
      })
      .addCase(handleGetMostSalesProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleGetProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(handleGetProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleCreateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCreateProduct.fulfilled, (state, action) => {
        if (!state.productsTable.products) {
          state.productsTable.products = [];
        }
        state.productsTable.products.push(action.payload);
        state.loading = false;
      })
      .addCase(handleCreateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleUpdateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUpdateProduct.fulfilled, (state, action) => {
        if (state.productsTable.products) {
          state.productsTable.products = state.productsTable.products.map(
            (product: Product) =>
              product._id === action.payload._id ? action.payload : product
          );
        }
        state.loading = false;
      })
      .addCase(handleUpdateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleDeleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteProduct.fulfilled, (state, action) => {
        if (state.productsTable.products) {
          state.productsTable.products = state.productsTable.products.filter(
            (product: Product) => product._id !== action.payload
          );
        }
        state.loading = false;
      })
      .addCase(handleDeleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleAddProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleAddProductImage.fulfilled, (state, action) => {
        const index = state.productsTable.products.findIndex(
          (product: Product) => product._id === action.payload._id
        );
        if (index !== -1) state.productsTable.products[index] = action.payload;
        state.loading = false;
      })
      .addCase(handleAddProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleDeleteProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteProductImage.fulfilled, (state, action) => {
        const index = state.productsTable.products.findIndex(
          (product: Product) => product._id === action.payload._id
        );
        if (index !== -1) state.productsTable.products[index] = action.payload;
        state.loading = false;
      })
      .addCase(handleDeleteProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
