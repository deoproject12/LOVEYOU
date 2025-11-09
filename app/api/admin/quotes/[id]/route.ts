import { NextRequest } from 'next/server';
import { db } from '@/db';
import { quotes } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { unstable_noStore as noStore } from 'next/cache';

// GET /api/admin/quotes/[id] - Get a specific quote
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

    const quoteId = parseInt(params.id);
    if (isNaN(quoteId)) {
      return Response.json({ error: 'Invalid quote ID' }, { status: 400 });
    }

    // Fetch the specific quote from the database
    const [quote] = await db
      .select()
      .from(quotes)
      .where(eq(quotes.id, quoteId));

    if (!quote) {
      return Response.json({ error: 'Quote not found' }, { status: 404 });
    }

    return Response.json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/quotes/[id] - Update a specific quote
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

    const quoteId = parseInt(params.id);
    if (isNaN(quoteId)) {
      return Response.json({ error: 'Invalid quote ID' }, { status: 400 });
    }

    const body = await request.json();
    const { text, author, isFeatured } = body;

    // Validate required fields
    if (!text) {
      return Response.json({ error: 'Quote text is required' }, { status: 400 });
    }

    // Update the quote in the database
    const [updatedQuote] = await db
      .update(quotes)
      .set({
        text,
        author: author || null,
        isFeatured: isFeatured || false,
        updatedAt: new Date(),
      })
      .where(eq(quotes.id, quoteId))
      .returning();

    if (!updatedQuote) {
      return Response.json({ error: 'Quote not found' }, { status: 404 });
    }

    return Response.json(updatedQuote);
  } catch (error) {
    console.error('Error updating quote:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/quotes/[id] - Delete a specific quote
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

    const quoteId = parseInt(params.id);
    if (isNaN(quoteId)) {
      return Response.json({ error: 'Invalid quote ID' }, { status: 400 });
    }

    // Delete the quote from the database
    const deletedQuotes = await db
      .delete(quotes)
      .where(eq(quotes.id, quoteId))
      .returning();

    if (deletedQuotes.length === 0) {
      return Response.json({ error: 'Quote not found' }, { status: 404 });
    }

    return Response.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}