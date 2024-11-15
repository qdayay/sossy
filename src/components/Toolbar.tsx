import React from 'react';
import { Plus, Cpu, Download, Layout, Settings, Image, ListTodo, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export function Toolbar() {
  const tools = [
    { icon: Plus, color: 'indigo', label: 'Add Node' },
    { icon: Image, color: 'blue', label: 'Add Media' },
    { icon: ListTodo, color: 'green', label: 'Add Task' },
    { icon: Cpu, color: 'purple', label: 'AI Assist' },
    { icon: Users, color: 'orange', label: 'Collaborate' },
    { icon: MessageSquare, color: 'pink', label: 'Chat' },
    { icon: Layout, color: 'cyan', label: 'Arrange' },
    { icon: Download, color: 'teal', label: 'Export' },
    { icon: Settings, color: 'gray', label: 'Settings' }
  ];

  return (
    <motion.div 
      className="fixed left-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-2 space-y-2"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {tools.map(({ icon: Icon, color, label }) => (
        <motion.button
          key={label}
          className={`p-2 rounded-xl hover:bg-${color}-50 text-${color}-600 transition-colors
            group relative flex items-center`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-5 h-5" />
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm 
            rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}