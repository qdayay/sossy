import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Trash2, Link, Palette, Tag } from 'lucide-react';

interface NodeContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onAction: (action: string) => void;
  onClose: () => void;
}

export function NodeContextMenu({ isOpen, position, onAction, onClose }: NodeContextMenuProps) {
  const actions = [
    { id: 'duplicate', icon: Copy, label: 'Duplicate' },
    { id: 'delete', icon: Trash2, label: 'Delete' },
    { id: 'connect', icon: Link, label: 'Connect' },
    { id: 'color', icon: Palette, label: 'Change Color' },
    { id: 'tag', icon: Tag, label: 'Add Tag' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="absolute z-50 bg-white rounded-lg shadow-lg p-2 min-w-[160px]"
          style={{ 
            left: position.x,
            top: position.y,
            transformOrigin: 'center center'
          }}
        >
          {actions.map(({ id, icon: Icon, label }) => (
            <motion.button
              key={id}
              className="flex items-center space-x-2 w-full p-2 hover:bg-gray-50 rounded-md
                text-left text-gray-700 transition-colors"
              whileHover={{ x: 4 }}
              onClick={() => {
                onAction(id);
                onClose();
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}