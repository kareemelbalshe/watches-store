import Input from "../../../../../components/input/Input";
import FileUpload from "../../../../../components/fileInput/FileInput";
import Button from "../../../../../components/button/Button";
import Loader from "../../../../../components/loader/loader";
import useEditCategoryLogic from "./edit_category_logic";

export default function EditCategory() {
  
  const { loading , handleSubmit, title, image, file ,navigate, setFile, setTitle } = useEditCategoryLogic();

  return (
    <div className="w-full flex items-center flex-col pb-2 md:pb-24 mb-20 md:mb-0">
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="w-[80%] flex flex-col gap-5 items-center"
      >
        <h1 className="text-4xl mt-6">Edit Category</h1>

        <Input
          label="Edit Category Name"
          placeholder="Category Name"
          value={title}
          setValue={setTitle}
          border="border-amber-400"
        />

        {(file || image) && (
          <img
            src={file ? URL.createObjectURL(file) : image!}
            alt="category image"
            className="w-[400px] h-[400px] object-cover bg-center bg-no-repeat"
          />
        )}

        <FileUpload setFile={setFile} />

        <div className="flex gap-5 items-center justify-center w-full flex-wrap">
          <Button text={loading ? "Updating..." : "Submit"} type="submit" disabled={loading} />
          <Button text="Back" onClick={() => navigate("/dashboard/category")} />
        </div>
      </form>
    </div>
  );
}
