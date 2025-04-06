import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { checkoutValidation } from "../../../lib/validation/validation";
import { ProductCart } from "../../../lib/types/types";
import { toast } from "react-toastify";
import { handleAddToCart } from "../../dashboard/cart/redux/cartSlice";
import { cartAction } from "../../../lib/redux/slices/cart-slice";

export function useCheckout() {
  const { products } = useSelector((state: RootState) => state.localCart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const validateForm = async () => {
      try {
        await checkoutValidation.validate(
          { firstName, lastName, email, phone, address, city, products },
          { abortEarly: false }
        );
        setErrors({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
        });
      } catch (validationError: any) {
        const validationErrors: { [key: string]: string } = {};
        validationError.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors as any);
      }
    };

    validateForm();
  }, [firstName, lastName, email, phone, address, city, products]);

  const memoizedErrors = useMemo(() => errors, [errors]);

  const totalPrice = useMemo(
    () =>
      products.reduce(
        (acc: number, curr: ProductCart) =>
          curr.product.priceAfterDiscount
            ? acc +
              (curr.product?.priceAfterDiscount || 0) *
                (curr.quantity?.quantity || 0)
            : acc + (curr.product?.price || 0) * (curr.quantity?.quantity || 0),
        0
      ),
    [products]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!products.length) {
        toast.error("Please add some products to cart");
        return;
      }

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
        totalPrice,
      };

      if (errors.firstName) return toast.error(errors.firstName);
      if (errors.lastName) return toast.error(errors.lastName);
      if (errors.email) return toast.error(errors.email);
      if (errors.phone) return toast.error(errors.phone);
      if (errors.address) return toast.error(errors.address);
      if (errors.city) return toast.error(errors.city);

      await dispatch(handleAddToCart(formData)).unwrap();

      dispatch(cartAction.clear());
      toast.success("Cart has been added successfully, we will send you");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");

      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 5000);
    },
    [
      dispatch,
      navigate,
      products,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      totalPrice,
      errors,
    ]
  );

  return {
    navigate,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    city,
    setCity,
    errors: memoizedErrors,
    handleSubmit,
  };
}
