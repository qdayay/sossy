export type NodeType = 'text' | 'media' | 'audio' | 'file' | 'task';

export interface Node {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  type: NodeType;
  connections: string[];
  progress?: number;
  comments?: Comment[];
  aiInsights?: string[];
  mediaUrl?: string;
  mediaFiles?: Array<{ url: string; type: 'image' | 'video' }>;
  fileUrl?: string;
  fileType?: string;
  pdfUrl?: string;
  content?: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
}

export interface AIModel {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}