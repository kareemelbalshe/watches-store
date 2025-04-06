import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { useTheme } from "../../../hooks/ThemeContext";
import { useEffect, useCallback, useMemo } from "react";
import { handleGetAllCategories } from "../../dashboard/category/redux/categorySlice";
import { handleGetAllReviews } from "../../dashboard/review/redux/reviewSlice";
import {
  handleGetLessStockProducts,
  handleGetMostSalesProducts,
} from "../../dashboard/product/redux/productSlice";
import { toast } from "react-toastify";

export function useHome() {
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useTheme();

  const {
    categories,
    error: categoriesError,
    loading: categoriesLoading,
  } = useSelector((state: RootState) => state.category);
  const {
    reviews,
    error: reviewsError,
    loading: reviewsLoading,
  } = useSelector((state: RootState) => state.review);
  const {
    productsLess,
    productsSales,
    error: productsError,
    loading: productsLoading,
  } = useSelector((state: RootState) => state.product);

  const isLoading = categoriesLoading || reviewsLoading || productsLoading;

  const fetchData = useCallback(
    async (retryCount = 0) => {
      if (retryCount > 5) {
        toast.error("Failed to fetch data after multiple attempts");
        return;
      }

      try {
        const responses = await Promise.allSettled([
          dispatch(handleGetAllCategories()),
          dispatch(handleGetAllReviews()),
          dispatch(handleGetLessStockProducts({ page: 1 })),
          dispatch(handleGetMostSalesProducts({ page: 1 })),
        ]);

        const hasSuccess = responses.some((res) => res.status === "fulfilled");

        if (!hasSuccess) {
          setTimeout(() => fetchData(retryCount + 1), 5000);
        }
      } catch (error) {
        toast.error("Error fetching data");
        setTimeout(() => fetchData(retryCount + 1), 5000);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (categoriesError) toast.error(categoriesError);
    if (reviewsError) toast.error(reviewsError);
    if (productsError) toast.error(productsError);
  }, [categoriesError, reviewsError, productsError]);

  const images = useMemo(
    () => reviews.map((review) => review.image?.url).filter(Boolean),
    [reviews]
  );

  return {
    categories,
    productsLess,
    productsSales,
    isDarkMode,
    images,
    isLoading,
  };
}
