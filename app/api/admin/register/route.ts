import { NextRequest } from 'next/server';
import { db } from '@/db';
import { adminUsers } from '@/db/schema/romantic';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return Response.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Check if admin user already exists
    const existingUsers = await db.select().from(adminUsers);
    if (existingUsers.length > 0) {
      return Response.json(
        { error: 'Admin user already exists. Only one admin account is allowed.' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const [newAdmin] = await db.insert(adminUsers).values({
      email,
      password: hashedPassword,
      name,
    }).returning();

    // Return success response without password
    const { password: _, ...adminWithoutPassword } = newAdmin;

    return Response.json({
      message: 'Admin user created successfully',
      user: adminWithoutPassword
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}