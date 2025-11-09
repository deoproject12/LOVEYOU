import { NextRequest } from 'next/server';
import { db } from '@/db';
import { favoriteSongs } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { unstable_noStore as noStore } from 'next/cache';

// GET /api/admin/songs/[id] - Get a specific favorite song
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

    const songId = parseInt(params.id);
    if (isNaN(songId)) {
      return Response.json({ error: 'Invalid song ID' }, { status: 400 });
    }

    // Fetch the specific song from the database
    const [song] = await db
      .select()
      .from(favoriteSongs)
      .where(eq(favoriteSongs.id, songId));

    if (!song) {
      return Response.json({ error: 'Favorite song not found' }, { status: 404 });
    }

    return Response.json(song);
  } catch (error) {
    console.error('Error fetching favorite song:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/songs/[id] - Update a specific favorite song
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

    const songId = parseInt(params.id);
    if (isNaN(songId)) {
      return Response.json({ error: 'Invalid song ID' }, { status: 400 });
    }

    const body = await request.json();
    const { title, artist, youtubeUrl, description, isFeatured } = body;

    // Validate required fields
    if (!title) {
      return Response.json({ error: 'Song title is required' }, { status: 400 });
    }

    // Update the song in the database
    const [updatedSong] = await db
      .update(favoriteSongs)
      .set({
        title,
        artist: artist || null,
        youtubeUrl: youtubeUrl || null,
        description: description || null,
        isFeatured: isFeatured || false,
        updatedAt: new Date(),
      })
      .where(eq(favoriteSongs.id, songId))
      .returning();

    if (!updatedSong) {
      return Response.json({ error: 'Favorite song not found' }, { status: 404 });
    }

    return Response.json(updatedSong);
  } catch (error) {
    console.error('Error updating favorite song:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/songs/[id] - Delete a specific favorite song
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

    const songId = parseInt(params.id);
    if (isNaN(songId)) {
      return Response.json({ error: 'Invalid song ID' }, { status: 400 });
    }

    // Delete the song from the database
    const deletedSongs = await db
      .delete(favoriteSongs)
      .where(eq(favoriteSongs.id, songId))
      .returning();

    if (deletedSongs.length === 0) {
      return Response.json({ error: 'Favorite song not found' }, { status: 404 });
    }

    return Response.json({ message: 'Favorite song deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite song:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}