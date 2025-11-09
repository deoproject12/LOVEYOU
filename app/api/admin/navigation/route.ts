import { NextRequest } from 'next/server';
import { db } from '@/db';
import { navigation } from '@/db/schema/romantic';
import { eq, desc, and } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/navigation - Get all navigation items
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

    // Fetch navigation items from the database ordered by 'order' field
    const navItems = await db
      .select()
      .from(navigation)
      .orderBy(navigation.order);

    return Response.json(navItems);
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/navigation - Create a new navigation item
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
    const { title, path, icon, order, isVisible } = body;

    // Validate required fields
    if (!title || !path) {
      return Response.json({ error: 'Title and path are required' }, { status: 400 });
    }

    // Insert the new navigation item into the database
    const [newNavItem] = await db
      .insert(navigation)
      .values({
        title,
        path,
        icon: icon || null,
        order: order || 0,
        isVisible: isVisible !== undefined ? isVisible : true,
      })
      .returning();

    return Response.json(newNavItem, { status: 201 });
  } catch (error) {
    console.error('Error creating navigation item:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}