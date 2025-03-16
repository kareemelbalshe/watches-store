import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { loginValidation } from "../../../lib/validation/validation";
import { handleLogin } from "../redux/authSlice";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const ref = useRef<HTMLFormElement>(null);

  console.log({ email, password });

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        console.log(email, password);
        await dispatch(handleLogin({ email, password }));
        navigate("/dashboard");
      } catch (error: any) {
        console.error("Login failed:", error);
        setErrors({ email: "Invalid email or password", password: "" });
      }
    },
    [email, password, dispatch, navigate]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setErrors({ email: "", password: "" });
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const validateForm = async () => {
      try {
        await loginValidation.validate(
          { email, password },
          { abortEarly: false }
        );
        setErrors({ email: "", password: "" });
      } catch (validationError: any) {
        const validationErrors: { [key: string]: string } = {};
        validationError.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    };

    validateForm();
  }, [email, password]);

  const memoizedErrors = useMemo(() => errors, [errors]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors: memoizedErrors,
    onSubmit,
    ref,
  };
}
