import React from 'react';
import './DeleteConfirmModal.css';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  imageTitle: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  onConfirm,
  onCancel,
  imageTitle
}) => (
  <div className="delete-modal-overlay">
    <div className="delete-modal">
      <h3>Delete Confirmation</h3>
      <p>Are you sure you want to delete "{imageTitle}"?</p>
      <div className="delete-modal__buttons">
        <button className="delete-modal__button delete-modal__button--cancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="delete-modal__button delete-modal__button--confirm" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </div>
);