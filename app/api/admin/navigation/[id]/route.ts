import { NextRequest } from 'next/server';
import { db } from '@/db';
import { navigation } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/navigation/[id] - Get a specific navigation item
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const id = parseInt(params.id);

    // Fetch the specific navigation item from the database
    const navItem = await db
      .select()
      .from(navigation)
      .where(eq(navigation.id, id))
      .limit(1);

    if (navItem.length === 0) {
      return Response.json({ error: 'Navigation item not found' }, { status: 404 });
    }

    return Response.json(navItem[0]);
  } catch (error) {
    console.error('Error fetching navigation item:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/navigation/[id] - Update a navigation item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const id = parseInt(params.id);
    const body = await request.json();
    const { title, path, icon, order, isVisible } = body;

    // Validate required fields
    if (!title || !path) {
      return Response.json({ error: 'Title and path are required' }, { status: 400 });
    }

    // Update the navigation item in the database
    const updatedItems = await db
      .update(navigation)
      .set({
        title,
        path,
        icon: icon || null,
        order: order || 0,
        isVisible: isVisible !== undefined ? isVisible : true,
        updatedAt: new Date(),
      })
      .where(eq(navigation.id, id))
      .returning();

    if (updatedItems.length === 0) {
      return Response.json({ error: 'Navigation item not found' }, { status: 404 });
    }

    return Response.json(updatedItems[0]);
  } catch (error) {
    console.error('Error updating navigation item:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/navigation/[id] - Delete a navigation item
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const id = parseInt(params.id);

    // Delete the navigation item from the database
    const deletedItems = await db
      .delete(navigation)
      .where(eq(navigation.id, id))
      .returning();

    if (deletedItems.length === 0) {
      return Response.json({ error: 'Navigation item not found' }, { status: 404 });
    }

    return Response.json({ message: 'Navigation item deleted successfully' });
  } catch (error) {
    console.error('Error deleting navigation item:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}