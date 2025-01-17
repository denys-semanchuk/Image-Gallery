import React, { useState } from 'react';
import { Image } from '../../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './Gallery.css';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { images as mockImages } from '../../utils/images';
import { handleUpload } from '../../utils/upload';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
export const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<Image[]>(mockImages);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

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

  return (
    <>
      <div className="container gallery">
        <ImageUpload onUpload={handleUpload(setImages)} />
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
              <LazyLoadImage effect={'black-and-white'} className="gallery__image" src={image.src} alt={image.title} placeholder={
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
            src={selectedImage.src}
            alt={selectedImage.title}
          />
        )}
      </div>
    </>
  )
};