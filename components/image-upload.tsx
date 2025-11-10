'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { storage } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './image-upload.css';

interface ImageUploadProps {
  onUploadSuccess?: (url: string) => void;
  folderPath?: string;
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string[];
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadSuccess,
  folderPath = 'images',
  maxFileSize = 5, // 5MB default
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  className = ''
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError(`Invalid file type. Accepted types: ${acceptedFileTypes.join(', ')}`);
      return;
    }

    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      setError(`File size exceeds ${maxFileSize}MB limit`);
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Create a storage reference
      const storageRef = ref(storage, `${folderPath}/${Date.now()}_${file.name}`);
      
      // Create an upload task
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Monitor upload progress
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          setError('Upload failed. Please try again.');
          setIsUploading(false);
        },
        async () => {
          // Upload completed successfully, now get the download URL
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setDownloadUrl(url);
            
            // Call the success callback if provided
            if (onUploadSuccess) {
              onUploadSuccess(url);
            }
            
            setIsUploading(false);
          } catch (error) {
            console.error('Error getting download URL:', error);
            setError('Failed to get download URL');
            setIsUploading(false);
          }
        }
      );
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('An error occurred while uploading the image');
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setDownloadUrl(null);
    setUploadProgress(0);
    setError(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`image-upload-container ${className}`}>
      <div className="upload-area" onClick={handleButtonClick}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes.join(',')}
          className="hidden-input"
        />
        
        {image ? (
          <div className="image-preview-container">
            <img 
              src={image} 
              alt="Preview" 
              className="preview-image"
            />
            <button 
              type="button" 
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">📁</div>
            <p>Click to upload an image</p>
            <p className="file-info">
              Accepted formats: {acceptedFileTypes.join(', ')} | Max size: {maxFileSize}MB
            </p>
          </div>
        )}
      </div>

      {isUploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(uploadProgress)}% uploaded</span>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {downloadUrl && !isUploading && (
        <div className="success-message">
          <p>Upload successful!</p>
          <a 
            href={downloadUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="download-link"
          >
            View Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;