import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { CodeModel } from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { projectName, projectSlug, htmlCode, cssCode, jsCode, userId } = body;
        if (!userId || !projectName || !projectSlug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        
        await connectToDatabase(); 
        const newProject = new CodeModel({
            name: projectName,
            slug: projectSlug,
            html: htmlCode || '',
            css: cssCode || '',
            js: jsCode || '',
            userId
        })
        await newProject.save();

        return NextResponse.json({ message: 'Project created successfully', project: newProject }, { status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Failed to save code' }, { status: 500 });
    }
}