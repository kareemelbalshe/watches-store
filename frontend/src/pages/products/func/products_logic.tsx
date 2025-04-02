import { useCallback, useEffect, useState } from "react";
import { handleGetAllProducts } from "../../dashboard/product/redux/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { toast } from "react-toastify";

export function useProducts() {
  const { productsTable, error } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { category } = useParams();

  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(productsTable.currentPage);
  }, [productsTable]);

  const fetchProducts = useCallback(() => {
    dispatch(
      handleGetAllProducts({ page: page, limit: 9, category: category })
    );
  }, [dispatch, page, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return {
    productsTable,
    page,
    setPage,
    navigate,
    category,
    dispatch,
  };
}
