import { NextRequest } from 'next/server';
import { db } from '@/db';
import { favoriteSongs } from '@/db/schema/romantic';
import { eq, desc } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/songs - Get all favorite songs
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

    // Fetch favorite songs from the database
    const songs = await db
      .select()
      .from(favoriteSongs)
      .orderBy(desc(favoriteSongs.createdAt));

    return Response.json(songs);
  } catch (error) {
    console.error('Error fetching favorite songs:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/songs - Create a new favorite song
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
    const { title, artist, youtubeUrl, description, isFeatured } = body;

    // Validate required fields
    if (!title) {
      return Response.json({ error: 'Song title is required' }, { status: 400 });
    }

    // Insert the new song into the database
    const [newSong] = await db
      .insert(favoriteSongs)
      .values({
        title,
        artist: artist || null,
        youtubeUrl: youtubeUrl || null,
        description: description || null,
        isFeatured: isFeatured || false,
      })
      .returning();

    return Response.json(newSong);
  } catch (error) {
    console.error('Error creating favorite song:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}