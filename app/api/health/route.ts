import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Tanga Ibuki Chat API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
