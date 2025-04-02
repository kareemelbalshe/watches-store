import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import { useCallback, useEffect } from "react";
import {
  handleDeleteCategory,
  handleGetAllCategories,
} from "../redux/categorySlice";
import { toast } from "react-toastify";

export function useCategory() {
  const { categories, error } = useSelector(
    (state: RootState) => state.category
  );
  const dispatch = useDispatch<AppDispatch>();

  const fetchCategories = useCallback(() => {
    dispatch(handleGetAllCategories()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDeleteOneClick = useCallback(
    async (id: string) => {
      await dispatch(handleDeleteCategory(id)).unwrap();
      if (error) {
        toast.error(error);
        return;
      }

      fetchCategories();
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Category has been deleted successfully");
    },
    [dispatch, error, fetchCategories]
  );

  return {
    categories,
    handleDeleteOneClick,
  };
}
