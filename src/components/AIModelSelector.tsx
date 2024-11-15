import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { AIModel } from '../types';

const models: AIModel[] = [
  {
    id: 'mythomax',
    name: 'Mythomax',
    icon: '🌟',
    color: 'from-purple-500 to-indigo-500',
    description: 'Advanced reasoning and creative insights'
  },
  {
    id: 'gemma',
    name: 'Gemma',
    icon: '💎',
    color: 'from-blue-500 to-cyan-500',
    description: 'Efficient and precise analysis'
  },
  {
    id: 'llama',
    name: 'Llama 3.1',
    icon: '🦙',
    color: 'from-green-500 to-emerald-500',
    description: 'Balanced performance and versatility'
  },
  {
    id: 'openchat',
    name: 'OpenChat',
    icon: '💬',
    color: 'from-orange-500 to-red-500',
    description: 'Natural conversation and explanations'
  }
];

export function AIModelSelector() {
  return (
    <div className="fixed right-4 top-20 bg-white rounded-2xl shadow-lg p-4 w-64">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">AI Models</h3>
      </div>

      <div className="space-y-2">
        {models.map((model) => (
          <motion.button
            key={model.id}
            className={`w-full p-3 rounded-xl bg-gradient-to-r ${model.color} 
              text-white flex items-center space-x-3 hover:opacity-90 transition-opacity`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl">{model.icon}</span>
            <div className="text-left">
              <div className="font-medium">{model.name}</div>
              <div className="text-xs text-white/80">{model.description}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}