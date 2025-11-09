'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface UploadPhotoProps {
  onUploadComplete: (photoUrl: string) => void;
  onUploadProgress?: (progress: number) => void;
  allowedTypes?: string[];
  maxSize?: number; // in MB
}

export default function UploadPhoto({ 
  onUploadComplete, 
  onUploadProgress,
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxSize = 10 // 10MB default
}: UploadPhotoProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(`Tipe file tidak didukung. Format yang didukung: ${allowedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      setError(`File terlalu besar. Maksimal ukuran file: ${maxSize}MB`);
      return;
    }

    setError(null);
    setSelectedFile(file);
    
    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    
    if (file) {
      // Create a synthetic event to trigger file validation
      const event = {
        target: {
          files: [file]
        }
      } as unknown as ChangeEvent<HTMLInputElement>;
      
      handleFileChange(event);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create form data to send to API
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);

      // Make the actual upload request
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(interval);
      setUploadProgress(100);

      const result = await response.json();

      if (result.success) {
        onUploadComplete(result.url);
      } else {
        setError(result.error || 'Gagal mengunggah foto. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Gagal mengunggah foto. Silakan coba lagi.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Upload Foto
        </CardTitle>
        <CardDescription>Unggah foto kenanganmu untuk ditambahkan ke galeri</CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            error ? 'border-red-500 bg-red-50/50 dark:bg-red-900/20' : 
            'border-gray-300 hover:border-pink-400 dark:border-gray-600 dark:hover:border-pink-400'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={allowedTypes.join(',')}
            onChange={handleFileChange}
          />
          
          <AnimatePresence mode="wait">
            {!previewUrl ? (
              <motion.div
                key="upload-area"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center"
              >
                <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Tarik & lepas foto di sini, atau klik untuk memilih
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Format yang didukung: JPG, PNG, WEBP (Maks. {maxSize}MB)
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative"
              >
                <div className="relative inline-block">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-60 mx-auto rounded-lg object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 rounded-full w-8 h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {selectedFile?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(selectedFile?.size! / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
            {error}
          </div>
        )}

        {isUploading && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {!isUploading && previewUrl && (
          <div className="flex justify-end space-x-3 mt-4">
            <Button 
              variant="outline" 
              onClick={handleRemoveFile}
              disabled={isUploading}
            >
              Batal
            </Button>
            <Button 
              onClick={handleUpload}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              disabled={isUploading}
            >
              {isUploading ? 'Mengunggah...' : 'Unggah Foto'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}