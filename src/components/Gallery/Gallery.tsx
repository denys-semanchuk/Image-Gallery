import React, { useEffect, useState } from 'react';
import { Image } from '../../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './Gallery.css';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { UploadModal } from '../UploadModal/UploadModal';
import { handleUpload } from 'utils/upload';
import { apiUrl } from 'constants/apiEndpoints';

export const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const imageUploadInputRef = React.useRef<HTMLInputElement>(null);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setUploadFile(file);
    setShowUploadModal(true);
  };

  const handleUploadSubmit = ({ title, description, category }: { title: string; description: string; category: string }) => {
    if (!uploadFile) return;

    const newImage: Image = {
      id: Date.now(),
      title,
      description,
      src: URL.createObjectURL(uploadFile),
      category: category ? [category] : ["uncategorized"]
    };

    setImages(prev => [...prev, newImage]);
    handleUpload(uploadFile, newImage);
    setShowUploadModal(false);
    setUploadFile(null);
  };
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const filteredImages = images.filter(image => {
    if (!category && !searchTerm) return image;
    return (image.category.includes(category) && image.title.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleDelete = (imageID: number) => {
    const tempImages = images.filter(image => image.id !== imageID);
    setImages(tempImages)
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/images`)
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching images:', error));
  }, [images])

  return (
    <>
      <div className="container gallery">
        <button
          className="upload-button"
          onClick={() => imageUploadInputRef.current?.click()}
        >
          Add Image
        </button>
        <input
          ref={imageUploadInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        />
        {showUploadModal && (
          <UploadModal
            imageFile={uploadFile}
            onSubmit={handleUploadSubmit}
            onClose={() => setShowUploadModal(false)}
          />
        )}
        <div className="gallery__controls">
          <input
            className="gallery__input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select className="gallery__select" onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="nature">Nature</option>
            <option value="people">People</option>
            <option value="architecture">Architecture</option>
          </select>
        </div>
      </div>
      <ErrorBoundary>
        <div className="gallery__grid">
          {filteredImages.map((image) => (
            <div key={image.id} className="gallery__item" onClick={() => handleImageClick(image)}>
              <LazyLoadImage effect={'black-and-white'} className="gallery__image" src={`${apiUrl}${image.src}`} alt={image.title} placeholder={
                <div className="image-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              } />
              <DeleteButton onDelete={() => handleDelete(image.id)} />
              <h4 className="gallery__title">{image.title}</h4>
            </div>
          ))}
        </div>
      </ErrorBoundary>
      <div
        className={`modal-overlay ${selectedImage ? 'active' : ''}`}
        onClick={handleCloseModal}
      >
        {selectedImage && (
          <img
            className="modal-image"
            src={`${apiUrl}${selectedImage.src}`}
            alt={selectedImage.title}
          />
        )}
      </div>
    </>
  )
};