'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage as ChatMessageType, ChatHistory as ChatHistoryType } from '@/lib/types';
import { 
  loadChatHistory, 
  saveChatHistory, 
  createNewChat, 
  addMessageToChat, 
  deleteChat 
} from '@/lib/storage';
import { sendMessageToIbuki } from '@/lib/api';
import { updateMessageInChat, removeMessageFromChat } from '@/lib/storage';

import ChatHeader from '@/components/ChatHeader';
import Image from 'next/image';
import ChatHistoryComponent from '@/components/ChatHistory';
import ChatMessageComponent from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';

export default function Home() {
  const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatHistoryType | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory();
    setChatHistory(history);
    
    // Create initial chat if no history exists
    if (history.length === 0) {
      const newChat = createNewChat();
      setCurrentChat(newChat);
      setChatHistory([newChat]);
    } else {
      // Load the most recent chat
      const mostRecent = history.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )[0];
      setCurrentChat(mostRecent);
    }
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    if (!currentChat || isLoading) return;

    setIsLoading(true);
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    
    // Create user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    // Add user message to current chat
    const updatedHistory = addMessageToChat(currentChat.id, userMessage, chatHistory);
    setChatHistory(updatedHistory);
    
    const updatedChat = updatedHistory.find(chat => chat.id === currentChat.id);
    if (updatedChat) {
      setCurrentChat(updatedChat);
    }

    // Show typing indicator
    setIsTyping(true);

    try {
      // Generate AI response via API
      const response = await sendMessageToIbuki(content, abortRef.current.signal);
      
      // Create AI message
      const aiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        role: 'assistant',
        timestamp: new Date()
      };

      // Add AI message to chat
      const finalHistory = addMessageToChat(currentChat.id, aiMessage, updatedHistory);
      setChatHistory(finalHistory);
      
      const finalChat = finalHistory.find(chat => chat.id === currentChat.id);
      if (finalChat) {
        setCurrentChat(finalChat);
      }
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  const handleEdit = (messageId: string, current: string) => {
    const newContent = prompt('Edit pesan:', current);
    if (!newContent || !currentChat) return;
    const updated = updateMessageInChat(currentChat.id, messageId, newContent, chatHistory);
    setChatHistory(updated);
    const c = updated.find(ch => ch.id === currentChat.id);
    if (c) setCurrentChat(c);
  };

  const handleDelete = (messageId: string) => {
    if (!currentChat) return;
    const updated = removeMessageFromChat(currentChat.id, messageId, chatHistory);
    setChatHistory(updated);
    const c = updated.find(ch => ch.id === currentChat.id);
    if (c) setCurrentChat(c);
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    setIsTyping(false);
    setIsLoading(false);
  };

  const handleSelectChat = (chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  const handleNewChat = () => {
    const newChat = createNewChat();
    const updatedHistory = [newChat, ...chatHistory];
    setChatHistory(updatedHistory);
    setCurrentChat(newChat);
    saveChatHistory(updatedHistory);
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedHistory = deleteChat(chatId, chatHistory);
    setChatHistory(updatedHistory);
    
    if (currentChat?.id === chatId) {
      if (updatedHistory.length > 0) {
        setCurrentChat(updatedHistory[0]);
      } else {
        const newChat = createNewChat();
        setCurrentChat(newChat);
        setChatHistory([newChat]);
      }
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-black via-[#0b0b0b] to-[#111111]">
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 sm:hidden z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Chat History Sidebar */}
      <motion.div
        initial={{ x: -328, opacity: 0 }}
        animate={{ x: isSidebarOpen ? 0 : -328, opacity: isSidebarOpen ? 1 : 0 }}
        transition={{ duration: isSidebarOpen ? 0.16 : 0.1, ease: isSidebarOpen ? 'easeOut' : 'easeIn' }}
        className="sm:relative sm:z-10 sm:overflow-hidden fixed sm:static left-0 top-0 h-full z-20"
        style={{ width: isSidebarOpen ? 288 : 0 }}
      >
        <div className="w-72 sm:w-80 h-full">
          <ChatHistoryComponent
            history={chatHistory}
            currentChatId={currentChat?.id || null}
            onSelectChat={(id) => { setIsSidebarOpen(false); handleSelectChat(id); }}
            onDeleteChat={handleDeleteChat}
            onNewChat={handleNewChat}
          />
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'sm:ml-0' : ''}`}>
        {/* Chat Header */}
        <ChatHeader
          currentChatTitle={currentChat?.title}
          messageCount={currentChat?.messages.length || 0}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        />

        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 ${isSidebarOpen ? '' : 'max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto w-full'}`}>
          <AnimatePresence>
            {currentChat?.messages.map((message, index) => (
              <ChatMessageComponent
                key={message.id}
                message={message}
                index={index}
                onCopy={handleCopy}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          <TypingIndicator isVisible={isTyping} />
          
          {/* Welcome Message */}
          {currentChat?.messages.length === 0 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center h-full"
            >
              <div className="text-center max-w-md">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Image src="/ibuki_galeri_2.jpg" alt="Ibuki" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-secondary-100 mb-2">
                  Halo! Aku Tanga Ibuki
                </h2>
                <p className="text-secondary-300 mb-4">
                  Senang bertemu dengan kamu! Aku di sini untuk membantu dengan apapun yang kamu butuhkan.
                </p>
                <p className="text-sm text-secondary-400">
                  Kamu bisa panggil aku <span className="font-semibold text-primary-400">Ibuki</span> aja! 😊
                </p>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          onCancelTyping={handleCancel}
        />
      </div>
    </div>
  );
}
