import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../../lib/redux/store";
import { useCallback, useEffect, useState } from "react";
import {
  handleGetCategoryById,
  handleUpdateCategory,
  handleUpdateCategoryImage,
} from "../../redux/categorySlice";
import { toast } from "react-toastify";

export default function useEditCategoryLogic() {
  const { categoryId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | any>("");
  const [loading, setLoading] = useState(false);

  const {
    category,
    error,
    loading: sLoading,
  } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (sLoading !== loading) setLoading(sLoading);
  }, [sLoading, loading]);

  const fetchCategory = useCallback(() => {
    if (categoryId) dispatch(handleGetCategoryById(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    if (category) {
      setTitle((prev) => (prev !== category.title ? category.title : prev));
      setImage((prev: string) =>
        prev !== category.image?.url ? category.image?.url : prev
      );
    }
  }, [category]);

  const updateTitle = useCallback(async () => {
    if (title !== category?.title) {
      await dispatch(
        handleUpdateCategory({ categoryId: categoryId as string, title })
      ).unwrap();
    }
  }, [dispatch, categoryId, title, category?.title]);

  const updateImage = useCallback(async () => {
    if (file) {
      await dispatch(
        handleUpdateCategoryImage({
          categoryId: categoryId as string,
          image: file,
        })
      ).unwrap();
    }
  }, [dispatch, categoryId, file]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Please enter a title");

    await Promise.all([updateTitle(), updateImage()]);
    toast.success("Category has been updated successfully");

    setFile(null);
    fetchCategory();
  };

  return {
    title,
    image,
    file,
    loading,
    handleSubmit,
    setFile,
    setTitle,
    navigate,
  };
}
