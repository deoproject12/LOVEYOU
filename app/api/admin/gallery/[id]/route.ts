import { NextRequest } from 'next/server';
import { db } from '@/db';
import { gallery } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { unstable_noStore as noStore } from 'next/cache';

// GET /api/admin/gallery/[id] - Get a specific gallery item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  noStore(); // Prevent caching
  
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

    const galleryId = parseInt(params.id);
    if (isNaN(galleryId)) {
      return Response.json({ error: 'Invalid gallery ID' }, { status: 400 });
    }

    // Fetch the specific gallery item from the database
    const [galleryItem] = await db
      .select()
      .from(gallery)
      .where(eq(gallery.id, galleryId));

    if (!galleryItem) {
      return Response.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return Response.json(galleryItem);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/gallery/[id] - Update a specific gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const galleryId = parseInt(params.id);
    if (isNaN(galleryId)) {
      return Response.json({ error: 'Invalid gallery ID' }, { status: 400 });
    }

    const body = await request.json();
    const { imageUrl, caption, isFeatured } = body;

    // Validate required fields
    if (!imageUrl) {
      return Response.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Update the gallery item in the database
    const [updatedGalleryItem] = await db
      .update(gallery)
      .set({
        imageUrl,
        caption: caption || null,
        isFeatured: isFeatured || false,
        updatedAt: new Date(),
      })
      .where(eq(gallery.id, galleryId))
      .returning();

    if (!updatedGalleryItem) {
      return Response.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return Response.json(updatedGalleryItem);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/gallery/[id] - Delete a specific gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const galleryId = parseInt(params.id);
    if (isNaN(galleryId)) {
      return Response.json({ error: 'Invalid gallery ID' }, { status: 400 });
    }

    // Delete the gallery item from the database
    const deletedGalleryItems = await db
      .delete(gallery)
      .where(eq(gallery.id, galleryId))
      .returning();

    if (deletedGalleryItems.length === 0) {
      return Response.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return Response.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}