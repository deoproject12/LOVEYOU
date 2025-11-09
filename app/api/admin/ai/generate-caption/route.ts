import { NextRequest } from 'next/server';
import { db } from '@/db';
import { aiCaptions, gallery, memories } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// POST /api/admin/ai/generate-caption - Generate a caption for an image
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
    const { imageId, memoryId, imageUrl } = body;

    // Validate input
    if (!imageUrl) {
      return Response.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // In a real implementation, this would call an AI service like OpenAI
    // For this demo, we'll generate a mock caption based on the image URL
    const mockCaptions = [
      "Momen indah yang tak terlupakan bersamamu",
      "Senyummu selalu menghiasi hari-hariku",
      "Setiap detik bersamamu adalah kebahagiaan yang nyata",
      "Cinta yang tumbuh dalam setiap pandangan",
      "Kenangan yang akan selalu kusimpan dalam hati",
      "Kisah cinta yang indah dimulai dari sini",
      "Kamu adalah pelengkap hari-hariku yang sempurna",
      "Kebersamaan yang penuh cinta dan kehangatan"
    ];

    // Select a random caption from our mock list
    const randomCaption = mockCaptions[Math.floor(Math.random() * mockCaptions.length)];

    // Save the generated caption to the database
    const [newCaption] = await db
      .insert(aiCaptions)
      .values({
        imageId: imageId || null,
        memoryId: memoryId || null,
        caption: randomCaption,
        modelUsed: 'Mock-AI-v1', // In real app, would be the actual AI model used
      })
      .returning();

    return Response.json({
      caption: randomCaption,
      ...newCaption
    });
  } catch (error) {
    console.error('Error generating caption:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/admin/ai/captions - Get all AI-generated captions
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

    // Fetch AI captions from the database
    const captions = await db
      .select()
      .from(aiCaptions)
      .orderBy(aiCaptions.generatedAt);

    return Response.json(captions);
  } catch (error) {
    console.error('Error fetching AI captions:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}