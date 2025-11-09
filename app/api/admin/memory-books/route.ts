import { NextRequest } from 'next/server';
import { db } from '@/db';
import { memoryBooks } from '@/db/schema/romantic';
import { eq, desc } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/memory-books - Get all memory books
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

    // Fetch memory books from the database
    const memoryBooksList = await db
      .select()
      .from(memoryBooks)
      .orderBy(desc(memoryBooks.createdAt));

    return Response.json(memoryBooksList);
  } catch (error) {
    console.error('Error fetching memory books:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/memory-books - Create a new memory book
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
    if (!title || !content) {
      return Response.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Insert the new memory book into the database
    const [newMemoryBook] = await db
      .insert(memoryBooks)
      .values({
        title,
        content,
        date: date ? new Date(date) : null,
        imageUrl: imageUrl || null,
      })
      .returning();

    return Response.json(newMemoryBook);
  } catch (error) {
    console.error('Error creating memory book:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}