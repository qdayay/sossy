import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link, Image, FileText, Music, File, Upload } from 'lucide-react';
import { TextEditor } from './TextEditor';
import { PDFPreview } from './PDFPreview';
import type { Node as NodeType } from '../types';

interface NodeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: NodeType;
  onUpdate: (id: string, updates: Partial<NodeType>) => void;
}

export function NodeEditModal({ isOpen, onClose, node, onUpdate }: NodeEditModalProps) {
  const [activeTab, setActiveTab] = useState('content');
  const [content, setContent] = useState(node.text);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [backgroundColor, setBackgroundColor] = useState(node.color || 'bg-white');

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  }, []);

  const handleSave = () => {
    onUpdate(node.id, {
      text: content,
      color: backgroundColor,
      ...(pdfFile && { pdfUrl: URL.createObjectURL(pdfFile) })
    });
    onClose();
  };

  const tabs = [
    { id: 'content', icon: FileText, label: 'Content' },
    { id: 'style', icon: Image, label: 'Style' },
  ];

  const backgroundColors = [
    { value: 'bg-gradient-to-r from-indigo-500 to-purple-500', label: 'Indigo to Purple' },
    { value: 'bg-gradient-to-r from-blue-500 to-cyan-500', label: 'Blue to Cyan' },
    { value: 'bg-gradient-to-r from-emerald-500 to-green-500', label: 'Emerald to Green' },
    { value: 'bg-gradient-to-r from-orange-500 to-red-500', label: 'Orange to Red' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Edit Text Node</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex space-x-1 mb-6">
                {tabs.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                      ${activeTab === id ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {activeTab === 'content' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <TextEditor content={content} onChange={setContent} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attach PDF
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <Upload className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Choose PDF</span>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {pdfFile && (
                          <span className="text-sm text-gray-600">
                            {pdfFile.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {pdfFile && (
                      <PDFPreview 
                        file={pdfFile} 
                        onRemove={() => setPdfFile(null)} 
                      />
                    )}
                  </>
                )}

                {activeTab === 'style' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Style
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {backgroundColors.map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() => setBackgroundColor(value)}
                          className={`h-20 rounded-lg transition-transform ${value} ${
                            backgroundColor === value ? 'ring-2 ring-offset-2 ring-indigo-600 scale-95' : ''
                          }`}
                        >
                          <span className="text-white text-sm font-medium">
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}