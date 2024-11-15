import React from 'react';
import { motion } from 'framer-motion';

interface NodeResizeHandleProps {
  isVisible: boolean;
  onResize: (width: number, height: number) => void;
}

export function NodeResizeHandle({ isVisible, onResize }: NodeResizeHandleProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{ left: 200, top: 100 }}
      onDrag={(_, info) => {
        const parent = info.point.getSource().parentElement;
        if (!parent) return;
        
        const rect = parent.getBoundingClientRect();
        onResize(rect.width, rect.height);
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white/40"
      >
        <path
          d="M14 14L8 14L14 8L14 14Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
}