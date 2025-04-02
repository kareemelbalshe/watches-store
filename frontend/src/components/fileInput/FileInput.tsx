import { RiUploadCloud2Line } from "react-icons/ri";

export default function FileUpload({
  setFile,
}: {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="w-fit p-4 border rounded-lg">
      <input
        type="file"
        className="hidden"
        id="file"
        onChange={handleFileUpload}
        accept="image/*"
      />
      <label
        htmlFor="file"
        className="block text-center bg-amber-400 p-2 rounded-md cursor-pointer"
      >
        <RiUploadCloud2Line className="text-4xl" />
      </label>
    </div>
  );
}
