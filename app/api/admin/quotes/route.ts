import { NextRequest } from 'next/server';
import { db } from '@/db';
import { quotes } from '@/db/schema/romantic';
import { eq, desc } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/quotes - Get all quotes
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

    // Fetch quotes from the database
    const quotesList = await db
      .select()
      .from(quotes)
      .orderBy(desc(quotes.createdAt));

    return Response.json(quotesList);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/quotes - Create a new quote
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
    const { text, author, isFeatured } = body;

    // Validate required fields
    if (!text) {
      return Response.json({ error: 'Quote text is required' }, { status: 400 });
    }

    // Insert the new quote into the database
    const [newQuote] = await db
      .insert(quotes)
      .values({
        text,
        author: author || null,
        isFeatured: isFeatured || false,
      })
      .returning();

    return Response.json(newQuote);
  } catch (error) {
    console.error('Error creating quote:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}