import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Video, Mic, FileUp, ListTodo } from 'lucide-react';
import type { NodeType } from '../types';

interface NodeCreationMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onSelect: (type: NodeType) => void;
  onClose: () => void;
}

export function NodeCreationMenu({ isOpen, position, onSelect, onClose }: NodeCreationMenuProps) {
  const options = [
    { type: 'text' as NodeType, icon: FileText, label: 'Text Node', description: 'Rich text with PDF support' },
    { type: 'media' as NodeType, icon: Video, label: 'Media Node', description: 'Images, videos & YouTube' },
    { type: 'audio' as NodeType, icon: Mic, label: 'Audio Node', description: 'Audio files & recordings' },
    { type: 'file' as NodeType, icon: FileUp, label: 'File Node', description: 'Documents & attachments' },
    { type: 'task' as NodeType, icon: ListTodo, label: 'Task Node', description: 'Track progress & todos' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="absolute z-50 bg-white rounded-xl shadow-lg p-2 min-w-[240px]"
          style={{ 
            left: position.x,
            top: position.y,
            transformOrigin: 'center center'
          }}
        >
          {options.map(({ type, icon: Icon, label, description }) => (
            <motion.button
              key={type}
              className="flex items-start space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg
                text-left text-gray-700 transition-colors group"
              whileHover={{ x: 4 }}
              onClick={() => {
                onSelect(type);
                onClose();
              }}
            >
              <div className={`p-2 rounded-lg bg-gray-100 text-gray-600 
                group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">{label}</div>
                <div className="text-xs text-gray-500">{description}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}