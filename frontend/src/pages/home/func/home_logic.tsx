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

  const { categories, error: categoriesError } = useSelector(
    (state: RootState) => state.category
  );
  const { reviews, error: reviewsError } = useSelector(
    (state: RootState) => state.review
  );
  const {
    productsLess,
    productsSales,
    error: productsError,
  } = useSelector((state: RootState) => state.product);
  

  const fetchData = useCallback(() => {
    dispatch(handleGetAllCategories());
    dispatch(handleGetAllReviews());
    dispatch(handleGetLessStockProducts({ page: 1 }));
    dispatch(handleGetMostSalesProducts({ page: 1 }));
  }, [dispatch]);

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
  };
}
