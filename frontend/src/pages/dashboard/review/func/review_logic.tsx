import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import { useCallback, useEffect } from "react";
import { handleDeleteReview, handleGetAllReviews } from "../redux/reviewSlice";
import { toast } from "react-toastify";

export function useReview() {
  const { reviews, error } = useSelector((state: RootState) => state.review);
  const dispatch = useDispatch<AppDispatch>();

  const fetchReviews = useCallback(() => {
    dispatch(handleGetAllReviews());
  }, [dispatch]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDeleteOneClick = useCallback(
    (id: string) => {
      dispatch(handleDeleteReview(id));
      if (error) {
        toast.error(error);
        return;
      }
      fetchReviews();
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Review has been deleted successfully");
    },
    [dispatch, error, fetchReviews]
  );

  return {
    reviews,
    handleDeleteOneClick,
  };
}
