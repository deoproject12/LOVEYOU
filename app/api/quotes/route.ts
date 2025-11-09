// app/api/quotes/route.ts
import { getQuotes } from '@/app/lib/server-actions';

export async function GET() {
  try {
    const quotes = await getQuotes();
    return Response.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    // Return fallback data
    return Response.json([
      {
        id: 1,
        text: "Cinta bukan tentang menemukan seseorang yang sempurna, tapi tentang menemukan seseorang yang membuat kita ingin menjadi lebih baik.",
        author: "Abdullah",
        isFeatured: true
      },
      {
        id: 2,
        text: "Setiap hari bersamamu adalah hari yang tak ternilai harganya.",
        author: "Nayla",
        isFeatured: false
      }
    ]);
  }
}