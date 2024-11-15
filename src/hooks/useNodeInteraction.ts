import { useState, useCallback } from 'react';
import type { NodeType } from '../types';

interface Position {
  x: number;
  y: number;
}

export function useNodeInteraction() {
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: Position;
    nodeId?: string;
  }>({ isOpen: false, position: { x: 0, y: 0 } });

  const [creationMenu, setCreationMenu] = useState<{
    isOpen: boolean;
    position: Position;
  }>({ isOpen: false, position: { x: 0, y: 0 } });

  const handleCanvasDoubleClick = useCallback((event: React.MouseEvent) => {
    // Prevent if clicking on existing node
    if ((event.target as HTMLElement).closest('.node')) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setCreationMenu({
      isOpen: true,
      position: {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    });
  }, []);

  const handleContextMenu = useCallback((event: React.MouseEvent, nodeId?: string) => {
    event.preventDefault();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setContextMenu({
      isOpen: true,
      position: {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
      nodeId,
    });
  }, []);

  const handleKeyPress = useCallback((
    event: KeyboardEvent, 
    onNodeCreate: (type: NodeType, position: Position) => void
  ) => {
    const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    switch (event.key.toLowerCase()) {
      case 'n':
        onNodeCreate('text', position);
        break;
      case 'i':
        onNodeCreate('media', position);
        break;
      case 'f':
        // Trigger file input click
        document.getElementById('file-upload')?.click();
        break;
      case 't':
        onNodeCreate('task', position);
        break;
    }
  }, []);

  const closeMenus = useCallback(() => {
    setContextMenu(prev => ({ ...prev, isOpen: false }));
    setCreationMenu(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    contextMenu,
    creationMenu,
    handleCanvasDoubleClick,
    handleContextMenu,
    handleKeyPress,
    closeMenus,
  };
}