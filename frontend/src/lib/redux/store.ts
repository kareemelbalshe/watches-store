import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../../pages/login/redux/authSlice';
import reviewSlice from '../../pages/dashboard/review/redux/reviewSlice';
import { wishListReducer } from "./slices/love-slice";
import { cartReducer } from "./slices/cart-slice";
import categorySlice from '../../pages/dashboard/category/redux/categorySlice';
import cartSlice from '../../pages/dashboard/cart/redux/cartSlice';
import productSlice from '../../pages/dashboard/product/redux/productSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    review: reviewSlice,
    wishList: wishListReducer,
    localCart: cartReducer,
    cart: cartSlice,
    category: categorySlice,
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
