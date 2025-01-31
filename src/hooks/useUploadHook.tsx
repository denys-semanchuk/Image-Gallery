import { Image } from "types";
import { handleUpload } from "utils/upload";
import { useGallery } from "context/GalleryContext";

export const useUploadHandler = () => {
  const { uploadFile, setImages, images, setShowUploadModal, setUploadFile } = useGallery()
  const handleUploadSubmit = ({ title, description, category }: { title: string; description: string; category: string }) => {
    if (!uploadFile) return;

    const newImage: Image = {
      id: Date.now(),
      title,
      description,
      src: URL.createObjectURL(uploadFile),
      category: category ? [category] : ["uncategorized"],
      createdAt: new Date()
    };

    setImages(images.concat([newImage]));
    handleUpload(uploadFile, newImage);
    setShowUploadModal(false);
    setUploadFile(null);
  };

  return { images, setImages, uploadFile, setUploadFile, setShowUploadModal, handleUploadSubmit };
};

export default useUploadHandler;