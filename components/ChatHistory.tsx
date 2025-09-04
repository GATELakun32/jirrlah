'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChatHistory as ChatHistoryType } from '@/lib/types';
import { MessageSquare, Trash2, Clock } from 'lucide-react';

interface ChatHistoryProps {
  history: ChatHistoryType[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onNewChat: () => void;
}

export default function ChatHistory({
  history,
  currentChatId,
  onSelectChat,
  onDeleteChat,
  onNewChat
}: ChatHistoryProps) {
  return (
    <div className="w-72 sm:w-80 bg-black/30 backdrop-blur-sm border-r border-primary-900 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-primary-900">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          + Percakapan Baru
        </motion.button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-1 sm:p-2">
        <AnimatePresence>
          {history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center p-4"
            >
              <MessageSquare className="w-12 h-12 text-primary-600 mb-3" />
              <p className="text-secondary-300 text-sm">
                Belum ada percakapan
              </p>
              <p className="text-secondary-500 text-xs mt-1">
                Mulai percakapan baru dengan Ibuki!
              </p>
            </motion.div>
          ) : (
            history.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative mb-2 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  currentChatId === chat.id
                    ? 'bg-[#151515] border border-primary-800'
                    : 'bg-black/20 hover:bg-black/30 border border-transparent hover:border-primary-900'
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-secondary-100 truncate">
                      {chat.title}
                    </h3>
                    <div className="flex items-center text-xs text-secondary-400 mt-1">
                      <Clock size={12} className="mr-1" />
                      {chat.updatedAt.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <p className="text-xs text-secondary-500 mt-1">
                      {chat.messages.length} pesan
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-red-900/20 text-red-400 hover:text-red-500 transition-all duration-200"
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-primary-900">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-primary-400">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Tanga Ibuki</span>
          </div>
          <p className="text-xs text-secondary-400 mt-1">
            AI Assistant yang ramah
          </p>
        </div>
      </div>
    </div>
  );
}
