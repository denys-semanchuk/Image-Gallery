import React, { useState, useEffect } from 'react';
import { Image } from '../../types';
import './ImageSlider.css';
import { apiUrl } from './../../constants/apiEndpoints';

interface ImageSliderProps {
  images: Image[];
  currentImage: Image;
  onClose: () => void;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, currentImage, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(images.findIndex(img => img.id === currentImage.id));

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="slider-overlay" onClick={onClose}>
      <div className="slider" onClick={e => e.stopPropagation()}>
        <button className="slider__close" onClick={onClose}>&times;</button>
        <button className="slider__nav slider__nav--prev" onClick={handlePrev}>‹</button>
        <div className="slider__content">
          <img src={`${apiUrl}${images[currentIndex].src}`} alt={images[currentIndex].title} />
        </div>
        <button className="slider__nav slider__nav--next" onClick={handleNext}>›</button>
      </div>
    </div>
  );
};