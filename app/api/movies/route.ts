import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://imdb236.p.rapidapi.com/search?query=popular',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY || '8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb',
          'x-rapidapi-host': 'imdb236.p.rapidapi.com',
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error(`Erro na API: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return NextResponse.json({ error: 'Erro ao buscar filmes' }, { status: 500 });
  }
}
