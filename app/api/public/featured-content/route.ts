import { NextRequest } from 'next/server';
import { db } from '@/db';
import { memories, gallery, quotes } from '@/db/schema/romantic';
import { eq, desc, and, sql } from 'drizzle-orm';

// GET /api/public/featured-content - Get featured memories, gallery, and quotes
export async function GET(request: NextRequest) {
  try {
    // Fetch featured quotes (limit to 2)
    const featuredQuotes = await db
      .select()
      .from(quotes)
      .where(eq(quotes.isFeatured, true))
      .orderBy(desc(quotes.createdAt))
      .limit(2);

    // Fetch featured gallery items (limit to 3)
    const featuredGallery = await db
      .select()
      .from(gallery)
      .where(eq(gallery.isFeatured, true))
      .orderBy(desc(gallery.createdAt))
      .limit(3);

    // Fetch recent memories (limit to 2)
    const recentMemories = await db
      .select()
      .from(memories)
      .orderBy(desc(memories.date))
      .limit(2);

    return Response.json({
      quotes: featuredQuotes,
      gallery: featuredGallery,
      memories: recentMemories,
    });
  } catch (error) {
    console.error('Error fetching featured content:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}