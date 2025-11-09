import { NextRequest } from 'next/server';
import { db } from '@/db';
import { aiCaptions } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { unstable_noStore as noStore } from 'next/cache';

// GET /api/admin/ai/captions/[imageId] - Get AI caption for a specific image
export async function GET(
  request: NextRequest,
  { params }: { params: { imageId: string } }
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

    const imageId = parseInt(params.imageId);
    if (isNaN(imageId)) {
      return Response.json({ error: 'Invalid image ID' }, { status: 400 });
    }

    // Fetch the AI caption for the specific image from the database
    const captions = await db
      .select()
      .from(aiCaptions)
      .where(eq(aiCaptions.imageId, imageId));

    return Response.json(captions);
  } catch (error) {
    console.error('Error fetching AI caption for image:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}