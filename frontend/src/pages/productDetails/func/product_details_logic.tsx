import { useEffect, useState, useCallback, useRef } from "react";
import { handleGetProductById } from "../../dashboard/product/redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { product, error } = useSelector((state: RootState) => state.product);

  const fetched = useRef(false);

  useEffect(() => {
    if (productId && !fetched.current) {
      dispatch(handleGetProductById(productId));
      fetched.current = true;
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.image) {
      setImage(product?.image[0].url || "");
    }
  }, [product]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [hoveredIndex, setHoveredIndex] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [image, setImage] = useState("");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
    setHoveredIndex(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(false);
  }, []);

  return {
    toast,
    product,
    dispatch,
    hoveredIndex,
    position,
    image,
    setImage,
    handleMouseMove,
    handleMouseLeave,
  };
}
