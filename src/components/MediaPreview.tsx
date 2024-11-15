import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Play, Pause } from 'lucide-react';
import ReactPlayer from 'react-player';

interface MediaPreviewProps {
  files: Array<{ url: string; type: 'image' | 'video' }>;
  onExpand?: () => void;
}

export function MediaPreview({ files, onExpand }: MediaPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentFile = files[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % files.length);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + files.length) % files.length);
    setIsPlaying(false);
  };

  const isYouTube = currentFile?.url.includes('youtube.com/embed/');

  const renderMedia = () => {
    if (currentFile.type === 'image') {
      return (
        <img
          src={currentFile.url}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      );
    }

    if (isYouTube) {
      return (
        <div className="relative w-full h-full">
          <ReactPlayer
            url={currentFile.url}
            width="100%"
            height="100%"
            playing={isPlaying}
            controls={true}
            onEnded={() => setIsPlaying(false)}
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              }
            }}
          />
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        <ReactPlayer
          url={currentFile.url}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={false}
          onEnded={() => setIsPlaying(false)}
        />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center bg-black/20 
            hover:bg-black/30 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-12 h-12 text-white" />
          ) : (
            <Play className="w-12 h-12 text-white" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
      <div className="absolute inset-0">{renderMedia()}</div>

      {files.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
          flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full 
          px-3 py-1.5 shadow-sm z-10"
        >
          <button
            onClick={handlePrevious}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium">
            {currentIndex + 1} / {files.length}
          </span>
          <button
            onClick={handleNext}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {!isYouTube && (
        <button
          onClick={onExpand}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 
            backdrop-blur-sm shadow-sm hover:bg-white transition-colors z-10"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}