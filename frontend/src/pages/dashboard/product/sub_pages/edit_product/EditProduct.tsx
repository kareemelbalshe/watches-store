import Input from "../../../../../components/input/Input";
import Loader from "../../../../../components/loader/loader";
import FileUpload from "../../../../../components/fileInput/FileInput";
import Button from "../../../../../components/button/Button";
import useEditProductLogic from "./edit_product_logic";

export default function EditProduct() {
  const {
    product,
    title,
    file,
    loading,
    handleSubmit,
    setFile,
    setTitle,
    navigate,
    handleChange,
    categories,
    description,
    setDescription,
    category,
    discount,
    setDiscount,
    stock,
    setStock,
    price,
    setPrice,
    addImage,
    setAddImage,
    handleAddImage,
    handleDeleteImage,
  } = useEditProductLogic();

  return (
    <div className="w-full flex items-center flex-col pb-2 md:pb-24 mb-20 md:mb-0">
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="w-[80%] flex flex-col gap-5 items-center"
      >
        <h1 className="text-4xl mt-6">Add Product</h1>

        {product?.image?.map((img) => (
          <div
            key={img.publicId}
            className="flex gap-5 items-center justify-center w-full flex-wrap"
          >
            <img
              src={img.url}
              alt="category image"
              className="w-[400px] h-[400px] object-cover bg-center bg-no-repeat"
              loading="lazy"
            />
            <Button
              text="Delete Image"
              onClick={() => handleDeleteImage(img.publicId)}
            />
          </div>
        ))}

        {!addImage && (
          <Button
            text="Add Image"
            onClick={() => setAddImage(true)}
            width="w-fit"
          />
        )}

        {addImage && (
          <div className="flex gap-5 items-center justify-center w-full flex-wrap">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="category image"
                className="w-[400px] h-[400px] object-cover bg-center bg-no-repeat"
              />
            )}
            <FileUpload setFile={setFile} />
            <Button text="Submit" onClick={handleAddImage} />
          </div>
        )}

        <Input
          label="Product Name"
          placeholder="Enter Product Name"
          value={title}
          setValue={setTitle}
          border="border-amber-400"
          required
        />
        <Input
          label="Product Description"
          placeholder="Enter Product Description"
          value={description}
          setValue={setDescription}
          border="border-amber-400"
          required
        />
        <Input
          label="Product Price"
          placeholder="Enter Product Price"
          value={price}
          setValue={setPrice}
          border="border-amber-400"
          required
        />
        <Input
          label="Product Discount"
          placeholder="Enter Product Discount"
          value={discount}
          setValue={setDiscount}
          border="border-amber-400"
        />
        <Input
          label="Product Quantity"
          placeholder="Enter Product Quantity"
          value={stock}
          setValue={setStock}
          border="border-amber-400"
          required
        />

        <select
          required
          name="category"
          id="category"
          className="border-amber-400 border-4 rounded-lg p-2 bg-inherit w-full outline-none"
          onChange={handleChange}
          value={category}
        >
          {categories.map((cat) => (
            <option
              className="bg-amber-400 text-black"
              key={cat._id}
              value={cat.title}
            >
              {cat.title}
            </option>
          ))}
        </select>

        <div className="flex gap-5 items-center justify-center w-full flex-wrap">
          <Button
            text={loading ? "Updating..." : "Update"}
            type="submit"
            disabled={loading}
          />
          <Button text="Back" onClick={() => navigate("/dashboard/product")} />
        </div>
      </form>
    </div>
  );
}
