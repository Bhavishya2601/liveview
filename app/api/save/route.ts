import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CodeModel from '@/models/Code';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { htmlCode, cssCode, jsCode } = body;
    if (htmlCode === undefined || cssCode === undefined || jsCode === undefined) {

      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await connectToDatabase();

    const newCode = new CodeModel({
      html: htmlCode,
      css: cssCode,
      js: jsCode,
    });
    await newCode.save();
    return NextResponse.json(newCode, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to save code' }, { status: 500 });
  }
}
