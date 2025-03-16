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

const handleError = (error: any, rejectWithValue: any) => {
  return rejectWithValue(
    error.response?.data?.message || "Something went wrong"
  );
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
      category?: string ;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/products?page=${page}&limit=${limit}&category=${category}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
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
    } catch (error) {
      return rejectWithValue(error);
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
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleGetProductById = createAsyncThunk(
  "product/getProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleCreateProduct = createAsyncThunk(
  "product/createProduct",
  async (product: Omit<Product, "_id">, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/products", product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleUpdateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { productId, product }: { productId: string; product: Product },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/products/${productId}`,
        product
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleDeleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleAddProductImage = createAsyncThunk(
  "product/addProductImage",
  async (
    { productId, image }: { productId: string; image: File },
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
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleDeleteProductImage = createAsyncThunk(
  "product/deleteProductImage",
  async (
    { productId, imageId }: { productId: string; imageId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.delete(
        `/products/${productId}/image/${imageId}`
      );
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllProducts.fulfilled, (state, action) => {
        state.productsTable = action.payload;
        state.loading = false;
      })
      .addCase(handleGetLessStockProducts.fulfilled, (state, action) => {
        state.productsLess = action.payload;
        state.loading = false;
      })
      .addCase(handleGetMostSalesProducts.fulfilled, (state, action) => {
        state.productsSales = action.payload;
        state.loading = false;
      })
      .addCase(handleGetProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(handleCreateProduct.fulfilled, (state, action) => {
        if (!state.productsTable.products) {
          state.productsTable.products = [];
        }
        state.productsTable.products.push(action.payload);
      })
      .addCase(handleUpdateProduct.fulfilled, (state, action) => {
        if (state.productsTable.products) {
          state.productsTable.products = state.productsTable.products.map(
            (product: Product) =>
              product._id === action.payload._id ? action.payload : product
          );
        }
      })
      .addCase(handleDeleteProduct.fulfilled, (state, action) => {
        if (state.productsTable.products) {
          state.productsTable.products = state.productsTable.products.filter(
            (product: Product) => product._id !== action.payload
          );
        }
      })
      .addCase(handleAddProductImage.fulfilled, (state, action) => {
        const index = state.productsTable.products.findIndex(
          (product: Product) => product._id === action.payload._id
        );
        if (index !== -1) state.productsTable.products[index] = action.payload;
      })
      .addCase(handleDeleteProductImage.fulfilled, (state, action) => {
        const index = state.productsTable.products.findIndex(
          (product: Product) => product._id === action.payload._id
        );
        if (index !== -1) state.productsTable.products[index] = action.payload;
      });
  },
});

export default productSlice.reducer;
