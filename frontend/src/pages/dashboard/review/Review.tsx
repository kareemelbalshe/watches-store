import AnyTable from "../../../components/table/anyTable";
import { useReview } from "./func/review_logic";

export default function Review() {
  const { reviews, handleDeleteOneClick } = useReview();

  return (
    <div className="mb-20 flex flex-col gap-5 w-full lg:items-center p-6">
      <AnyTable
        tbodys={reviews.map((review) => ({
          _id: review._id,
          img: (
            <img
              src={review.image?.url}
              className="w-12 h-12 object-cover rounded-full"
              loading="lazy"
            />
          ),
        }))}
        titleHeader="Reviews"
        add
        linkAdd="/dashboard/review/add"
        thead={["Image"]}
        headerData={["img"]}
        del
        handleDelete={handleDeleteOneClick}
      />
    </div>
  );
}
