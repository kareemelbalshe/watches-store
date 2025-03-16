import { AiFillProduct } from "react-icons/ai";
import {
  MdOutlineCategory,
  MdOutlineReviews,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { Link } from "react-router-dom";

export default function DashboardSlider() {
  return (
    <div className="group ulDashboard h-[calc(100vh-100px)] w-[100px] md:hover:w-[300px] left-0 bg-amber-400 flex flex-col items-start justify-center gap-5 p-5 transition-all duration-300 ease-in-out text-5xl">
      <Link to="/dashboard">
        <MdOutlineShoppingCartCheckout />
        <p className="hidden md:group-hover:block transition-all duration-300 ease-in-out">
          Cart
        </p>
      </Link>
      <Link to="/dashboard/product">
        {" "}
        <AiFillProduct />
        <p className="hidden md:group-hover:block transition-all duration-300 ease-in-out">
          Product
        </p>
      </Link>
      <Link to="/dashboard/category">
        <MdOutlineCategory />
        <p className="hidden md:group-hover:block transition-all duration-300 ease-in-out">
          Category
        </p>
      </Link>
      <Link to="/dashboard/review">
        <MdOutlineReviews />
        <p className="hidden md:group-hover:block transition-all duration-300 ease-in-out">
          Review
        </p>
      </Link>
    </div>
  );
}
