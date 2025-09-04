import { IbukiResponse } from './types';
import { generateIbukiResponse } from './ibuki';

export const sendMessageToIbuki = async (message: string, signal?: AbortSignal): Promise<IbukiResponse> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      signal,
    });

    if (response.ok) {
      const data = await response.json();
      return {
        message: data.message,
        isTyping: false
      };
    }
    throw new Error('Failed to get response from Ibuki');
  } catch (error) {
    console.error('Error sending message to Ibuki:', error);
    try {
      const fallback = await generateIbukiResponse(message);
      return { message: fallback.message, isTyping: false };
    } catch {
      return {
        message: "Maaf, lagi ada kendala jaringan. Coba kirim ulang ya! 😅",
        isTyping: false
      };
    }
  }
};
