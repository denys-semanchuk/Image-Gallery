import { Image } from "../types";

export const handleUpload = function (
  setImages: React.Dispatch<React.SetStateAction<Image[]>>
) {
  return async function (file: File) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      const newImage: Image = {
        id: Date.now(),
        src: data.url,
        title: file.name.split(".")[0],
        category: ["uncategorized"],
      };

      setImages((prevImages) => [...prevImages, newImage]);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };
};
