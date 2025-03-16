import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { useTheme } from "../../../hooks/ThemeContext";
import { useEffect } from "react";
import { handleGetAllCategories } from "../../dashboard/category/redux/categorySlice";
import { handleGetAllReviews } from "../../dashboard/review/redux/reviewSlice";
import { handleGetLessStockProducts, handleGetMostSalesProducts } from "../../dashboard/product/redux/productSlice";

export function useHome() {
    const { categories } = useSelector((state: RootState) => state.category);
  const { reviews } = useSelector((state: RootState) => state.review);
  const { productsLess, productsSales } = useSelector(
    (state: RootState) => state.product
  );

  const { isDarkMode } = useTheme();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(handleGetAllCategories());
    dispatch(handleGetAllReviews());
    dispatch(handleGetLessStockProducts({ page: 1 }));
    dispatch(handleGetMostSalesProducts({ page: 1 }));
  }, [dispatch]);

  const images: string[] = reviews.map((review) => review.image.url);
  return {
    categories,
    productsLess,
    productsSales,
    isDarkMode,
    images,
  };
}