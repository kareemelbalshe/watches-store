import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/types";

export const wishListSlice = createSlice({
  name: "wishListSlice",
  initialState: {
    wishList: JSON.parse(localStorage.getItem("wishList") || "[]"),
  },
  reducers: {
    addToWishList: (state, action) => {
      const findProduct = state.wishList.find(
        (product: Product) => product._id === action.payload._id
      );

      if (findProduct) {
        state.wishList = state.wishList.filter(
          (product: Product) => product._id !== action.payload._id
        );
        localStorage.setItem("wishList", JSON.stringify(state.wishList));
      } else {
        state.wishList.push(action.payload);
        localStorage.setItem("wishList", JSON.stringify(state.wishList));
      }
    },
    clear: (state) => {
      state.wishList = [];
      localStorage.removeItem("wishList");
    },
  },
});

export const wishListReducer = wishListSlice.reducer;
export const wishListAction = wishListSlice.actions;
