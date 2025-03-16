import { useProductDetails } from "./func/product_details_logic";

export default function ProductDetails() {
  const { product, hoveredIndex, position, handleMouseMove, handleMouseLeave } =
    useProductDetails();

  return (
    <div className="w-full shadow-lg p-6 pb-28 space-y-10">
      <h1 className="text-3xl font-bold text-center text-black dark:text-white">
        {product?.title}
      </h1>

      <div className="flex flex-wrap justify-center gap-4">
        {product?.image?.map(
          (img: { url: string; publicId: string }, index: number) => (
            <div
              key={index}
              className="w-80 h-80 overflow-hidden rounded-lg border bg-no-repeat border-amber-400 shadow-md relative"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: hoveredIndex === index ? "200%" : "100%",
                backgroundPosition:
                  hoveredIndex === index
                    ? `${position.x}% ${position.y}%`
                    : "center",
                transition: "background-size 0.3s ease",
              }}
            />
          )
        )}
      </div>

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
      </div>
    </div>
  );
}
