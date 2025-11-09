// app/api/gallery/route.ts
import { getGalleryItems } from '@/app/lib/server-actions';

export async function GET() {
  try {
    const galleryItems = await getGalleryItems();
    // Add default likes if not present
    const itemsWithLikes = galleryItems.map(item => ({
      ...item,
      likes: item.likes || Math.floor(Math.random() * 50) + 10
    }));
    return Response.json(itemsWithLikes);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    // Return fallback data
    return Response.json([
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
        caption: "Hari pertama kita bertemu di kafe kecil",
        date: "15 Mei 2020",
        likes: 24
      },
      {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop",
        caption: "Kencan pertama kita, seolah waktu berhenti untuk kita berdua",
        date: "20 Juni 2020",
        likes: 32
      }
    ]);
  }
}