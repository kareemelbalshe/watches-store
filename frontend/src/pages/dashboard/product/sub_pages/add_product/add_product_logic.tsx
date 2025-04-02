import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../lib/redux/store";
import { handleCreateProduct } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { handleGetAllCategories } from "../../../category/redux/categorySlice";
import { useEffect, useState } from "react";

export default function useAddProductLogic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState<number | 0>(0);
  const [stock, setStock] = useState<number | null | 0>(0);
  const [price, setPrice] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.category);
  const { loading: sLoading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    setLoading(sLoading);
  }, [sLoading]);

  useEffect(() => {
    dispatch(handleGetAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0].title);
    }
  }, [categories, category]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Please enter a title");
    if (!category) return toast.error("Please select a category");
    if (!file) return toast.error("Please select an image");
    if (!price) return toast.error("Please enter a price");
    if (!stock) return toast.error("Please enter a quantity");

    await dispatch(
      handleCreateProduct({
        title,
        image: file,
        price,
        discount,
        category,
        description,
        stock,
      })
    ).unwrap();

    toast.success("Product has been created successfully");

    setFile(null);
    setCategory(categories[0]?.title || "");
    setTitle("");
    setDescription("");
    setPrice(null);
    setDiscount(0);
    setStock(null);
  };

  return {
    title,
    file,
    loading,
    handleSubmit,
    setFile,
    setTitle,
    navigate,
    handleChange,
    categories,
    description,
    setDescription,
    category,
    discount,
    setDiscount,
    stock,
    setStock,
    price,
    setPrice,
  };
}
