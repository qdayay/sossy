import React from 'react';
import { motion } from 'framer-motion';
import { Bot, FileText, Image, Music, File } from 'lucide-react';
import type { NodeType } from '../types';

interface NodePreviewProps {
  type: NodeType;
  text: string;
  mediaUrl?: string;
  fileUrl?: string;
  progress?: number;
  aiInsights?: string[];
  position: { x: number; y: number };
}

export function NodePreview({
  type,
  text,
  mediaUrl,
  fileUrl,
  progress,
  aiInsights,
  position
}: NodePreviewProps) {
  const renderPreviewContent = () => {
    switch (type) {
      case 'text':
        return (
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600 line-clamp-2">{text}</p>
          </div>
        );

      case 'media':
        return mediaUrl ? (
          <div className="relative rounded-lg overflow-hidden h-32">
            <img
              src={mediaUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Image className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">No media attached</p>
          </div>
        );

      case 'audio':
        return (
          <div className="flex items-center space-x-2">
            <Music className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">Audio content</p>
          </div>
        );

      case 'file':
        return (
          <div className="flex items-center space-x-2">
            <File className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">
              {fileUrl ? 'File attached' : 'No file attached'}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="absolute z-50 bg-white rounded-lg shadow-lg p-4 w-64"
      style={{ left: position.x, top: position.y }}
    >
      <div className="space-y-3">
        {renderPreviewContent()}

        {progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-indigo-600 rounded-full h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {aiInsights && aiInsights.length > 0 && (
          <div className="flex items-start space-x-2">
            <Bot className="w-4 h-4 text-gray-500 mt-0.5" />
            <p className="text-sm text-gray-600">{aiInsights[0]}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}