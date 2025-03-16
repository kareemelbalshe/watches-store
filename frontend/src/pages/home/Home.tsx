import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import RollingGallery from "../../lib/animation/RollingGallery";
import Underline from "./components/Underline";
import ProductSlider from "../../components/slider/ProductSlider";
import CategorySection from "./components/CategorySection";
import { useHome } from "./func/home_logic";

export default function Home() {
  const { categories, productsLess, productsSales, isDarkMode, images } =
    useHome();

  return (
    <div className="flex items-center flex-col w-full ">
      <div className="w-full h-[calc(100vh-150px)] bg-[url('https://media.rolex.com/image/upload/c_limit,w_1920/f_auto/q_auto/v1704380521/corners/homepage/corners-homepage-push-1945_oyster_perpetual_datejust_1802jva_m126333_0010_1802jva_002')] bg-no-repeat bg-center bg-fixed"></div>

      <h1 className="text-3xl bg-amber-400 p-5 w-full text-center">
        يمكن الطلب من خلال واتس اب في اي وقت
      </h1>

      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl mt-6" id="categories">
          Categories
        </h1>
        <Underline />
        <CategorySection categories={categories} isDarkMode={isDarkMode} />
      </div>

      <h1 className="text-4xl mt-6" id="reviews">
        Less quantity
      </h1>
      <Underline />

      <ProductSlider arr={productsLess.products} />
      <h1 className="text-4xl mt-6" id="reviews">
        Most sales
      </h1>
      <Underline />
      {productsSales.products?.length > 0 ? (
        <ProductSlider arr={productsSales.products} />
      ) : (
        <h1>No sales yet</h1>
      )}
          <h1 className="text-4xl mt-6 mx-auto hidden md:block" id="reviews">
            Reviews
          </h1>
          <Underline />
          <RollingGallery autoplay={true} pauseOnHover={true} images={images} />

      <Link
        className="fixed bottom-12 right-4 bg-green-500 rounded-full z-10"
        to="https://api.whatsapp.com/send/?phone=%2B201060856694&text&type=phone_number&app_absent=0"
        target="_blank"
      >
        <FaWhatsapp className="w-12 h-12 text-white m-2" />
      </Link>
    </div>
  );
}
