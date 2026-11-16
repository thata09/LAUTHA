import { NextRequest, NextResponse } from 'next/server';
import { generateThreeResponses } from '@/lib/ai';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, apiKey } = body;
    const headerKey = req.headers.get('x-api-key');

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Cole uma mensagem para seu ex analisar.' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Mensagem muito longa! Resuma um pouco para as 3 respostas ficarem afiadas.' },
        { status: 400 }
      );
    }

    const result = await generateThreeResponses(message.trim(), apiKey || headerKey || undefined);

    return NextResponse.json({
      success: true,
      responses: {
        debochada: result.debochada,
        venenosa: result.venenosa,
        elegante: result.elegante
      },
      provider: result.provider
    });
  } catch (error) {
    console.error('API /api/gerador error:', error);
    return NextResponse.json(
      {
        error: 'Erro ao gerar as respostas afiadas. Tente novamente!',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
