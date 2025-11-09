import { NextRequest } from 'next/server';
import { db } from '@/db';
import { memoryBooks } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { unstable_noStore as noStore } from 'next/cache';

// GET /api/admin/memory-books/[id] - Get a specific memory book
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

    const memoryBookId = parseInt(params.id);
    if (isNaN(memoryBookId)) {
      return Response.json({ error: 'Invalid memory book ID' }, { status: 400 });
    }

    // Fetch the specific memory book from the database
    const [memoryBook] = await db
      .select()
      .from(memoryBooks)
      .where(eq(memoryBooks.id, memoryBookId));

    if (!memoryBook) {
      return Response.json({ error: 'Memory book not found' }, { status: 404 });
    }

    return Response.json(memoryBook);
  } catch (error) {
    console.error('Error fetching memory book:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/memory-books/[id] - Update a specific memory book
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

    const memoryBookId = parseInt(params.id);
    if (isNaN(memoryBookId)) {
      return Response.json({ error: 'Invalid memory book ID' }, { status: 400 });
    }

    const body = await request.json();
    const { title, content, date, imageUrl } = body;

    // Validate required fields
    if (!title || !content) {
      return Response.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Update the memory book in the database
    const [updatedMemoryBook] = await db
      .update(memoryBooks)
      .set({
        title,
        content,
        date: date ? new Date(date) : null,
        imageUrl: imageUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(memoryBooks.id, memoryBookId))
      .returning();

    if (!updatedMemoryBook) {
      return Response.json({ error: 'Memory book not found' }, { status: 404 });
    }

    return Response.json(updatedMemoryBook);
  } catch (error) {
    console.error('Error updating memory book:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/memory-books/[id] - Delete a specific memory book
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

    const memoryBookId = parseInt(params.id);
    if (isNaN(memoryBookId)) {
      return Response.json({ error: 'Invalid memory book ID' }, { status: 400 });
    }

    // Delete the memory book from the database
    const deletedMemoryBooks = await db
      .delete(memoryBooks)
      .where(eq(memoryBooks.id, memoryBookId))
      .returning();

    if (deletedMemoryBooks.length === 0) {
      return Response.json({ error: 'Memory book not found' }, { status: 404 });
    }

    return Response.json({ message: 'Memory book deleted successfully' });
  } catch (error) {
    console.error('Error deleting memory book:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}