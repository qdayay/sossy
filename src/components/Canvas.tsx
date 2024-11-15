import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNodeInteraction } from '../hooks/useNodeInteraction';
import { NodeCreationMenu } from './NodeCreationMenu';
import { NodeContextMenu } from './NodeContextMenu';
import { FileUploadZone } from './FileUploadZone';
import type { NodeType } from '../types';

interface CanvasProps {
  onNodeCreate: (type: NodeType, position: { x: number; y: number }) => void;
  onNodeAction: (action: string, nodeId?: string) => void;
  onFileSelect: (file: File) => void;
}

export function Canvas({ onNodeCreate, onNodeAction, onFileSelect }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const gridSize = 20;
  const [isDraggingFile, setIsDraggingFile] = React.useState(false);

  const {
    contextMenu,
    creationMenu,
    handleCanvasDoubleClick,
    handleContextMenu,
    handleKeyPress,
    closeMenus,
  } = useNodeInteraction();

  useEffect(() => {
    const createDots = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.innerHTML = '';

      const dots = Array.from({ length: 100 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
      }));

      dots.forEach(dot => {
        const dotEl = document.createElement('div');
        dotEl.className = 'canvas-dot';
        dotEl.style.width = `${dot.size}px`;
        dotEl.style.height = `${dot.size}px`;
        dotEl.style.left = `${dot.x}px`;
        dotEl.style.top = `${dot.y}px`;
        dotEl.style.animationDelay = `${dot.delay}s`;
        canvas.appendChild(dotEl);
      });
    };

    createDots();
    window.addEventListener('resize', createDots);

    const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e, onNodeCreate);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', createDots);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress, onNodeCreate]);

  return (
    <motion.div 
      ref={canvasRef}
      className="fixed inset-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ 
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        perspective: '1000px',
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onDoubleClick={handleCanvasDoubleClick}
      onContextMenu={(e) => handleContextMenu(e)}
      onClick={closeMenus}
      onDragEnter={() => setIsDraggingFile(true)}
      onDragLeave={() => setIsDraggingFile(false)}
    >
      <NodeCreationMenu
        isOpen={creationMenu.isOpen}
        position={creationMenu.position}
        onSelect={(type) => onNodeCreate(type, creationMenu.position)}
        onClose={closeMenus}
      />

      <NodeContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onAction={(action) => onNodeAction(action, contextMenu.nodeId)}
        onClose={closeMenus}
      />

      <AnimatePresence>
        {isDraggingFile && (
          <FileUploadZone onFileSelect={onFileSelect} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}