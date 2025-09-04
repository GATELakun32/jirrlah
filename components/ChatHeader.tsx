'use client';

import { motion } from 'framer-motion';
import { Bot, Sparkles, Settings, X } from 'lucide-react';
import Image from 'next/image';

interface ChatHeaderProps {
  currentChatTitle?: string;
  messageCount?: number;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function ChatHeader({ currentChatTitle, messageCount = 0, isSidebarOpen, onToggleSidebar }: ChatHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-sm border-b border-primary-800 p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-800 shadow-md bg-[#0f0f0f]">
              <Image src={"/ibuki_galeri_2.jpg"} alt="Ibuki" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-primary-300 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-2 h-2 text-white" />
            </motion.div>
          </motion.div>
          
          <div>
            <h1 className="text-lg font-semibold text-secondary-100">
              Tanga Ibuki
            </h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-secondary-300">
                {currentChatTitle || 'Percakapan Baru'}
              </span>
              {messageCount > 0 && (
                <span className="text-xs bg-primary-900/40 text-primary-300 px-2 py-1 rounded-full border border-primary-800">
                  {messageCount} pesan
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-[#101010] hover:bg-[#141414] text-primary-300 border border-primary-900 transition-colors duration-200"
        >
          {/* Hamburger / sidebar toggle */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zm0 5.25c0-.414.336-.75.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 5.25c0-.414.336-.75.75-.75h10.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-xl bg-[#101010] hover:bg-[#141414] text-primary-300 border border-primary-900 transition-colors duration-200"
        >
          <Settings size={20} />
        </motion.button>
        </div>
      </div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-1 bg-gradient-to-r from-primary-700 to-primary-500 rounded-full mt-3"
      />
    </motion.div>
  );
}
