import Button from "../../../../../components/button/Button";
import FileUpload from "../../../../../components/fileInput/FileInput";
import Input from "../../../../../components/input/Input";
import Loader from "../../../../../components/loader/loader";
import useAddCategoryLogic from "./add_category_logic";

export default function AddCategory() {
  const { title, file, loading, handleSubmit, setFile, setTitle, navigate } =
    useAddCategoryLogic();

  return (
    <div className="w-full flex items-center flex-col pb-2 md:pb-24 mb-20 md:mb-0">
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className=" w-[80%] flex flex-col gap-5 items-center"
      >
        <h1 className="text-4xl mt-6">Add Category</h1>
        <Input
          label="Category Name"
          placeholder="Enter Category Name"
          value={title}
          setValue={setTitle}
          border="border-amber-400"
        />
        {file && (
          <img
            src={(file && URL.createObjectURL(file)) || ""}
            alt="category image"
            className="w-[400px] h-[400px] object-cover bg-center bg-no-repeat"
          />
        )}
        <FileUpload setFile={setFile} />
        <div className="flex gap-5 items-center justify-center w-full flex-wrap">
          <Button
            text={loading ? "Creating..." : "Submit"}
            type="submit"
            disabled={loading}
          />{" "}
          <Button text="Back" onClick={() => navigate("/dashboard/category")} />
        </div>
      </form>
    </div>
  );
}
