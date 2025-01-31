import React from 'react';
import './DownloadButton.css';
import { apiUrl } from 'constants/apiEndpoints';

interface DownloadButtonProps {
  imageId: number;
}

export const DownloadButton = ({ imageId }: DownloadButtonProps) => {
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${apiUrl}/api/images/${imageId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, image/*'
        }
      });
  
      if (!response.ok) {
        throw new Error('Download failed');
      }

  
      const contentDisposition = response.headers.get('content-disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : `image-${imageId}`;
  
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
  
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <button className="download-btn" onClick={handleDownload}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
      </svg>
    </button>
  );
};