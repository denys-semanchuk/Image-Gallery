import React from 'react';
import './ClearGalleryModal.css';

interface ClearGalleryModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ClearGalleryModal: React.FC<ClearGalleryModalProps> = ({
  onConfirm,
  onCancel,
}) => (
  <div className="clear-modal-overlay">
    <div className="clear-modal">
      <h3>Clear Gallery</h3>
      <p>Are you sure you want to delete all images?</p>
      <div className="clear-modal__buttons">
        <button 
          className="clear-modal__button clear-modal__button--cancel" 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="clear-modal__button clear-modal__button--confirm" 
          onClick={onConfirm}
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
);