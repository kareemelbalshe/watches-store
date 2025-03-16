import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../lib/axios/axios";
import Cookies from "js-cookie";

export const handleLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      Cookies.set("userInfo", JSON.stringify(response.data), { expires: 7 }); // تنتهي بعد 7 أيام

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const initialState = {
  isAuthenticated: !!Cookies.get("userInfo"),
  user: Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo") as string) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
