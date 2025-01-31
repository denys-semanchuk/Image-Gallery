import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Image } from 'types';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { UploadModal } from '../UploadModal/UploadModal';
import { apiUrl } from 'constants/apiEndpoints';
import { DownloadButton } from '../DownloadButton/DownloadButton';
import { useGallery } from 'context/GalleryContext';
import useUploadHandler from 'hooks/useUploadHook';
import { DeleteConfirmModal } from '../DeleteConfirmModal/DeleteConfirmButton';
import { ClearGalleryModal } from '../ClearGalleryModal/ClearGalleryModal';
import './Gallery.css';
import { ImageSlider } from '../ImageSlider/ImageSlider';

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const imageUploadInputRef = React.useRef<HTMLInputElement>(null);

  const { setShowClearConfirm, handleClearGallery, showClearConfirm, deleteConfirm, setDeleteConfirm, sortOrder, setSortOrder, searchTerm, setSearchTerm, category, setCategory, images, setImages, showUploadModal, setShowUploadModal, uploadFile, setUploadFile
  } = useGallery();

  const handleFileSelect = (file: File) => {
    setUploadFile(file);
    setShowUploadModal(true);
  };

  const { handleUploadSubmit } = useUploadHandler()
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.imageId) {
      handleDelete(deleteConfirm.imageId);
      setDeleteConfirm({ show: false, imageId: null });
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  let sortedImages: Image[] | undefined;
  if (images.length > 0) {
    const filteredImages = images.filter(image => {
      if (!category && !searchTerm) return image;
      return (image.category.includes(category) && image.title.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    sortedImages = [...filteredImages].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }

  const handleDelete = (imageID: number) => {
    const tempImages = images.filter(image => image.id !== imageID);
    setImages(tempImages)
    const imageToDelete = images.find(image => image.id === imageID);
    if (imageToDelete) {
      fetch(`${apiUrl}/api/images/${imageID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageToDelete),
      })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/images`)
      .then(response => response.json())
      .then(data => {
        setImages(data)
      })
      .catch(error => console.error('Error fetching images:', error));
  }, [])

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
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="gallery__sort"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
      <ErrorBoundary>
        <div className="gallery__grid">
          {sortedImages && sortedImages.map((image) => (
            <div key={image.id} className="gallery__item" onClick={() => handleImageClick(image)}>
              <LazyLoadImage effect={'black-and-white'} className="gallery__image" src={`${apiUrl}${image.src}`} alt={image.title} placeholder={
                <div className="image-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              } />
              <DeleteButton onDelete={() => setDeleteConfirm({ show: true, imageId: image.id })} />
              <DownloadButton
                imageId={image.id}
              />
              <h4 className="gallery__title">{image.title}</h4>
            </div>
          ))}
          {!sortedImages && <p>No images uploaded</p>}
        </div>
      </ErrorBoundary>
      <div
        className={`modal-overlay ${selectedImage ? 'active' : ''}`}
        onClick={handleCloseModal}
      >
        {selectedImage && (
          <ImageSlider
            images={sortedImages!}
            currentImage={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
      {deleteConfirm.show && (
        <DeleteConfirmModal
          imageTitle={images.find(img => img.id === deleteConfirm.imageId)?.title || ''}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirm({ show: false, imageId: null })}
        />
      )}
      {showClearConfirm && (
        <ClearGalleryModal
          onConfirm={handleClearGallery}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </>
  )
};