import React from 'react';
import './DeleteButton.css';
export const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
  <button className="delete-btn" onClick={onDelete}>
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
);