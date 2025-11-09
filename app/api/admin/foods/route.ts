import { NextRequest } from 'next/server';
import { db } from '@/db';
import { favoriteFoods } from '@/db/schema/romantic';
import { eq, desc } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/foods - Get all favorite foods
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

    // Fetch favorite foods from the database
    const foods = await db
      .select()
      .from(favoriteFoods)
      .orderBy(desc(favoriteFoods.createdAt));

    return Response.json(foods);
  } catch (error) {
    console.error('Error fetching favorite foods:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/foods - Create a new favorite food
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
    const { name, description, imageUrl, isFeatured } = body;

    // Validate required fields
    if (!name) {
      return Response.json({ error: 'Food name is required' }, { status: 400 });
    }

    // Insert the new food into the database
    const [newFood] = await db
      .insert(favoriteFoods)
      .values({
        name,
        description: description || null,
        imageUrl: imageUrl || null,
        isFeatured: isFeatured || false,
      })
      .returning();

    return Response.json(newFood);
  } catch (error) {
    console.error('Error creating favorite food:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}