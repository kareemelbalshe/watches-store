import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../../../lib/redux/store";
import { useCallback, useEffect, useMemo } from "react";
import { handleGetCartById } from "../../../redux/cartSlice";
import { toast } from "react-toastify";
import { ProductCart } from "../../../../../../lib/types/types";

export function useViewCart() {
  const { cartId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { cart, error } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (cartId) {
      dispatch(handleGetCartById(cartId));
    }
  }, [dispatch, cartId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const products = useMemo(() => cart?.products || [], [cart]);

  const renderProduct = useCallback((item: ProductCart, index: number) => {
    if (!item?.product) return null;

    return (
      <li
        key={index}
        className="py-2 flex items-center justify-between flex-col md:flex-row"
      >
        <p>
          <strong>Product Name:</strong> {item.product.title}{" "}
          <Link to={`/product/${item.product._id}`} className="underline">
            View Product
          </Link>
        </p>
        <p>
          <strong>Quantity:</strong> {item?.quantity as any}
        </p>
        <p>
          <strong>Price:</strong>{" "}
          {item.product.priceAfterDiscount
            ? item.product.priceAfterDiscount
            : item.product.price}{" "}
          EGP
        </p>
        {item.product.image && item.product.image.length > 0 && (
          <img
            src={item.product.image[0].url}
            alt="product"
            className="w-20 h-20 bg-center bg-no-repeat bg-cover"
            loading="lazy"
          />
        )}
      </li>
    );
  }, []);
  return {
    cart,
    products,
    renderProduct,
  };
}
