import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CodeModel from '@/models/Code';

export async function POST(request: Request) {
  try {
    const {userId} = await request.json();
    if (userId === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await connectToDatabase();
    const projects = await CodeModel.find({ userId }).lean();
    return NextResponse.json(projects, { status: 200 });
} catch (err){
    console.log(err)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
}
}