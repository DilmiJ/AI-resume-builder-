import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resume from '@/models/Resume';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get user's resumes
    const resumes = await Resume.find({ userId: payload.userId })
      .select('-__v')
      .sort({ updatedAt: -1 });

    return NextResponse.json({ resumes });

  } catch (error) {
    console.error('Get resumes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const resumeData = await request.json();

    // Validate required fields
    if (!resumeData.title || !resumeData.personalInfo) {
      return NextResponse.json(
        { error: 'Title and personal information are required' },
        { status: 400 }
      );
    }

    // Create new resume
    const resume = new Resume({
      ...resumeData,
      userId: payload.userId,
    });

    await resume.save();

    return NextResponse.json({
      message: 'Resume created successfully',
      resume,
    }, { status: 201 });

  } catch (error) {
    console.error('Create resume error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
