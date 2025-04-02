import { BsCartCheck } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import { useHeader } from "./func/header_logic";

export default function Header() {
  const {
    isAuthenticated,
    products,
    menuOpen,
    setMenuOpen,
    headerRef,
    totalCarts,
    isDarkMode,
    toggleDarkMode,
    logoutHandler,
  } = useHeader();

  return (
    <header className="w-full fixed top-0 left-0 z-10">
      <div
        className={`w-full border-b-2 border-b-amber-400 px-6 md:px-10 py-5 flex items-center justify-between h-[100px] ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        <Link to={`/`} className="text-4xl md:text-5xl">
          Logo
        </Link>

        <ul
          ref={headerRef}
          className={`ulHeader flex flex-col justify-center gap-12 md:flex-row md:items-center md:gap-6 absolute md:relative top-0 right-0 w-1/2 sm:w-1/4 md:w-auto bg-white dark:bg-black md:bg-transparent md:dark:bg-transparent h-[calc(100vh-73px)] mt-[10px] md:h-auto p-5 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-10`}
        >
          <li className="py-2 md:py-0">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <a href="/#categories" onClick={() => setMenuOpen(false)}>
              Categories
            </a>
          </li>
          <li className="py-2 md:py-0">
            <a href="/#reviews" onClick={() => setMenuOpen(false)}>
              Reviews
            </a>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/products" onClick={() => setMenuOpen(false)}>
              All Products
            </Link>
          </li>
        </ul>

        <div className="text-3xl md:text-4xl font-bold text-amber-400 cursor-pointer flex items-center gap-3 z-20">
          <div
            className={`relative w-14 h-[30px] rounded-full cursor-pointer border-2 ${
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
            onKeyPress={(e) => e.key === "Enter" && toggleDarkMode()}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-black rounded-full transition-all duration-300 ${
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
            <Link to="/dashboard" className="relative">
              <RxDashboard />
              {totalCarts > 0 && (
                <span className="absolute w-5 h-5 rounded-full bg-red-600 -top-2 -right-2 text-white text-sm text-center">
                  {totalCarts}
                </span>
              )}
            </Link>
          )}

          {isAuthenticated && <CgLogOut onClick={logoutHandler} />}

          <button
            className="md:hidden text-3xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div className="absolute left-0 -bottom-1 shadow-lg shadow-amber-400 h-[10px] w-[10px] bg-amber-400 rounded-full animate-movingDot"></div>
    </header>
  );
}
