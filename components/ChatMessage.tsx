'use client';

import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '@/lib/types';
import { Bot, User, Copy, Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import MarkdownMessage from './MarkdownMessage';

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
  onCopy?: (text: string) => void;
  onEdit?: (id: string, current: string) => void;
  onDelete?: (id: string) => void;
}

export default function ChatMessage({ message, index, onCopy, onEdit, onDelete }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start space-x-2 max-w-[82vw] sm:max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
            isUser 
              ? 'bg-primary-600 text-white' 
              : 'border border-primary-800'
          }`}
        >
          {isUser ? (
            <User size={16} />
          ) : (
            <Image src={"/ibuki_galeri_2.jpg"} alt="Ibuki" width={32} height={32} className="w-full h-full object-cover" />
          )}
        </motion.div>
        
        {/* Message Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-primary-600 text-white rounded-br-md'
              : 'bg-[#141414] text-secondary-100 border border-primary-900 rounded-bl-md'
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MarkdownMessage content={message.content} onCopy={(t) => onCopy?.(t)} />
          )}
          
          {/* Timestamp */}
          <div className={`text-xs mt-1 ${
            isUser ? 'text-primary-200' : 'text-secondary-500'
          }`}>
            {message.timestamp.toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>

          {/* Actions */}
          <div className={`flex items-center gap-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <button
              onClick={() => onCopy?.(message.content)}
              className={`p-1.5 rounded-md hover:opacity-80 ${isUser ? 'bg-white/20' : 'bg-white/5'} `}
              title="Copy"
            >
              <Copy size={14} />
            </button>
            {isUser && (
              <>
                <button
                  onClick={() => onEdit?.(message.id, message.content)}
                  className={`p-1.5 rounded-md hover:opacity-80 ${isUser ? 'bg-white/20' : 'bg-white/5'} `}
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onDelete?.(message.id)}
                  className={`p-1.5 rounded-md hover:opacity-80 ${isUser ? 'bg-white/20' : 'bg-white/5'} `}
                  title="Hapus"
                >
                  <Trash size={14} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
