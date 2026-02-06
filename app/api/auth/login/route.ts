import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUser } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('[v0] Login attempt:', { email });

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      );
    }

    const user = getUser(email);
    if (!user) {
      console.log('[v0] User not found in storage:', email);
      console.log('[v0] getUser returned:', user);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('[v0] User found, checking password...');
    console.log('[v0] Stored password hash exists:', !!user.password);
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('[v0] Password match result:', passwordMatch);
    if (!passwordMatch) {
      console.log('[v0] Password mismatch for user:', email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('[v0] Login successful for user:', email);

    // Create session token
    const token = Buffer.from(
      JSON.stringify({
        userId: email,
        email: user.email,
        name: user.name,
        iat: Date.now(),
      })
    ).toString('base64');

    const response = NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: {
          id: email,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );

    // Set secure cookie
    response.cookies.set('userId', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[v0] Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
