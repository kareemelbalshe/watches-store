import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import { handleGetAllCarts, handleRemoveCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

export function useCart() {
  const { cartTable, error } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(cartTable?.currentPage || 1);

  useEffect(() => {
    setPage(cartTable?.currentPage || 1);
  }, [cartTable]);

  const fetchCarts = useCallback(() => {
    if (page > 0) {
      dispatch(handleGetAllCarts({ page, limit: 10 }));
    }
  }, [dispatch, page]);

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDeleteOneClick = useCallback(
    async (cartId: string) => {
      try {
        await dispatch(handleRemoveCart(cartId)).unwrap();
        toast.success("Cart has been deleted successfully");
        dispatch(handleGetAllCarts({ page, limit: 10 }));
      } catch (err) {
        toast.error(err as string);
      }
    },
    [dispatch, page]
  );

  return {
    cartTable,
    page,
    setPage,
    handleDeleteOneClick,
  };
}
