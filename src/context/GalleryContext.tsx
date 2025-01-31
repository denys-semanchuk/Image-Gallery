import { Image } from "types";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { apiUrl } from "constants/apiEndpoints";

interface GalleryContextType {
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  category: string;
  setCategory: (category: string) => void;
  images: Image[];
  setImages: Dispatch<SetStateAction<Image[]>>;
  selectedImage: Image | null;
  setSelectedImage: (image: Image | null) => void;
  showUploadModal: boolean;
  setShowUploadModal: (show: boolean) => void;
  uploadFile: File | null;
  setUploadFile: (file: File | null) => void;
  deleteConfirm: { show: boolean; imageId: number | null },
  setDeleteConfirm: Dispatch<SetStateAction<{ show: boolean; imageId: number | null }>>,
  showClearConfirm: boolean;
  setShowClearConfirm: (show: boolean) => void;
  handleClearGallery: () => void;
}

const GalleryContext = createContext<GalleryContextType | null>(null);
export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; imageId: number | null }>({
    show: false,
    imageId: null
  });
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearGallery = async () => {
    try {
      await fetch(`${apiUrl}/api/images/clear`, {
        method: 'DELETE',
      });
      setImages([]);
      setShowClearConfirm(false);
    } catch (error) {
      console.error('Error clearing gallery:', error);
    }
  };

  return (
    <GalleryContext.Provider value={{
      deleteConfirm, setDeleteConfirm,
      sortOrder,
      setSortOrder,
      searchTerm,
      setSearchTerm,
      category,
      setCategory,
      images,
      setImages,
      selectedImage,
      setSelectedImage,
      showUploadModal,
      setShowUploadModal,
      uploadFile,
      setUploadFile,
      showClearConfirm, setShowClearConfirm,
      handleClearGallery
    }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within GalleryProvider');
  }
  return context;
};