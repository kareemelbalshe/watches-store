import AnyTable from "../../../components/table/anyTable";
import { useCategory } from "./func/category_logic";

export default function Category() {
  
  const { categories, handleDeleteOneClick } = useCategory();
  return (
    <div className="mb-20 flex flex-col gap-5 items-baseline lg:items-center w-full p-6">
      <AnyTable
        tbodys={categories.map((category) => ({
          _id: category._id,
          title: category.title,
          img: (
            <img
              src={category.image?.url}
              alt={category.title}
              className="w-12 h-12 object-cover rounded-full"
              loading="lazy"
            />
          ),
        }))}
        titleHeader="Categories"
        add
        linkAdd="/dashboard/category/add"
        thead={["Title", "Image"]}
        headerData={["title", "img"]}
        edit
        linkEdit="/dashboard/category/edit"
        del
        handleDelete={handleDeleteOneClick}
      />
    </div>
  );
}
