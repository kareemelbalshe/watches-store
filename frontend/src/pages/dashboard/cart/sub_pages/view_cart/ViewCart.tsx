import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../../lib/redux/store";
import { useEffect, useMemo, useCallback } from "react";
import { handleGetCartById } from "../../redux/cartSlice";

export default function ViewCart() {
  const { cartId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  
  const cart = useSelector((state: RootState) => state.cart.cart);

  useEffect(() => {
    if (cartId) {
      dispatch(handleGetCartById(cartId));
    }
  }, [dispatch, cartId]);

  const products = useMemo(() => cart?.products || [], [cart]);

  const renderProduct = useCallback((item: any, index: number) => {
    if (!item?.product) return null;

    return (
      <li key={index} className="py-2 flex items-center justify-between flex-col md:flex-row">
        <p>
          <strong>Product Name:</strong> {item.product.title}{" "}
          <Link to={`/product/${item.product._id}`} className="underline">
            View Product
          </Link>
        </p>
        <p>
          <strong>Quantity:</strong> {item?.quantity?.quantity}
        </p>
        <p>
          <strong>Price:</strong> {item.product.price} EGP
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

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-2xl bg-amber-950 mt-10 mb-32">
        <h2 className="text-2xl font-semibold mb-4">Cart Details</h2>
        <p>
          <strong>Name:</strong> {cart?.firstName} {cart?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {cart?.email}
        </p>
        <p>
          <strong>Phone:</strong> {cart?.phone}
        </p>
        <p>
          <strong>Address:</strong> {cart?.address}, {cart?.city}
        </p>
        <p>
          <strong>Total Price:</strong> {cart?.totalPrice} EGP
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {cart?.createdAt ? new Date(cart.createdAt).toLocaleString() : "N/A"}
        </p>

        <h3 className="text-xl font-semibold mt-4">Products</h3>
        <ul className="mt-2">
          {products.map(renderProduct)}
        </ul>
      </div>
    </div>
  );
}
