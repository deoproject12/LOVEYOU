import { NextRequest } from 'next/server';
import { db } from '@/db';
import { pageContent } from '@/db/schema/romantic';
import { eq, desc } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// GET /api/admin/page-content - Get all page content or content for a specific page
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

    const url = new URL(request.url);
    const pageName = url.searchParams.get('pageName'); // Optional parameter to get specific page content

    let contentItems;
    if (pageName) {
      // Fetch content for a specific page
      contentItems = await db
        .select()
        .from(pageContent)
        .where(eq(pageContent.pageName, pageName))
        .orderBy(desc(pageContent.updatedAt));
    } else {
      // Fetch all page content
      contentItems = await db
        .select()
        .from(pageContent)
        .orderBy(desc(pageContent.updatedAt));
    }

    return Response.json(contentItems);
  } catch (error) {
    console.error('Error fetching page content:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/page-content - Create or update page content
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
    const { pageName, title, subtitle, content, imageUrl, heroImageUrl, metaDescription, isPublished } = body;

    // Validate required fields
    if (!pageName) {
      return Response.json({ error: 'Page name is required' }, { status: 400 });
    }

    // Check if content for this page already exists
    const existingContent = await db
      .select()
      .from(pageContent)
      .where(eq(pageContent.pageName, pageName))
      .limit(1);

    let result;
    if (existingContent.length > 0) {
      // Update existing content
      result = await db
        .update(pageContent)
        .set({
          title,
          subtitle,
          content,
          imageUrl,
          heroImageUrl,
          metaDescription,
          isPublished,
          updatedAt: new Date(),
        })
        .where(eq(pageContent.pageName, pageName))
        .returning();
    } else {
      // Create new content
      result = await db
        .insert(pageContent)
        .values({
          pageName,
          title: title || null,
          subtitle: subtitle || null,
          content: content || null,
          imageUrl: imageUrl || null,
          heroImageUrl: heroImageUrl || null,
          metaDescription: metaDescription || null,
          isPublished: isPublished !== undefined ? isPublished : true,
        })
        .returning();
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error('Error creating/updating page content:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}