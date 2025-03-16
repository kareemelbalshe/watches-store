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
