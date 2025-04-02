import AnyTable from "../../../components/table/anyTable";
import Pagination from "../../../components/table/pagination/Pagination";
import { useProducts } from "./func/product_logic";

export default function Product() {
  const { productsTable, page, setPage, handleDeleteOneClick } = useProducts();

  return (
    <div className="mb-20 flex flex-col gap-5 items-baseline lg:items-center w-full p-6">
      <AnyTable
        tbodys={productsTable?.products}
        titleHeader="Products"
        add
        linkAdd="/dashboard/product/add"
        thead={["Title", "Price", "Category", "Image"]}
        headerData={["title", "price", "category", "image"]}
        edit
        linkEdit="/dashboard/product/edit"
        del
        handleDelete={handleDeleteOneClick}
      />
      <Pagination
        page={page}
        onPageChange={setPage}
        lastPage={productsTable?.totalPages}
      />
    </div>
  );
}
