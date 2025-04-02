import {
  handleAddProductImage,
  handleDeleteProductImage,
  handleGetProductById,
  handleUpdateProduct,
} from "../../redux/productSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../../lib/redux/store";
import { handleGetAllCategories } from "../../../category/redux/categorySlice";
import { useEffect, useState, useCallback } from "react";

export default function useEditProductLogic() {
  const { productId } = useParams();
  const {
    product,
    error,
    loading: sLoading,
  } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState<number | 0>(0);
  const [stock, setStock] = useState<number | null | 0>(0);
  const [price, setPrice] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [addImage, setAddImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) dispatch(handleGetProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setLoading(sLoading);
  }, [sLoading]);

  useEffect(() => {
    dispatch(handleGetAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product?.title ?? "");
      setDescription(product?.description ?? "");
      setCategory(product?.category ?? "");
      setDiscount(product?.discount ?? 0);
      setStock(product?.stock ?? 0);
      setPrice(product?.price ?? 0);
    }
  }, [product]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!title.trim()) return toast.error("Please enter a title");
      if (!category) return toast.error("Please select a category");
      if (!price) return toast.error("Please enter a price");
      if (!stock) return toast.error("Please enter a quantity");

      await dispatch(
        handleUpdateProduct({
          productId: productId as string,
          product: {
            title,
            price,
            discount,
            category,
            description,
            stock,
          },
        })
      ).unwrap();

      toast.success("Product has been updated successfully");
    },
    [dispatch, productId, title, category, description, price, discount, stock]
  );

  const handleAddImage = useCallback(async () => {
    if (!file) return toast.error("Please select an image");

    await dispatch(
      handleAddProductImage({ productId: productId as string, image: file })
    ).unwrap();

    toast.success("Image added successfully");
    setFile(null);
    setAddImage(false);

    await dispatch(handleGetProductById(productId as string));
  }, [dispatch, file, productId]);

  const handleDeleteImage = useCallback(
    async (imageId: any) => {
      await dispatch(
        handleDeleteProductImage({ productId: productId as string, imageId })
      ).unwrap();

      toast.success("Image deleted successfully");

      await dispatch(handleGetProductById(productId as string));
    },
    [dispatch, productId]
  );

  return {
    product,
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
    addImage,
    setAddImage,
    handleAddImage,
    handleDeleteImage,
  };
}
