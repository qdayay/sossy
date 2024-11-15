import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Youtube } from 'lucide-react';

interface MediaUploaderProps {
  onFileSelect: (files: FileList) => void;
  onUrlAdd: (url: string) => void;
}

export function MediaUploader({ onFileSelect, onUrlAdd }: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [url, setUrl] = useState('');

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      onFileSelect(e.dataTransfer.files);
    },
    [onFileSelect]
  );

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlAdd(url.trim());
      setUrl('');
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <div className="flex flex-col items-center space-y-2">
          <Upload className={`w-8 h-8 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} />
          <div className="text-sm text-gray-600">
            <label className="text-indigo-600 hover:text-indigo-700 cursor-pointer">
              Choose files
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => e.target.files && onFileSelect(e.target.files)}
                className="hidden"
              />
            </label>
            <span className="mx-1">or drag them here</span>
          </div>
          <p className="text-xs text-gray-500">
            Supports images (PNG, JPG) and videos (MP4, WebM)
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Youtube className="h-5 w-5 text-gray-400" />
        </div>
        <form onSubmit={handleUrlSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube or video URL..."
            className="block w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 
              focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 py-2 bg-indigo-600 text-white 
              rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}