import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { truncate } from "../../lib/functions/truncate";
import { Product } from "../../lib/types/types";
import { cartAction } from "../../lib/redux/slices/cart-slice";
import { FaRegEye } from "react-icons/fa";
import { AppDispatch } from "../../lib/redux/store";
import { memo, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { BsCartPlus } from "react-icons/bs";

interface ProductSliderProps {
  arr?: Product[];
}

const ProductSlider = memo(function ProductSlider({ arr }: ProductSliderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 310;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative my-10 w-full px-4 md:px-16">
      <button
        onClick={() => scrollSlider("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-10 hidden md:flex"
      >
        <FaChevronLeft size={20} />
      </button>

      <div
        ref={sliderRef}
        className="flex gap-7 w-full text-black items-start overflow-x-scroll hide-scrollbar scroll-smooth"
      >
        {arr?.map((item, index) => (
          <div
            className="flex items-center flex-col bg-amber-400 rounded-lg pb-2 min-w-72 group"
            key={index}
          >
            <div className="flex justify-center items-center relative overflow-hidden">
              <img
                className="w-72 bg-cover bg-center bg-no-repeat h-80"
                src={item?.image[0]?.url}
                alt=""
                loading="lazy"
              />

              <FaRegEye
                onClick={() => navigate(`/product/${item._id}`)}
                className="absolute right-4 top-4 text-amber-400 text-2xl cursor-pointer"
              />

              <button
                onClick={() => {
                  dispatch(cartAction.addToCart(item));
                  toast.success("Product has been added to the cart!");
                }}
                className="absolute bottom-[-100%] w-full bg-black text-white p-2 transition-all duration-300 group-hover:bottom-0 flex items-center justify-center gap-2 text-xl"
              >
                <BsCartPlus /> <p>Add to Cart</p>
              </button>
            </div>
            <h1 className="text-2xl">{truncate(item.title, 20)}</h1>
            <p className="text-sm">Price: {item.price} EGP</p>
            {item.discount > 0 && (
              <>
                <span className="text-sm">Discount: {item.discount}%</span>
                <span className="text-sm">
                  Price After Discount: {item.priceAfterDiscount} EGP
                </span>
              </>
            )}

            <span className="text-sm">Quantity: {item.stock}</span>
            <span className="text-sm">Category: ({item?.category})</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollSlider("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-10 hidden md:flex"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
});
export default ProductSlider;
