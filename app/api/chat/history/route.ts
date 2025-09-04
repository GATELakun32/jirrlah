import { NextRequest, NextResponse } from 'next/server';

// Simulasi database untuk demo (dalam production, gunakan database sesungguhnya)
let chatHistory: any[] = [];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: chatHistory,
      count: chatHistory.length
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { chatId, message, role } = await request.json();

    if (!chatId || !message || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simulasi menyimpan ke database
    const chatIndex = chatHistory.findIndex(chat => chat.id === chatId);
    
    if (chatIndex === -1) {
      // Create new chat
      chatHistory.push({
        id: chatId,
        messages: [{
          id: Date.now().toString(),
          content: message,
          role,
          timestamp: new Date().toISOString()
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } else {
      // Add message to existing chat
      chatHistory[chatIndex].messages.push({
        id: Date.now().toString(),
        content: message,
        role,
        timestamp: new Date().toISOString()
      });
      chatHistory[chatIndex].updatedAt = new Date().toISOString();
    }

    return NextResponse.json({
      success: true,
      message: 'Message saved successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) {
      return NextResponse.json(
        { error: 'Chat ID is required' },
        { status: 400 }
      );
    }

    // Remove chat from history
    chatHistory = chatHistory.filter(chat => chat.id !== chatId);

    return NextResponse.json({
      success: true,
      message: 'Chat deleted successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete chat' },
      { status: 500 }
    );
  }
}
