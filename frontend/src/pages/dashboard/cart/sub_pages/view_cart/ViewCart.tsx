import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../../lib/redux/store";
import { useEffect } from "react";
import { handleGetCartById } from "../../redux/cartSlice";

export default function ViewCart() {
  const { cartId } = useParams();
  const { cart } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(handleGetCartById(cartId));
  }, [dispatch, cartId]);

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-2xl bg-amber-950 mt-10 mb-32">
        <h2 className="text-2xl font-semibold mb-4">Cart Details</h2>
        <p>
          <strong>Name:</strong> {cart.firstName} {cart.lastName}
        </p>
        <p>
          <strong>Email:</strong> {cart.email}
        </p>
        <p>
          <strong>Phone:</strong> {cart.phone}
        </p>
        <p>
          <strong>Address:</strong> {cart.address}, {cart.city}
        </p>
        <p>
          <strong>Total Price:</strong> {cart.totalPrice} EGP
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(cart.createdAt).toLocaleString()}
        </p>

        <h3 className="text-xl font-semibold mt-4">Products</h3>
        <ul className="mt-2">
          {cart?.products?.map((item) => (
            <li key={item._id} className="py-2 flex items-center justify-between flex-col md:flex-row">
              <p>
                <strong>Product Name:</strong> {item.product.title}{" "}
                <Link to={`/product/${item.product._id}`} className="underline">
                  View Product
                </Link>
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Price:</strong> {item.product.price} EGP
              </p>
              <img src={item.product.image[0].url} alt="product" className="w-20 h-20 bg-center bg-no-repeat bg-cover" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
