'use client';

import React, { useState } from 'react';
import ImageUpload from '../../components/image-upload';

const UploadDemoPage = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleUploadSuccess = (url: string) => {
    console.log('Image uploaded successfully:', url);
    setUploadedImageUrl(url);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Image Upload Demo</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>
        <ImageUpload 
          onUploadSuccess={handleUploadSuccess}
          folderPath="demo-images"
          maxFileSize={5}
          acceptedFileTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
        />
      </div>

      {uploadedImageUrl && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Uploaded Image</h2>
          <div className="border rounded p-4">
            <img 
              src={uploadedImageUrl} 
              alt="Uploaded" 
              className="max-w-full h-auto rounded"
            />
            <p className="mt-2 text-sm text-gray-600 break-all">
              Image URL: {uploadedImageUrl}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDemoPage;