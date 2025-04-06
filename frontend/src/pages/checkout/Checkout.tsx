import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useCheckout } from "./func/checkout_logic";

export default function Checkout() {
  const {
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
    errors,
    handleSubmit,
    navigate,
  } = useCheckout();

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
            error={errors.firstName}
          />
          <Input
            label="Last Name"
            required
            placeholder="Last Name"
            border="border-amber-400"
            value={lastName}
            setValue={setLastName}
            error={errors.lastName}
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
          error={errors.email}
        />
        <Input
          label="Phone"
          required
          placeholder="Phone"
          border="border-amber-400"
          value={phone}
          setValue={setPhone}
          error={errors.phone}
        />
        <Input
          label="Address"
          required
          placeholder="Address"
          border="border-amber-400"
          value={address}
          setValue={setAddress}
          error={errors.address}
        />
        <Input
          label="City"
          required
          placeholder="City"
          border="border-amber-400"
          value={city}
          setValue={setCity}
          error={errors.city}
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
