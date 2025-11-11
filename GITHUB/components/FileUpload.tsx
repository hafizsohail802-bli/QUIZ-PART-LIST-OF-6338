
import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string; // e.g., ".xlsx, .xls, .csv"
  maxSizeMB: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, acceptedTypes, maxSizeMB }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (files: FileList | null) => {
    setError(null);
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeMB}MB`);
        return;
      }
      onFileSelect(file);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  return (
    <div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex justify-center items-center w-full px-6 py-10 border-2 border-dashed rounded-lg transition-colors duration-300
          ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'}`}
      >
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Drag & Drop file here or{' '}
            <label htmlFor="file-upload" className="font-medium text-primary-600 hover:text-primary-500 cursor-pointer">
              Browse Files
            </label>
          </p>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept={acceptedTypes} onChange={(e) => handleFileChange(e.target.files)} />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Accepted: {acceptedTypes}. Max size: {maxSizeMB}MB
          </p>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;
