import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/redux/store";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { handleAddToCart } from "../dashboard/cart/redux/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCart } from "../../lib/types/types";
import { cartAction } from "../../lib/redux/slices/cart-slice";
import { toast } from "react-toastify";

export default function Checkout() {
  const { products } = useSelector((state: RootState) => state.localCart);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    if (products.length) {
      setTotalPrice(
        products.reduce(
          (acc = 0, curr: ProductCart) =>
            acc + (curr.product?.price || 0) * (curr.quantity?.quantity || 0),
          0
        )
      );
    }
  }, [products]);

  const formData = {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    products: products.map((product: ProductCart) => ({
      product: product.product._id,
      quantity: product.quantity.quantity,
    })),
    totalPrice: totalPrice,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!products.length) {
      toast.error("Please add some products to cart");
      return;
    }
    dispatch(handleAddToCart(formData));
    dispatch(cartAction.clear());
    toast.success("Cart has been added successfully, we will send you");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  
  console.log("Products in cart:", products);
  console.log("Total Price Calculated:", totalPrice);

  return (
    <div className="flex items-start justify-between p-10">
      <form
        onSubmit={handleSubmit}
        className="w-[80%] flex flex-col gap-5 mb-16"
      >
        <div className="flex gap-5 items-center justify-between">
          <Input
            label="First Name"
            required
            placeholder="First Name"
            border="border-amber-400"
            value={firstName}
            setValue={setFirstName}
          />
          <Input
            label="Last Name"
            required
            placeholder="Last Name"
            border="border-amber-400"
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <Input
          label="Email"
          type="email"
          required
          placeholder="Email"
          border="border-amber-400"
          value={email}
          setValue={setEmail}
        />
        <Input
          label="Phone"
          required
          placeholder="Phone"
          border="border-amber-400"
          value={phone}
          setValue={setPhone}
        />
        <Input
          label="Address"
          required
          placeholder="Address"
          border="border-amber-400"
          value={address}
          setValue={setAddress}
        />
        <Input
          label="City"
          required
          placeholder="City"
          border="border-amber-400"
          value={city}
          setValue={setCity}
        />
        <Button text="Checkout" type="submit" width="w-[300px]" />
      </form>
      <Button
        text="Back to Cart"
        width="w-[100px]"
        onClick={() => navigate("/cart")}
      />
    </div>
  );
}
