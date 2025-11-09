import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simple authentication: username is 'abdullah' and password is 'abdullah123'
    // Using email field to pass username for compatibility with form
    if (email === 'abdullah' && password === 'abdullah123') {
      // Return success response with mock user data
      return NextResponse.json({
        success: true,
        user: {
          id: 1,
          username: 'abdullah',
          name: 'Abdullah Admin'
        }
      });
    } else {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}