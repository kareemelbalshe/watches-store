import AnyTable from "../../../components/table/anyTable";
import Pagination from "../../../components/table/pagination/Pagination";
import { useCart } from "./func/cart_logic";

export default function DashboardCart() {
  const { cartTable, page, setPage, handleDeleteOneClick } = useCart();

  return (
    <div className="mb-20 flex flex-col gap-5 items-stretch lg:items-center w-full p-6">
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
        lastPage={cartTable?.totalPages as number}
      />
    </div>
  );
}
