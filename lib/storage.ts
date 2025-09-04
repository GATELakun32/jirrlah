import { ChatHistory, ChatMessage } from './types';

const STORAGE_KEY = 'ibuki-chat-history';

export const saveChatHistory = (history: ChatHistory[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export const loadChatHistory = (): ChatHistory[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    }
  } catch (error) {
    console.error('Error loading chat history:', error);
  }
  return [];
};

export const createNewChat = (): ChatHistory => {
  return {
    id: Date.now().toString(),
    title: 'Percakapan Baru',
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const addMessageToChat = (
  chatId: string,
  message: ChatMessage,
  history: ChatHistory[]
): ChatHistory[] => {
  const updatedHistory = history.map(chat => {
    if (chat.id === chatId) {
      const updatedMessages = [...chat.messages, message];
      // Update title based on first user message
      const title = chat.title === 'Percakapan Baru' && message.role === 'user' 
        ? message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '')
        : chat.title;
      
      return {
        ...chat,
        messages: updatedMessages,
        title,
        updatedAt: new Date()
      };
    }
    return chat;
  });
  
  saveChatHistory(updatedHistory);
  return updatedHistory;
};

export const deleteChat = (chatId: string, history: ChatHistory[]): ChatHistory[] => {
  const updatedHistory = history.filter(chat => chat.id !== chatId);
  saveChatHistory(updatedHistory);
  return updatedHistory;
};

export const updateMessageInChat = (
  chatId: string,
  messageId: string,
  newContent: string,
  history: ChatHistory[]
): ChatHistory[] => {
  const updatedHistory = history.map(chat => {
    if (chat.id !== chatId) return chat;
    const messages = chat.messages.map(m => m.id === messageId ? { ...m, content: newContent } : m);
    return { ...chat, messages, updatedAt: new Date() };
  });
  saveChatHistory(updatedHistory);
  return updatedHistory;
};

export const removeMessageFromChat = (
  chatId: string,
  messageId: string,
  history: ChatHistory[]
): ChatHistory[] => {
  const updatedHistory = history.map(chat => {
    if (chat.id !== chatId) return chat;
    const messages = chat.messages.filter(m => m.id !== messageId);
    return { ...chat, messages, updatedAt: new Date() };
  });
  saveChatHistory(updatedHistory);
  return updatedHistory;
};
