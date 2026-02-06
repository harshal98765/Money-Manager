import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { setUser, userExists } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    console.log('[v0] Register attempt:', { email, name });

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (userExists(email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    console.log('[v0] Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[v0] Password hashed successfully');

    // Create user
    const userData = {
      email,
      name,
      password: hashedPassword,
      createdAt: new Date(),
    };
    
    console.log('[v0] About to save user:', { email, name });
    setUser(email, userData);
    console.log('[v0] User registered successfully:', email);

    // Set session cookie
    const response = NextResponse.json(
      { 
        message: 'User created successfully',
        userId: email 
      },
      { status: 201 }
    );

    response.cookies.set('userId', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[v0] Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
