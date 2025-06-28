import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { openAIService, AIContentRequest } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const aiRequest: AIContentRequest = await request.json();

    // Validate request
    if (!aiRequest.type || !aiRequest.context) {
      return NextResponse.json(
        { error: 'Request type and context are required' },
        { status: 400 }
      );
    }

    // Generate AI suggestions
    const suggestions = await openAIService.generateContent(aiRequest);

    return NextResponse.json({
      success: true,
      suggestions,
    });

  } catch (error) {
    console.error('AI suggestions error:', error);
    
    if (error instanceof Error && error.message.includes('OpenAI API key')) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
