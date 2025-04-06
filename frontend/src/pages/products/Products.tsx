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
        {productsTable.products?.length === 0
          ? "No Products"
          : category? `All Products ${category ? `to (${category})` : "No products to this category"}` : ""}
      </h1>
      <Underline />
      {productsTable.products?.length > 0 && (
        <>
          <div className="w-full flex flex-row flex-wrap items-center justify-around p-2 md:p-16 gap-10 text-black">
            {productsTable.products?.map((item: Product) => (
              <div
                className="flex items-center flex-col bg-amber-400 rounded-lg pb-2 min-w-72 group min-h-[470px]"
                key={item._id}
              >
                <div className="flex justify-center items-center relative overflow-hidden">
                  <img
                    className="w-72 h-80 bg-center bg-no-repeat object-cover"
                    src={item?.image && item?.image[0]?.url}
                    alt={item.title || "Product Image"}
                    loading="lazy"
                  />

                  <FaRegEye
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="absolute left-4 top-4 text-amber-400 text-2xl cursor-pointer"
                    aria-label="View Product"
                  />

                  <button
                    onClick={() => {
                      if (item.stock > 0) {
                        dispatch(cartAction.addToCart(item));
                        toast.success("Product has been added to the cart!");
                      } else {
                        toast.error("Out of stock, text me at whatsapp");
                      }
                    }}
                    className="absolute bottom-[-100%] w-full bg-black text-white p-2 transition-all duration-300 group-hover:bottom-0 flex items-center justify-center gap-2 text-xl"
                  >
                    <BsCartPlus /> <p>Add to Cart</p>
                  </button>
                </div>

                <h1 className="text-2xl">{truncate(item.title, 20)}</h1>
                <p className={`${item.discount && "line-through"} text-sm`}>
                  Price:{" "}
                  <span className="font-bold text-red-500">
                    {item.price} EGP
                  </span>
                </p>

                {item.discount > 0 && (
                  <>
                    <span className="text-sm ">
                      Discount:{" "}
                      <span className="font-bold text-green-500">
                        {item.discount}%
                      </span>
                    </span>
                    <span className="text-sm">
                      Price After Discount:{" "}
                      <span className="font-bold text-green-500">
                        {item.priceAfterDiscount} EGP
                      </span>
                    </span>
                  </>
                )}

                <span className="text-sm">
                  Quantity: <span className="font-bold">{item.stock}</span>
                </span>
                <span className="text-md">
                  Category: <span className="font-bold">({item.category})</span>
                </span>
              </div>
            ))}
          </div>
          <Pagination
            page={page}
            lastPage={productsTable.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
