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

    const { slug } = await request.json();
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    await connectToDatabase();

    const existingProject = await CodeModel.findOne({ slug });

    return NextResponse.json({ 
      exists: !!existingProject,
      available: !existingProject
    });
  } catch (error) {
    console.error('Error checking slug:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
