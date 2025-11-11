import React, { useState, useEffect } from 'react';
import { useImageData } from '../../hooks/useImageData';

interface ImageUploadProps {
  onImageUrlChange: (url: string) => void;
  initialImageUrl?: string;
  label: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUrlChange, initialImageUrl, label }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || '');
  const { imageData, handleFileChange, error } = useImageData();

  useEffect(() => {
    if (initialImageUrl) {
      setImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);
  
  useEffect(() => {
    if (imageData) {
      setImageUrl(imageData);
      onImageUrlChange(imageData);
    }
  }, [imageData, onImageUrlChange]);

  const handleUrlPaste = (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;
      setImageUrl(url);
      onImageUrlChange(url);
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files.length > 0) {
          handleFileChange(e.target.files[0]);
      }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="mt-1 flex items-center space-x-4">
        <div className="flex-shrink-0 h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No Image</span>
          )}
        </div>
        <div className="flex-grow space-y-2">
            <input
                type="text"
                placeholder="Paste image URL here"
                value={imageUrl}
                onChange={handleUrlPaste}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor={`file-upload-${label}`} className="w-full text-center cursor-pointer bg-white dark:bg-gray-800 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 block">
                <span>Or Upload File</span>
                <input id={`file-upload-${label}`} name={`file-upload-${label}`} type="file" className="sr-only" onChange={handleFileSelect} accept="image/*" />
            </label>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;