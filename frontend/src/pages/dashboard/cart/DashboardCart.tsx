import { useDispatch, useSelector } from "react-redux";
import AnyTable from "../../../components/table/anyTable";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { useEffect, useState } from "react";
import { handleGetAllCarts, handleRemoveCart } from "./redux/cartSlice";
import Pagination from "../../../components/table/pagination/Pagination";
import { toast } from "react-toastify";

export default function DashboardCart() {
  const { cartTable } = useSelector((state: RootState) => state.cart);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setPage(cartTable?.currentPage);
  }, [cartTable]);

  useEffect(() => {
    dispatch(handleGetAllCarts({ page: page, limit: 10 }));
  }, [dispatch, page]);

  const handleDeleteOneClick = (cartId: string) => {
    dispatch(handleRemoveCart(cartId));
    dispatch(handleGetAllCarts({ page: page, limit: 10 }));
    toast.success("Cart has been deleted successfully");
  };

  return (
    <div className="pl-[200px] lg:p-10 mb-40 flex flex-col gap-5 items-center w-full">
      <AnyTable
        del
        tbodys={cartTable?.carts}
        titleHeader="Carts"
        thead={["Name", "Email", "Phone", "Total Price"]}
        headerData={["firstName", "email", "phone", "totalPrice"]}
        view
        linkView="/dashboard/cart"
        handleDelete={handleDeleteOneClick}
      />
      <Pagination
        page={page}
        onPageChange={setPage}
        lastPage={cartTable?.totalPages}
      />
    </div>
  );
}
