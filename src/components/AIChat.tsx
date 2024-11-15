import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Loader } from 'lucide-react';
import type { AIModel } from '../types';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: AIModel;
  nodeId: string;
}

export function AIChat({ isOpen, onClose, selectedModel, nodeId }: AIChatProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `This is a simulated response from ${selectedModel.name}. In a real implementation, this would connect to the actual LLM API.`
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed right-4 bottom-4 w-96 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{selectedModel.icon}</span>
                <div>
                  <h3 className="font-medium">{selectedModel.name}</h3>
                  <p className="text-xs text-white/80">{selectedModel.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <Loader className="w-5 h-5 animate-spin text-gray-600" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}