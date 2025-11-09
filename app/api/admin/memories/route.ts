import { NextRequest } from 'next/server';
import { db } from '@/db';
import { memories, gallery, quotes } from '@/db/schema/romantic';
import { eq, desc } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/memories - Get all memories
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

    // Fetch memories from the database
    const memoriesList = await db
      .select()
      .from(memories)
      .orderBy(desc(memories.createdAt));

    return Response.json(memoriesList);
  } catch (error) {
    console.error('Error fetching memories:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/memories - Create a new memory
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
    const { title, content, date, imageUrl } = body;

    // Validate required fields
    if (!title || !content || !date) {
      return Response.json({ error: 'Title, content, and date are required' }, { status: 400 });
    }

    // Insert the new memory into the database
    const [newMemory] = await db
      .insert(memories)
      .values({
        title,
        content,
        date: new Date(date),
        imageUrl: imageUrl || null,
      })
      .returning();

    return Response.json(newMemory);
  } catch (error) {
    console.error('Error creating memory:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}