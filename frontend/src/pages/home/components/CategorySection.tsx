import { motion } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Category } from "../../../lib/types/types";
const CategorySection = memo(function CategorySection({
  categories,
  isDarkMode,
}: {
  categories: Category[];
  isDarkMode: boolean;
}) {
  return (
    <div className="w-full flex flex-row flex-wrap my-10 items-center justify-between">
      <div className="h-screen">ad</div>
      <motion.div
        className="mx-auto flex flex-row flex-wrap justify-center gap-6 w-1/2 p-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {categories.map((category, index) => (
          <Link to={`/products/${category.title}`} key={category._id}>
            <motion.div
              className={`flex flex-col items-center w-52 border shadow-lg group ${
                isDarkMode
                  ? "bg-black border-gray-200"
                  : "bg-white border-gray-800"
              }
                hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={category.image?.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1"
                  loading="lazy"
                />
              </div>
              <h1 className="text-2xl font-semibold my-2">{category.title}</h1>
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <div className="h-screen">ad</div>
    </div>
  );
});
export default CategorySection;
