import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CodeModel from '@/models/Code';

export async function POST(request: Request) {
    try {
        const { slug } = await request.json();

        if (slug === undefined) {
            return NextResponse.json({ error: 'Missing user details' }, { status: 400 });
        }
        await connectToDatabase();

        const Code = await CodeModel.find({ slug }).lean();

        return NextResponse.json(Code, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch code' }, { status: 500 });
    }
}