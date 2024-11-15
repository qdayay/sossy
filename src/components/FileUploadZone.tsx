import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
}

export function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />
      
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 border-4 border-dashed
          border-indigo-300 bg-indigo-50/20 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          <Upload className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-indigo-600">
            Drop files here to create nodes
          </p>
          <p className="text-sm text-indigo-400">
            Supports images, PDFs, and audio files
          </p>
        </div>
      </motion.div>
    </>
  );
}