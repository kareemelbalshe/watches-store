import { createSlice } from "@reduxjs/toolkit";
import { ProductCart } from "../../types/types";

export const localCart = createSlice({
  name: "localCart",
  initialState: {
    products: JSON.parse(localStorage.getItem("products") || "[]"),
  },
  reducers: {
    addToCart: (state, action) => {
      const findProduct = state.products.find(
        (product: ProductCart) => product.product._id === action.payload._id
      );
      console.log(action.payload);
      if (findProduct) {
        findProduct.quantity.quantity++;
      } else {
        state.products.push({
          product: { ...action.payload },
          quantity: { quantity: 1 },
        });
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    updateQuantity: (state, action) => {
      const findProduct = state.products.find(
        (product: ProductCart) => product.product._id === action.payload.id
      );
      if (findProduct) {
        findProduct.quantity.quantity = action.payload.quantity;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    deleteFromCart: (state, action) => {
      state.products = state.products.filter(
        (product: ProductCart) =>
          product.product._id !== action.payload.product._id
      );
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    clear: (state) => {
      state.products = [];
      localStorage.removeItem("products");
    },
  },
});

export const cartReducer = localCart.reducer;
export const cartAction = localCart.actions;
