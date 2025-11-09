import { NextRequest } from 'next/server';
import { db } from '@/db';
import { memories } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { unstable_noStore as noStore } from 'next/cache';

// GET /api/admin/memories/[id] - Get a specific memory
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

    const memoryId = parseInt(params.id);
    if (isNaN(memoryId)) {
      return Response.json({ error: 'Invalid memory ID' }, { status: 400 });
    }

    // Fetch the specific memory from the database
    const [memory] = await db
      .select()
      .from(memories)
      .where(eq(memories.id, memoryId));

    if (!memory) {
      return Response.json({ error: 'Memory not found' }, { status: 404 });
    }

    return Response.json(memory);
  } catch (error) {
    console.error('Error fetching memory:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/memories/[id] - Update a specific memory
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

    const memoryId = parseInt(params.id);
    if (isNaN(memoryId)) {
      return Response.json({ error: 'Invalid memory ID' }, { status: 400 });
    }

    const body = await request.json();
    const { title, content, date, imageUrl } = body;

    // Validate required fields
    if (!title || !content || !date) {
      return Response.json({ error: 'Title, content, and date are required' }, { status: 400 });
    }

    // Update the memory in the database
    const [updatedMemory] = await db
      .update(memories)
      .set({
        title,
        content,
        date: new Date(date),
        imageUrl: imageUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(memories.id, memoryId))
      .returning();

    if (!updatedMemory) {
      return Response.json({ error: 'Memory not found' }, { status: 404 });
    }

    return Response.json(updatedMemory);
  } catch (error) {
    console.error('Error updating memory:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/memories/[id] - Delete a specific memory
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

    const memoryId = parseInt(params.id);
    if (isNaN(memoryId)) {
      return Response.json({ error: 'Invalid memory ID' }, { status: 400 });
    }

    // Delete the memory from the database
    const deletedMemories = await db
      .delete(memories)
      .where(eq(memories.id, memoryId))
      .returning();

    if (deletedMemories.length === 0) {
      return Response.json({ error: 'Memory not found' }, { status: 404 });
    }

    return Response.json({ message: 'Memory deleted successfully' });
  } catch (error) {
    console.error('Error deleting memory:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}