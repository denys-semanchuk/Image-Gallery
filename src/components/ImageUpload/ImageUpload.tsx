import React, { useState, ChangeEvent } from 'react';
import './ImageUpload.css';

export const ImageUpload = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="upload">
      <div className="upload__container">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="upload__input"
        />
        {preview ? (
          <div className="upload__preview">
            <img src={preview} alt="Preview" />
          </div>
        ) : (
          <div className="upload__placeholder">
            <span>Upload the images</span>
          </div>
        )}
      </div>
      {error && <div className="upload__error">{error}</div>}
      {preview && (
        <button className="upload__button" onClick={handleUpload}>
          Upload Image
        </button>
      )}
    </div>
  );
};