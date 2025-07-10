// app/api/search/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // Ganti dengan query database sebenarnya
  const mockResults = [
    { id: 1, title: 'Concrete Roof', type: 'product' },
    { id: 2, title: 'Paving Block', type: 'product' }
  ];

  const results = query 
    ? mockResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return NextResponse.json(results);
}