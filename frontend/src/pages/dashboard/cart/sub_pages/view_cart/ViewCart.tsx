import { useNavigate } from "react-router-dom";
import { useViewCart } from "./func/view_cart_logic";
import Button from "../../../../../components/button/Button";
import { useTheme } from "../../../../../hooks/ThemeContext";

export default function ViewCart() {
  const { cart, products, renderProduct } = useViewCart();
  const navigate= useNavigate()

  const { isDarkMode } = useTheme();
  return (
    <div className="flex justify-center items-center flex-col gap-5 mb-32">
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-2xl 
        ${isDarkMode ? "bg-amber-950" : "bg-amber-200"}
        mt-10`}>
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
      <Button text="Back" onClick={()=>navigate("/dashboard")} width="w-[200px]" />
    </div>
  );
}
