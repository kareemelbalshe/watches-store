import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteProduct,
  handleGetAllProducts,
} from "../redux/productSlice";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../../../../lib/redux/store";

export function useProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { productsTable, error } = useSelector(
    (state: RootState) => state.product
  );
  const [page, setPage] = useState(0);

  const fetchProducts = useCallback(() => {
    dispatch(handleGetAllProducts({ page, limit: 10 }));
  }, [dispatch, page]);

  useEffect(() => {
    setPage(productsTable?.currentPage || 0);
  }, [productsTable?.currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDeleteOneClick = useCallback(
    async (productId: string) => {
      await dispatch(handleDeleteProduct(productId));
      if (error) {
        toast.error(error);
        return;
      }
      fetchProducts();
      toast.success("Product has been deleted successfully");
    },
    [dispatch, fetchProducts, error]
  );

  return { productsTable, page, setPage, handleDeleteOneClick };
}
