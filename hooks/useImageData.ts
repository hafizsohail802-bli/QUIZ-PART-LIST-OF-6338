
import { useState } from 'react';

export const useImageData = () => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setImageData(null);
      return;
    }
    
    if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result as string);
      setError(null);
    };
    reader.onerror = () => {
        setError('Failed to read file.');
    }
    reader.readAsDataURL(file);
  };

  return { imageData, setImageData, error, handleFileChange };
};
