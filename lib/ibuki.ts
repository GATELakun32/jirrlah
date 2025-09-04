import { IbukiResponse } from './types';

// Simulasi AI response dengan personality Ibuki
export const generateIbukiResponse = async (userMessage: string): Promise<IbukiResponse> => {
  // Simulasi delay untuk typing effect
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const responses = [
    "Yo! Gue Ibuki, siap bantu lu hari ini! 😎",
    "Pertanyaan lu keren juga nih, yuk kita bahas bareng.",
    "Santai, gue bantu semaksimal mungkin biar lu paham.",
    "Makasih ya udah nanya, gue coba jelasin yang paling jelas.",
    "Asik nih topiknya, gue suka bahas beginian. ✨",
    "Tenang, kalo belum jelas gue bantu step-by-step.",
    "Gas kita explore bareng, pelan-pelan tapi nempel.",
    "Semoga ini ngebantu lu, ya! 🙌",
    "Nice! Pertanyaan lu tajem juga.",
    "Gue bakal jelasin yang gampang dicerna, santuy aja.",
  ];

  // Simple keyword-based responses
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hi')) {
    return { message: "Halo! Seneng ketemu lu! Gue Ibuki, ada yang bisa gue bantu? 😊" };
  }
  
  if (lowerMessage.includes('nama') || lowerMessage.includes('siapa')) {
    return { message: "Gue Tanga Ibuki! Panggil gue Ibuki, ya. Seneng kenalan sama lu! 🌟" };
  }
  
  if (lowerMessage.includes('terima kasih') || lowerMessage.includes('thanks')) {
    return { message: "Sama-sama! Seneng bisa bantu lu. Ada lagi yang mau lu tanya? 😄" };
  }
  
  if (lowerMessage.includes('bye') || lowerMessage.includes('selamat tinggal') || lowerMessage.includes('dadah')) {
    return { message: "Ciao! Seru ngobrol sama lu hari ini. Sampai ketemu lagi! 👋✨" };
  }
  
  if (lowerMessage.includes('bagaimana') || lowerMessage.includes('cara')) {
    return { message: "Pertanyaan bagus! Gue jelasin simpel ya. Biasanya ada beberapa cara, mau gue kasih step-by-step?" };
  }
  
  if (lowerMessage.includes('kenapa') || lowerMessage.includes('mengapa')) {
    return { message: "Wih, dalem juga! Biasanya ada beberapa faktor sih. Yuk kita bedah pelan-pelan." };
  }
  
  if (lowerMessage.includes('apa') && lowerMessage.includes('itu')) {
    return { message: "Ooh, ini menarik! Gue coba jelasin sesimpel mungkin biar enak dicerna, oke?" };
  }

  // Default response
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return { message: randomResponse };
};

// Simulasi typing indicator
export const simulateTyping = (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, 500 + Math.random() * 1500);
  });
};
