import { useDispatch, useSelector } from "react-redux";
import { ProductCart } from "../../lib/types/types";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { cartAction } from "../../lib/redux/slices/cart-slice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

export default function Cart() {
  const { products } = useSelector((state: RootState) => state.localCart);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  return (
    <div className="m-6 lg:m-28">
      <table className="min-w-full rounded-lg my-10">
        <thead>
          <tr className="flex items-center justify-between shadow-md rounded-md border-b border-amber-400 py-3 px-4">
            <th className={`flex-1`}>Product</th>
            <th className={`flex-1`}>Price</th>
            <th className={`flex-1`}>Quantity</th>
            <th className={`flex-1`}>Subtotal</th>
            <th className={`flex-1`}>Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((product: ProductCart, index: number) => (
            <tr
              key={index}
              className="flex flex-wrap items-center justify-between shadow-md my-3 rounded-md border-b border-amber-400 py-3 px-4 transition duration-200"
            >
              <td className="flex-1">{product.product.title}</td>
              <td className="flex-1 text-green-500">
                ${product.product.price.toFixed(2)}
              </td>
              <td className="flex-1">
                <input
                  type="number"
                  className={`w-11 border-[1px] text-center rounded-md bg-inherit border-amber-400`}
                  value={product.quantity.quantity}
                  onChange={(e) =>
                    Number(e.target.value) > 0 &&
                    Number(e.target.value) <= product.product.stock &&
                    dispatch(
                      cartAction.updateQuantity({
                        id: product.product._id,
                        quantity: Number(e.target.value),
                      })
                    )
                  }
                />
              </td>
              <td className="flex-1 text-blue-500">
                EGP
                {(product.product.price * product.quantity.quantity).toFixed(2)}
              </td>
              <td className="flex-1">
                <Button
                  text="Delete"
                  width="w-20"
                  onClick={() => dispatch(cartAction.deleteFromCart(product))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col lg:flex-row gap-5 w-[100%] items-center md:items-start mb-20">
        <div className="flex flex-col gap-3 w-[300px] lg:w-[500px] px-3 py-4 border-[1px] border-amber-400 rounded-md ">
          <h1 className="h11">cart total</h1>
          <div className="flex items-center justify-between border-b-[1px] border-amber-400 py-2">
            <h2>subtotal</h2>
            <p className="">
              EGP
              {products
                .reduce(
                  (acc: number, curr: ProductCart) =>
                    acc + curr.product.price * curr.quantity.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between border-b-[1px] border-amber-400 py-2">
            <h2>shipping</h2>
            <p className="">free</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h2>total</h2>
            <p className="">
              EGP
              {products
                .reduce(
                  (acc: number, curr: ProductCart) =>
                    acc + curr.product.price * curr.quantity.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <Button
            text="process to checkout"
            onClick={() => navigate("/checkout")}
          />
        </div>
      </div>
    </div>
  );
}
