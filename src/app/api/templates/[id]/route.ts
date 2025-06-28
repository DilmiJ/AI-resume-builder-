import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Template from '@/models/Template';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const template = await Template.findById(params.id);
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      template,
      success: true,
    });
    
  } catch (error) {
    console.error('Get template error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template', success: false },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    // This would typically require admin authentication
    const updateData = await request.json();
    
    const template = await Template.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Template updated successfully',
      template,
      success: true,
    });
    
  } catch (error) {
    console.error('Update template error:', error);
    return NextResponse.json(
      { error: 'Failed to update template', success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    // This would typically require admin authentication
    const template = await Template.findByIdAndDelete(params.id);
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Template deleted successfully',
      success: true,
    });
    
  } catch (error) {
    console.error('Delete template error:', error);
    return NextResponse.json(
      { error: 'Failed to delete template', success: false },
      { status: 500 }
    );
  }
}
