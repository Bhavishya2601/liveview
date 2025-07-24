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
    const project = await CodeModel.findOne({ slug, userId: user.id });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({
      _id: project._id,
      htmlCode: project.html,
      cssCode: project.css,
      jsCode: project.js,
      name: project.name,
      slug: project.slug
    });
  } catch (error) {
    console.error('Error fetching project code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
