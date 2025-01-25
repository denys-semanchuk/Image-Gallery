import React, { useState } from 'react';
import './UploadModal.css';

interface UploadModalProps {
  imageFile: File | null;
  onSubmit: (data: { title: string; description: string, category: string }) => void;
  onClose: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ imageFile, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, category });
  };

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal-content">
        <button className="upload-modal-close" onClick={onClose}>&times;</button>

        <div className="upload-modal-body">
          {imageFile && (
            <div className="thumbnail">
              <img src={URL.createObjectURL(imageFile)} alt="Preview" />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="nature">Nature</option>
                <option value="people">People</option>
                <option value="architecture">Architecture</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Upload Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};