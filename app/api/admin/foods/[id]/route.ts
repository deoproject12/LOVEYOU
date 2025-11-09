import { NextRequest } from 'next/server';
import { db } from '@/db';
import { favoriteFoods } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { unstable_noStore as noStore } from 'next/cache';

// GET /api/admin/foods/[id] - Get a specific favorite food
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

    const foodId = parseInt(params.id);
    if (isNaN(foodId)) {
      return Response.json({ error: 'Invalid food ID' }, { status: 400 });
    }

    // Fetch the specific food from the database
    const [food] = await db
      .select()
      .from(favoriteFoods)
      .where(eq(favoriteFoods.id, foodId));

    if (!food) {
      return Response.json({ error: 'Favorite food not found' }, { status: 404 });
    }

    return Response.json(food);
  } catch (error) {
    console.error('Error fetching favorite food:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/foods/[id] - Update a specific favorite food
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

    const foodId = parseInt(params.id);
    if (isNaN(foodId)) {
      return Response.json({ error: 'Invalid food ID' }, { status: 400 });
    }

    const body = await request.json();
    const { name, description, imageUrl, isFeatured } = body;

    // Validate required fields
    if (!name) {
      return Response.json({ error: 'Food name is required' }, { status: 400 });
    }

    // Update the food in the database
    const [updatedFood] = await db
      .update(favoriteFoods)
      .set({
        name,
        description: description || null,
        imageUrl: imageUrl || null,
        isFeatured: isFeatured || false,
        updatedAt: new Date(),
      })
      .where(eq(favoriteFoods.id, foodId))
      .returning();

    if (!updatedFood) {
      return Response.json({ error: 'Favorite food not found' }, { status: 404 });
    }

    return Response.json(updatedFood);
  } catch (error) {
    console.error('Error updating favorite food:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/foods/[id] - Delete a specific favorite food
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

    const foodId = parseInt(params.id);
    if (isNaN(foodId)) {
      return Response.json({ error: 'Invalid food ID' }, { status: 400 });
    }

    // Delete the food from the database
    const deletedFoods = await db
      .delete(favoriteFoods)
      .where(eq(favoriteFoods.id, foodId))
      .returning();

    if (deletedFoods.length === 0) {
      return Response.json({ error: 'Favorite food not found' }, { status: 404 });
    }

    return Response.json({ message: 'Favorite food deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite food:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}