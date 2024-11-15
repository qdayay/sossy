import React, { useState, useCallback } from 'react';
import { Canvas } from './components/Canvas';
import { Node } from './components/Node';
import { Toolbar } from './components/Toolbar';
import { Header } from './components/Header';
import { AIModelSelector } from './components/AIModelSelector';
import type { Node as NodeType, NodeType as NodeTypeEnum } from './types';

const initialNodes: NodeType[] = [
  {
    id: '1',
    text: 'Project Goals',
    x: 400,
    y: 300,
    type: 'text',
    color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    connections: ['2', '3']
  },
  {
    id: '2',
    text: 'Timeline & Milestones',
    x: 700,
    y: 200,
    type: 'text',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    connections: ['1']
  },
  {
    id: '3',
    text: 'Resource Allocation',
    x: 700,
    y: 400,
    type: 'text',
    color: 'bg-gradient-to-r from-emerald-500 to-green-500',
    connections: ['1']
  }
];

function App() {
  const [nodes, setNodes] = useState<NodeType[]>(initialNodes);
  const [showAISelector, setShowAISelector] = useState(true);

  const handleNodeDragEnd = useCallback((id: string, x: number, y: number) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, x, y } : node
    ));
  }, []);

  const handleNodeCreate = useCallback((type: NodeTypeEnum, position: { x: number; y: number }) => {
    const newNode: NodeType = {
      id: Date.now().toString(),
      text: 'New Node',
      x: position.x,
      y: position.y,
      type,
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      connections: []
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const handleNodeAction = useCallback((action: string, nodeId?: string) => {
    if (!nodeId) return;

    switch (action) {
      case 'duplicate':
        const nodeToDuplicate = nodes.find(n => n.id === nodeId);
        if (nodeToDuplicate) {
          const duplicatedNode: NodeType = {
            ...nodeToDuplicate,
            id: Date.now().toString(),
            x: nodeToDuplicate.x + 50,
            y: nodeToDuplicate.y + 50,
            connections: []
          };
          setNodes(prev => [...prev, duplicatedNode]);
        }
        break;

      case 'delete':
        setNodes(prev => prev.filter(n => n.id !== nodeId));
        break;

      case 'connect':
        // Implement connection logic
        break;

      case 'color':
        // Implement color change logic
        break;

      case 'tag':
        // Implement tag addition logic
        break;
    }
  }, [nodes]);

  const handleNodeUpdate = useCallback((id: string, updates: Partial<NodeType>) => {
    setNodes(prev => prev.map(node =>
      node.id === id ? { ...node, ...updates } : node
    ));
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    // Create a new node for the uploaded file
    const newNode: NodeType = {
      id: Date.now().toString(),
      text: file.name,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      type: 'file',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      connections: [],
      fileType: file.type,
      fileUrl: URL.createObjectURL(file)
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      
      <main className="pt-16 relative min-h-screen">
        <Canvas 
          onNodeCreate={handleNodeCreate}
          onNodeAction={handleNodeAction}
          onFileSelect={handleFileSelect}
        />
        
        <svg className="absolute inset-0 pointer-events-none">
          {nodes.map(node => 
            node.connections.map(targetId => {
              const target = nodes.find(n => n.id === targetId);
              if (!target) return null;
              
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.x + 100}
                  y1={node.y + 25}
                  x2={target.x + 100}
                  y2={target.y + 25}
                  stroke="rgb(203 213 225)"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
              );
            })
          )}
        </svg>

        {nodes.map(node => (
          <Node
            key={node.id}
            {...node}
            onDragEnd={handleNodeDragEnd}
            onUpdate={handleNodeUpdate}
          />
        ))}

        <Toolbar onAIClick={() => setShowAISelector(true)} />
        {showAISelector && <AIModelSelector />}
      </main>
    </div>
  );
}

export default App;