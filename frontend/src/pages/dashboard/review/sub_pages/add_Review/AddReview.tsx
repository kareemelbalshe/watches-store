import { toast } from "react-toastify";
import { handleCreateReview } from "../../redux/reviewSlice";
import FileUpload from "../../../../../components/fileInput/FileInput";
import Button from "../../../../../components/button/Button";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../lib/redux/store";
import Loader from "../../../../../components/loader/loader";

export default function AddReview() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { error, loading:sLoading } = useSelector((state: RootState) => state.review);
  const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      setLoading(sLoading);
    }, [sLoading]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!file) {
        toast.error("Please select an image");
        return;
      }
      await dispatch(handleCreateReview({ image: file })).unwrap();
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Review has been created successfully");
      setFile(null);
    },
    [file, dispatch, error]
  );
  return (
    <div className="w-full flex items-center flex-col pb-2 md:pb-24 mb-20 md:mb-0">
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className=" w-[80%] flex flex-col gap-5 items-center"
      >
        <h1 className="text-4xl mt-6">Add Review</h1>

        <FileUpload setFile={setFile} />
        {file && (
          <img
            src={(file && URL.createObjectURL(file)) || ""}
            alt="category image"
            className="w-[400px] h-[400px] object-cover bg-center bg-no-repeat"
          />
        )}
        <div className="flex gap-5 items-center justify-center w-full flex-wrap">
          <Button
            text={loading ? "Creating..." : "Submit"}
            type="submit"
            disabled={loading}
          />{" "}
          <Button text="Back" onClick={() => navigate("/dashboard/review")} />
        </div>
      </form>
    </div>
  );
}
