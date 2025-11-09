// app/api/memories/route.ts
import { getMemories } from '@/app/lib/server-actions';

export async function GET() {
  try {
    const memories = await getMemories();
    return Response.json(memories);
  } catch (error) {
    console.error('Error fetching memories:', error);
    // Return fallback data
    return Response.json([
      {
        id: 1,
        title: "Pertemuan Pertama",
        content: "Hari itu adalah hari yang tak terlupakan ketika aku melihat senyummu pertama kalinya...",
        date: "2020-05-15",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Kencan Pertama",
        content: "Kencan pertama kita di taman kota. Kita berbicara panjang lebar sampai malam hari...",
        date: "2020-06-20",
        imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop"
      }
    ]);
  }
}