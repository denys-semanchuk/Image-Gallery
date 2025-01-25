import { apiUrl } from "constants/apiEndpoints";
import { Image } from "types";

export const handleUpload = async function (file: File, newImage: Image) {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", newImage.title);
    formData.append("description", newImage.description);
    formData.append("category", JSON.stringify(newImage.category));
    const response = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();

    const newImageFetched: any = {
      id: Date.now(),
      src: data.url,
      title: file.name.split(".")[0],
      category: ["uncategorized"],
    };
    return newImageFetched;
  } catch (error) {
    console.error("Error uploading:", error);
  }
};
