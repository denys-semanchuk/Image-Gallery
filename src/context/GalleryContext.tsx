import { Image } from "types";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

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

  return (
    <GalleryContext.Provider value={{
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
      setUploadFile
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