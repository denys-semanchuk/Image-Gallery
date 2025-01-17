import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'ImageWithFallback.css'

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageProps> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const fallbackImage = '../../../public/fallback.jpg';

  const handleError = () => {
    setError(true);
  };

  return (
    <>
      {error ? (
        <div className="error-container">
          <LazyLoadImage
            className={className}
            src={fallbackImage}
            alt="Image not found"
            onError={handleError}
          />
          <span className="error-message">Image failed to load</span>
        </div>
      ) : (
        <LazyLoadImage
          className={className}
          src={src}
          alt={alt}
          onError={handleError}
          effect="blur"
        />
      )}
    </>
  );
};