import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Music, File, Bot } from 'lucide-react';
import type { NodeType } from '../types';

interface NodeContentProps {
  type: NodeType;
  mediaUrl?: string;
  fileUrl?: string;
  progress?: number;
  aiInsights?: string[];
  isPreview?: boolean;
}

export function NodeContent({ 
  type, 
  mediaUrl, 
  fileUrl, 
  progress, 
  aiInsights,
  isPreview 
}: NodeContentProps) {
  const renderContent = () => {
    switch (type) {
      case 'text':
        return (
          <div className="prose prose-sm text-white/90">
            <textarea
              className="w-full bg-white/10 rounded-lg p-3 resize-none"
              placeholder="Enter your text..."
              rows={4}
            />
          </div>
        );

      case 'media':
        return mediaUrl ? (
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={mediaUrl}
              alt="Media content"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 bg-white/10 rounded-lg">
            <Image className="w-8 h-8 text-white/40" />
          </div>
        );

      case 'audio':
        return (
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Music className="w-6 h-6 text-white/80" />
              <div className="flex-1">
                <div className="h-1 bg-white/20 rounded-full">
                  <div className="h-full w-1/3 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'file':
        return (
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <File className="w-6 h-6 text-white/80" />
              <div className="flex-1">
                <p className="text-sm text-white/90">document.pdf</p>
                <p className="text-xs text-white/60">1.2 MB</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={isPreview ? {} : { opacity: 0, y: 10 }}
      animate={isPreview ? {} : { opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {renderContent()}

      {progress !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-white/80">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1.5">
            <motion.div
              className="bg-white rounded-full h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {aiInsights && aiInsights.length > 0 && (
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Bot className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/80">AI Insights</span>
          </div>
          <p className="text-sm text-white/90">{aiInsights[0]}</p>
        </div>
      )}
    </motion.div>
  );
}