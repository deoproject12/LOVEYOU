import { NextRequest } from 'next/server';
import { db } from '@/db';
import { gallery } from '@/db/schema/romantic';
import { eq, desc } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/gallery - Get all gallery items
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_development');
    } catch (error) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Fetch gallery items from the database
    const galleryItems = await db
      .select()
      .from(gallery)
      .orderBy(desc(gallery.createdAt));

    return Response.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/gallery - Create a new gallery item
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_development');
    } catch (error) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { imageUrl, caption, isFeatured } = body;

    // Validate required fields
    if (!imageUrl) {
      return Response.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Insert the new gallery item into the database
    const [newGalleryItem] = await db
      .insert(gallery)
      .values({
        imageUrl,
        caption: caption || null,
        isFeatured: isFeatured || false,
      })
      .returning();

    return Response.json(newGalleryItem);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}