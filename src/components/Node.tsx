import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, MessageSquare, Bot } from 'lucide-react';
import { NodeEditModal } from './NodeEditModal';
import { MediaModal } from './MediaModal';
import { MediaPreview } from './MediaPreview';
import { AIChat } from './AIChat';
import type { Node as NodeType } from '../types';

interface NodeProps extends NodeType {
  onDragEnd: (id: string, x: number, y: number) => void;
  onUpdate: (id: string, updates: Partial<NodeType>) => void;
}

export function Node({ 
  id, 
  text, 
  x, 
  y, 
  color, 
  type, 
  progress, 
  comments, 
  aiInsights, 
  mediaFiles = [],
  content,
  onDragEnd,
  onUpdate 
}: NodeProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleDragEnd = (_: never, info: any) => {
    const newX = Math.round(info.point.x / 20) * 20;
    const newY = Math.round(info.point.y / 20) * 20;
    onDragEnd(id, newX, newY);
  };

  const getNodeIcon = () => {
    switch (type) {
      case 'text': return '📝';
      case 'media': return '🎬';
      case 'audio': return '🎵';
      case 'file': return '📎';
      case 'task': return '✓';
      default: return '📝';
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'media':
        return mediaFiles.length > 0 ? (
          <div className="mt-2">
            <MediaPreview files={mediaFiles} />
          </div>
        ) : (
          <div className="mt-2 p-4 bg-gray-50 rounded-lg text-center text-gray-500 text-sm">
            Click edit to add media content
          </div>
        );
      
      case 'text':
        return (
          <div className="mt-2 prose prose-sm max-w-none text-white/90"
            dangerouslySetInnerHTML={{ __html: content || text }}
          />
        );
      
      default:
        return <p className="mt-2 text-white/90">{text}</p>;
    }
  };

  const handleEdit = () => {
    if (type === 'media') {
      setIsMediaModalOpen(true);
    } else {
      setIsEditModalOpen(true);
    }
  };

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 200, bottom: window.innerHeight - 200 }}
        dragElastic={0.2}
        initial={{ x, y, scale: 0.9, opacity: 0 }}
        animate={{ x, y, scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        onDragEnd={handleDragEnd}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        className="absolute cursor-move group"
      >
        <div 
          className={`w-80 rounded-2xl shadow-lg backdrop-blur-sm overflow-hidden
            ${color} transform transition-all duration-300`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{getNodeIcon()}</span>
                <h3 className="font-medium text-white">{text}</h3>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsAIChatOpen(true)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80"
                >
                  <Bot className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEdit}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80"
                >
                  <Edit3 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {renderContent()}

            {comments && comments.length > 0 && (
              <div className="mt-4 flex items-center space-x-2 text-white/80">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{comments.length}</span>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-full ml-4 top-0 z-50"
            >
              <div className="bg-white rounded-lg shadow-lg p-4 w-64">
                <div className="text-sm text-gray-500 mb-2">Preview</div>
                <div className="prose prose-sm">
                  {content || text}
                </div>
                {progress !== undefined && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 rounded-full h-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <NodeEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        node={{ id, text, type, content, color }}
        onUpdate={onUpdate}
      />

      <MediaModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSave={(media) => {
          onUpdate(id, { mediaFiles: media });
          setIsMediaModalOpen(false);
        }}
        initialMedia={mediaFiles}
      />

      <AIChat
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        selectedModel={{
          id: 'mythomax',
          name: 'Mythomax',
          icon: '🌟',
          color: 'from-purple-500 to-indigo-500',
          description: 'Advanced reasoning and creative insights'
        }}
        nodeId={id}
      />
    </>
  );
}