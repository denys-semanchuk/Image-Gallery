import React, { useState } from 'react';
import { Image } from '../../types';

import './Gallery.css';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { images as mockImages } from '../../utils/images';
import { saveImageToPublic } from '../../utils/images';
export const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<Image[]>(mockImages);

  const filteredImages = images.filter(image => {
    if (!category && !searchTerm) return image;
    return (image.category.includes(category) && image.title.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleDelete = (imageID: number) => {
    const tempImages = images.filter(image => image.id !== imageID);
    setImages(tempImages)
  };



  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();

      const newImage: Image = {
        id: Date.now(),
        src: data.url,
        title: file.name.split('.')[0],
        category: ['uncategorized']
      };

      setImages(prevImages => [...prevImages, newImage]);
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };

  return (
    <>
      <div className="container gallery">
        <ImageUpload onUpload={handleUpload} />
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

      <div className="gallery__grid">
        {filteredImages.map((image) => (
          <div key={image.id} className="gallery__item">
            <img className="gallery__image" src={image.src} alt={image.title} />
            <DeleteButton onDelete={() => handleDelete(image.id)} />
            <h4 className="gallery__title">{image.title}</h4>
          </div>
        ))}
      </div>
    </>
  )
};