import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simulasi delay untuk typing effect
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    let responseMessage: string;

    try {
      // Coba gunakan Gemini API terlebih dahulu
      responseMessage = await geminiService.generateResponse(message);
    } catch (geminiError) {
      console.warn('Gemini API failed, using fallback:', geminiError);
      // Fallback ke response lokal jika Gemini API gagal
      responseMessage = geminiService.getFallbackResponse(message);
    }

    return NextResponse.json({
      message: responseMessage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

