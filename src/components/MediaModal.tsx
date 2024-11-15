import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MediaPreview } from './MediaPreview';
import { MediaUploader } from './MediaUploader';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (media: Array<{ url: string; type: 'image' | 'video' }>) => void;
  initialMedia?: Array<{ url: string; type: 'image' | 'video' }>;
}

export function MediaModal({ isOpen, onClose, onSave, initialMedia = [] }: MediaModalProps) {
  const [mediaFiles, setMediaFiles] = useState(initialMedia);

  const handleFileSelect = (files: FileList) => {
    const newMedia = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    setMediaFiles(prev => [...prev, ...newMedia]);
  };

  const handleUrlAdd = (url: string) => {
    // Convert YouTube URL to embed format if needed
    let processedUrl = url;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      processedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      processedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    
    setMediaFiles(prev => [...prev, { url: processedUrl, type: 'video' as const }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Media Content</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <MediaUploader
                  onFileSelect={handleFileSelect}
                  onUrlAdd={handleUrlAdd}
                />

                {mediaFiles.length > 0 && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
                    <MediaPreview files={mediaFiles} />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onSave(mediaFiles);
                    onClose();
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}