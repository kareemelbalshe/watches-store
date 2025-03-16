import { useEffect } from "react";
import { useTheme } from "../../hooks/ThemeContext";
import { BsCartCheck } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { Link } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { logout } from "../../pages/login/redux/authSlice";

export default function Header() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.localCart);

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

  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className="w-full fixed top-0 left-0 z-10">
      <div
        className={`w-full border-b-2 border-b-amber-400 px-10 py-5 flex items-center justify-between h-[100px] ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        <div className="">
          <h1 className="text-5xl">Logo</h1>
        </div>

        <ul className="flex items-center gap-6 ulHeader">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/#categories">Categories</a>
          </li>
          <li>
            <a href="/#reviews">Reviews</a>
          </li>
          <li>
            <Link to="/products">All Products</Link>
          </li>
        </ul>
        <div className="text-4xl font-bold text-amber-400 cursor-pointer flex items-center gap-3">
          <div
            className={`relative w-16 h-[35px] rounded-full cursor-pointer border-2 ${
              isDarkMode
                ? "bg-amber-800 border-white"
                : "bg-amber-100 border-black"
            }`}
            onClick={toggleDarkMode}
            role="button"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") toggleDarkMode();
            }}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-black rounded-full transition-all duration-300 ${
                isDarkMode ? "right-1" : "left-1"
              }`}
            ></div>
          </div>
          <Link to="/cart" className="relative">
            <BsCartCheck />
            {products.length > 0 && (
              <span className="absolute w-5 h-5 rounded-full bg-red-600 -top-2 -right-2 text-white text-sm text-center">
                {products.length}
              </span>
            )}
          </Link>
          {isAuthenticated && (
            <Link to={"/dashboard"}>
              <RxDashboard />
            </Link>
          )}

          {isAuthenticated && <CgLogOut onClick={logoutHandler} />}
        </div>

        <div className="absolute left-0 -bottom-1 shadow-lg shadow-amber-400  h-[10px] w-[10px] bg-amber-400 rounded-full animate-movingDot"></div>
      </div>
    </header>
  );
}
