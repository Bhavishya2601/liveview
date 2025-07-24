import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';
import { CodeModel } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug, htmlCode, cssCode, jsCode } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    await connectToDatabase();

    const updatedProject = await CodeModel.findOneAndUpdate(
      { slug, userId: user.id },
      { 
        html: htmlCode || '',
        css: cssCode || '',
        js: jsCode || '',
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Project saved successfully',
      project: updatedProject
    });
  } catch (error) {
    console.error('Error saving project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
