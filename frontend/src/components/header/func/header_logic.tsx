import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { handleGetAllCarts } from "../../../pages/dashboard/cart/redux/cartSlice";
import { useTheme } from "../../../hooks/ThemeContext";
import { logout } from "../../../pages/login/redux/authSlice";

export function useHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.localCart);
  const { cartTable } = useSelector((state: RootState) => state.cart);

  const headerRef = useRef<HTMLUListElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const fetchCarts = useCallback(() => {
    if (isAuthenticated) {
      dispatch(handleGetAllCarts({ page: 1 })).unwrap();
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  const totalCarts = useMemo(() => {
    return cartTable.totalCarts || 0;
  }, [cartTable]);

  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    products,
    menuOpen,
    setMenuOpen,
    headerRef,
    dispatch,
    fetchCarts,
    totalCarts,
    isDarkMode,
    toggleDarkMode,
    logoutHandler,
  };
}
