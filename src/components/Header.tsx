import React from 'react';
import { Brain, Share2, Users, Search, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  const onlineUsers = [
    { id: '1', name: 'Alice', color: 'from-pink-400 to-rose-400' },
    { id: '2', name: 'Bob', color: 'from-blue-400 to-cyan-400' },
    { id: '3', name: 'Carol', color: 'from-green-400 to-emerald-400' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="w-6 h-6 text-indigo-600" />
          </motion.div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Sossy Mind Map
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-40"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-full hover:bg-gray-100">
              <ZoomOut className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm text-gray-600">100%</span>
            <button className="p-1.5 rounded-full hover:bg-gray-100">
              <ZoomIn className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          
          <div className="flex -space-x-2">
            {onlineUsers.map((user) => (
              <motion.div
                key={user.id}
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.color} 
                  flex items-center justify-center text-white text-sm font-medium 
                  ring-2 ring-white cursor-pointer`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {user.name[0]}
              </motion.div>
            ))}
            <motion.button
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 ring-2 ring-white"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}