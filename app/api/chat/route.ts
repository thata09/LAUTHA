import { NextRequest, NextResponse } from 'next/server';
import { generateExResponse } from '@/lib/ai';
import { PersonalityId } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, personalityId, history, apiKey } = body;
    const headerKey = req.headers.get('x-api-key');

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'A mensagem não pode ser vazia.' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Mensagem muito longa! Seu ex não tem paciência para testamentos.' },
        { status: 400 }
      );
    }

    const safePersonalityId = (personalityId || 'debochado') as PersonalityId;
    const result = await generateExResponse(
      message.trim(),
      safePersonalityId,
      Array.isArray(history) ? history : [],
      apiKey || headerKey || undefined
    );

    return NextResponse.json({
      success: true,
      text: result.text,
      provider: result.provider
    });
  } catch (error) {
    console.error('API /api/chat error:', error);
    return NextResponse.json(
      {
        error: 'Seu ex deu vácuo no servidor temporariamente. Tente novamente em instantes!',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
