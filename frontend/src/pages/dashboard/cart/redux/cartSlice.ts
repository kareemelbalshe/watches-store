import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../../lib/axios/axios";
import { Cart } from "../../../../lib/types/types";

interface CartState {
  cart: Cart;
  loading: boolean;
  error: string | null;
  cartTable: { carts?: Cart[]; totalCarts?: number; totalPages?: number; currentPage?: number };
}

const initialState: CartState = {
  cart: {} as Cart,
  loading: false,
  error: null,
  cartTable: {},
};

export const handleGetAllCarts = createAsyncThunk(
  "cart/getAllCarts",
  async ({ page = 1, limit = 10 }: { page: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/carts?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Get all carts failed");
    }
  }
);

export const handleGetCartById = createAsyncThunk(
  "cart/getCartById",
  async (cartId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/carts/${cartId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Get cart by ID failed");
    }
  }
);

export const handleAddToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData: Cart, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/carts", cartData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Add to cart failed");
    }
  }
);

export const handleRemoveCart = createAsyncThunk(
  "cart/removeCart",
  async (cartId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/carts/${cartId}`);
      return cartId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Remove from cart failed");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetAllCarts.fulfilled, (state, action) => {
        state.cartTable = action.payload;
        state.loading = false;
      })
      .addCase(handleGetAllCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleGetCartById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetCartById.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(handleGetCartById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleAddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleAddToCart.fulfilled, (state, action) => {
        if (!state.cartTable.carts) {
          state.cartTable.carts = [];
        }
        state.cartTable.carts.push(action.payload);
        state.loading = false;
      })
      .addCase(handleAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleRemoveCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRemoveCart.fulfilled, (state, action) => {
        if (state.cartTable.carts) {
          state.cartTable.carts = state.cartTable.carts.filter(
            (cart) => cart._id !== action.payload
          );
        }
        state.loading = false;
      })
      .addCase(handleRemoveCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
