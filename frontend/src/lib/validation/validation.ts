import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const checkoutValidation = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^(010|011|012|015)\d{8}$/, "Invalid Egyptian phone number"),
  address: yup
    .string()
    .required("Address is required")
    .min(2, "Address must be at least 2 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
});
