'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  onCancelTyping?: () => void;
}

export default function ChatInput({ onSendMessage, disabled = false, onCancelTyping }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-black/40 backdrop-blur-sm border-t border-primary-900"
    >
      <form onSubmit={handleSubmit} className="flex items-end space-x-2 sm:space-x-3">
        <div className="flex-1 relative">
          <motion.textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan untuk Ibuki..."
            disabled={disabled}
            className="w-full px-3 sm:px-4 py-3 pr-10 sm:pr-12 bg-[#0f0f0f] text-secondary-100 border border-primary-900 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-200 placeholder:text-secondary-500 text-sm"
            style={{ minHeight: '48px', maxHeight: '120px' }}
            rows={1}
          />
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setShowEmoji((v) => !v)}
            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 text-primary-400 hover:text-primary-600 transition-colors duration-200"
          >
            <Smile size={20} />
          </motion.button>
          {showEmoji && (
            <div className="absolute right-0 bottom-14 w-64 bg-[#0f0f0f] border border-primary-900 rounded-xl p-2 shadow-lg grid grid-cols-6 gap-1">
              {['😀','😁','😂','🤣','😅','😊','😍','😘','😎','🤔','🙌','👍','🔥','✨','🎉','👌','🤝','💡','📌','🧠','🫶','💪','📈','📝','⏳','⚡','💫','🎯','❤️','😴','🤖'].map((e) => (
                <button
                  key={e}
                  type="button"
                  className="hover:bg-[#141414] rounded-md p-1"
                  onClick={() => setMessage((m) => m + e)}
                >
                  <span className="text-lg">{e}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!message.trim() || disabled}
          className={`p-3 rounded-2xl transition-all duration-200 ${
            message.trim() && !disabled
              ? 'bg-primary-600 text-white shadow-md hover:shadow-lg hover:bg-primary-500'
              : 'bg-[#1a1a1a] text-secondary-600 border border-primary-900 cursor-not-allowed'
          }`}
        >
          <Send size={20} />
        </motion.button>

        {disabled && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onCancelTyping}
            className="p-3 rounded-2xl bg-red-600 text-white shadow-md hover:shadow-lg"
          >
            Batalkan
          </motion.button>
        )}
      </form>
      
      <div className="flex items-center justify-between mt-2 text-[11px] sm:text-xs text-secondary-500">
        <span className="hidden sm:block">Tekan Enter untuk mengirim, Shift+Enter untuk baris baru</span>
        <span className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-secondary-300">Ibuki online</span>
        </span>
      </div>
    </motion.div>
  );
}
