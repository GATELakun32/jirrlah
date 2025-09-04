import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  let inputMessage: string | undefined;
  try {
    const { message } = await request.json();
    inputMessage = typeof message === 'string' ? message : undefined;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Test Gemini API connection
    const response = await geminiService.generateResponse(message);

    return NextResponse.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error testing Gemini API:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        fallback: geminiService.getFallbackResponse(inputMessage || 'test')
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Gemini API Test Endpoint',
    usage: 'POST with { "message": "your message" } to test Gemini API',
    timestamp: new Date().toISOString()
  });
}
