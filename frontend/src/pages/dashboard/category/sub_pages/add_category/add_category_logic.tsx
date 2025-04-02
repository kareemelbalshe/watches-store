import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../lib/redux/store";
import { handleCreateCategory } from "../../redux/categorySlice";
import { useNavigate } from "react-router-dom";

export default function useAddCategoryLogic() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const { error, loading: sLoading } = useSelector(
    (state: RootState) => state.category
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLoading(sLoading);
  }, [sLoading]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!title) {
        toast.error("Please enter a title");
        return;
      }
      if (!file) {
        toast.error("Please select an image");
        return;
      }
      await dispatch(handleCreateCategory({ title, image: file })).unwrap();
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Category has been created successfully");
      setTitle("");
      setFile(null);
    },
    [title, file, dispatch, error]
  );

  return {
    title,
    file,
    loading,
    handleSubmit,
    setFile,
    setTitle,
    navigate,
  };
}
