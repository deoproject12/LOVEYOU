import { NextRequest } from 'next/server';
import { db } from '@/db';
import { adminUsers } from '@/db/schema/romantic';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find the admin user by email
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));

    if (!user) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        name: user.name,
        role: 'admin' 
      },
      process.env.JWT_SECRET || 'fallback_secret_for_development',
      { expiresIn: '24h' }
    );

    // Update last login time
    await db.update(adminUsers).set({ lastLogin: new Date() }).where(eq(adminUsers.id, user.id));

    return Response.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}