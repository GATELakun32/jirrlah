interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class GeminiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || 'AIzaSyCRCX4BQwxJ-ZHzajXtEHi3i8pfPHNGQ24';
    this.apiUrl = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }

  async generateResponse(userMessage: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Create Ibuki personality prompt (bahasa gaul: gue/lu)
    const systemPrompt = `Lo adalah Tanga Ibuki (panggilan: Ibuki), AI assistant cewek yang ramah, feminim, tapi santai.
    Style ngobrol:
    - Pakai bahasa gaul Jakarta: "gue" untuk aku, "lu" untuk kamu. Tetap berkesan feminim.
    - Nada ceria, asik, helpful, nggak kaku.
    - Pakai emoji seperlunya 😊🔥✨, jangan berlebihan.
    - Jawaban ringkas, to-the-point, kasih langkah jelas kalau diminta.
    - Kalau nggak yakin, jujur dan tawarin opsi buat lanjut.
    Output harus konsisten pakai kata ganti "gue/lu".`;

    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            { text: `${systemPrompt}\n\nUser (lu): ${userMessage}\n\nIbuki (gue):` }
          ]
        }
      ]
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': this.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error:', response.status, errorText);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        const text = data.candidates[0].content.parts[0].text;
        return text.trim();
      } else {
        throw new Error('No response from Gemini API');
      }

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  // Fallback response jika Gemini API tidak tersedia
  getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hi')) {
      return "Halo! Senang bertemu dengan kamu! Aku Ibuki, ada yang bisa aku bantu? 😊";
    }
    
    if (lowerMessage.includes('nama') || lowerMessage.includes('siapa')) {
      return "Aku Tanga Ibuki! Kamu bisa panggil aku Ibuki aja. Senang berkenalan dengan kamu! 🌟";
    }
    
    if (lowerMessage.includes('terima kasih') || lowerMessage.includes('thanks')) {
      return "Sama-sama! Aku senang bisa membantu kamu. Ada lagi yang ingin ditanyakan? 😄";
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('selamat tinggal') || lowerMessage.includes('dadah')) {
      return "Dadah! Senang bisa ngobrol dengan kamu hari ini. Sampai jumpa lagi! 👋✨";
    }
    
    return "Wah, pertanyaan yang menarik! Aku akan coba bantu kamu dengan yang aku tahu. Ada yang spesifik yang ingin kamu tanyakan? 🤔";
  }
}

// Singleton instance
export const geminiService = new GeminiService();
