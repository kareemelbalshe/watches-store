import { cartAction } from "../../lib/redux/slices/cart-slice";
import { useProductDetails } from "./func/product_details_logic";

export default function ProductDetails() {
  const {
    product,
    hoveredIndex,
    position,
    image,
    setImage,
    handleMouseMove,
    handleMouseLeave,
    dispatch,
    toast,
  } = useProductDetails();

  return (
    <div className="w-full shadow-lg p-6 pb-28 space-y-10">
      <h1 className="text-3xl font-bold text-center text-black dark:text-white">
        {product?.title}
      </h1>

      {product?.image ? (
        <div className="flex flex-wrap items-center justify-center gap-20">
          <div className="flex flex-wrap flex-col gap-5 h-[500px] ">
            {product.image.map((img, index) => (
              <div
                key={index}
                onClick={() => setImage(img.url)}
                className="w-32 h-32 overflow-hidden rounded-lg border bg-no-repeat border-amber-400 shadow-md relative cursor-pointer"
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div
            className="w-[500px] h-[500px] overflow-hidden rounded-lg border bg-no-repeat border-amber-400 shadow-md relative"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: hoveredIndex ? "250%" : "100%",
              backgroundPosition: hoveredIndex
                ? `${position.x}% ${position.y}%`
                : "center",
              transition: "background-size 0.3s ease",
            }}
          />
        </div>
      ) : (
        <p className="text-center">No images available</p>
      )}

      <p className="text-center text-lg">{product?.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center text-black dark:text-white">
        <p className="bg-amber-400 text-black font-semibold rounded-lg p-2 shadow-md">
          Views: {product?.views}
        </p>
        <p className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 shadow-md">
          Category: {product?.category}
        </p>
        <p className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 shadow-md">
          Sales: {product?.sales}
        </p>
        <p className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 shadow-md">
          Last 24h Sales: {product?.salesLast24h}
        </p>
        <p className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 shadow-md">
          Price: {product?.price} EGP
        </p>
        <p className="bg-red-500 text-white font-semibold rounded-lg p-2 shadow-md">
          Discount: {product?.discount}%
        </p>
        <p className="bg-green-500 text-white font-semibold rounded-lg p-2 shadow-md">
          Final Price: {product?.priceAfterDiscount} EGP
        </p>
        <p
          onClick={() => {
            if (product.stock > 0) {
              dispatch(cartAction.addToCart(product));
              toast.success("Product has been added to the cart!");
            } else {
              toast.error("Out of stock, text me at whatsapp");
            }
          }}
          className="bg-black text-white font-semibold rounded-lg p-2 shadow-md cursor-pointer"
        >
          Add to cart
        </p>
      </div>
    </div>
  );
}
