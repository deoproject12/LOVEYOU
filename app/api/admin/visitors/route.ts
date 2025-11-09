import { NextRequest } from 'next/server';
import { db } from '@/db';
import { visitors } from '@/db/schema/romantic';
import { eq, desc } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/visitors - Get all visitors
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

    // Fetch visitors from the database
    const visitorsList = await db
      .select()
      .from(visitors)
      .orderBy(desc(visitors.visitedAt));

    return Response.json(visitorsList);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/visitors - Create a new visitor record
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
    const { ip, userAgent, verified } = body;

    // Insert the new visitor into the database
    const [newVisitor] = await db
      .insert(visitors)
      .values({
        ip: ip || null,
        userAgent: userAgent || null,
        verified: verified || false,
      })
      .returning();

    return Response.json(newVisitor);
  } catch (error) {
    console.error('Error creating visitor:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}