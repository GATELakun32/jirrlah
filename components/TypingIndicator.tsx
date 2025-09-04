'use client';

import { motion } from 'framer-motion';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export default function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2 p-3"
    >
      <div className="flex items-center space-x-1 bg-[#141414] rounded-2xl px-4 py-2 shadow-sm border border-primary-900">
        <div className="flex space-x-1">
          <motion.div
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span className="text-xs text-secondary-400 ml-2">Ibuki sedang mengetik...</span>
      </div>
    </motion.div>
  );
}
