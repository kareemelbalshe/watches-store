import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../../lib/axios/axios";
import { Review } from "../../../../lib/types/types";

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

export const handleGetAllReviews = createAsyncThunk(
  "review/getAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/reviews");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Get all reviews failed"
      );
    }
  }
);

export const handleCreateReview = createAsyncThunk(
  "review/createReview",
  async ({ image }: { image: File }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axiosInstance.post("/reviews", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Create review failed"
      );
    }
  }
);

export const handleDeleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/reviews/${reviewId}`);
      return reviewId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Delete review failed"
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetAllReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(handleGetAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleCreateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCreateReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.loading = false;
      })
      .addCase(handleCreateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleDeleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(handleDeleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reviewSlice.reducer;
