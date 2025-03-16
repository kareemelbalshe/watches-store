import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { useEffect, useState } from "react";
import { handleDeleteProduct, handleGetAllProducts } from "./redux/productSlice";
import AnyTable from "../../../components/table/anyTable";
import Pagination from "../../../components/table/pagination/Pagination";

export default function Product() {

  const { productsTable } = useSelector((state: RootState) => state.product);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setPage(productsTable?.currentPage);
  }, [productsTable]);

  useEffect(() => {
    dispatch(handleGetAllProducts({ page: page, limit: 10 }));
  }, [dispatch, page]);

  const handleDeleteOneClick = (productId: string) => {
    console.log(productId)
    dispatch(handleDeleteProduct(productId));
    dispatch(handleGetAllProducts({ page: page, limit: 10 }));
  };

  return (
    <div className="pl-[200px] lg:p-10 mb-40 flex flex-col gap-5 items-center w-full">
      <AnyTable
        del
        tbodys={productsTable?.products}
        titleHeader="Products"
        add
        linkAdd="/dashboard/product/add"
        thead={["Title", "Price", "Category", "Image",]}
        headerData={["title", "price", "category","image"]}
        edit
        linkEdit="/dashboard/product/edit"
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