import { FaRegEye } from "react-icons/fa";
import { cartAction } from "../../lib/redux/slices/cart-slice";
import { truncate } from "../../lib/functions/truncate";
import { Product } from "../../lib/types/types";
import Underline from "../home/components/Underline";
import Pagination from "../../components/table/pagination/Pagination";
import { useProducts } from "./func/products_logic";
import { BsCartPlus } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Products() {
  const { productsTable, page, setPage, navigate, category, dispatch } =
    useProducts();

  return (
    <div className="w-full flex items-center flex-col pb-2 md:pb-24 mb-20 md:mb-0">
      <h1 className="text-4xl mt-6" id="reviews">
        All Products {category ? `to (${category})` : ""}
      </h1>
      <Underline />
      <div className="w-full flex flex-row flex-wrap items-center justify-around p-2 md:p-16 gap-10">
        {productsTable.products?.map((item: Product, index: number) => (
          <div
            className="group flex items-center flex-col text-black bg-amber-400 rounded-lg pb-2"
            key={index}
          >
            <div className="w-80 flex justify-center items-center relative overflow-hidden ">
              <img
                className="w-80 bg-cover bg-center h-80 bg-no-repeat"
                src={item?.image[0]?.url}
                alt="image of product"
                loading="lazy"
              />

              <FaRegEye
                onClick={() => navigate(`/product/${item._id}`)}
                className="absolute right-4 top-4 text-amber-400 text-2xl"
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
            <h1>{truncate(item.title, 20)}</h1>
            <p>Price: {item.price} EGP</p>
            {item.discount > 0 && (
              <>
                <span>Discount: {item.discount}%</span>
                <span>Price After Discount: {item.priceAfterDiscount} EGP</span>
              </>
            )}

            <span>quantity: {item.stock}</span>
            <span>Category: ({item?.category})</span>
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        lastPage={productsTable.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
