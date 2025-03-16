import { useEffect, useRef, useState } from "react";
import { handleGetProductById } from "../../dashboard/product/redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { useParams } from "react-router-dom";

export function useProductDetails() {
  const { productId } = useParams();
  const { product } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && productId) {
      dispatch(handleGetProductById(productId));
      hasFetched.current = true;
    }
  }, [dispatch, productId]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  return {
    product,
    hoveredIndex,
    position,
    handleMouseMove,
    handleMouseLeave,
  };
}
