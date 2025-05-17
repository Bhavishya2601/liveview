import React from 'react';
import connectToDatabase from '@/lib/mongodb';
import CodeModel from '@/models/Code';

export default async function PreviewPage({ params }: { params: { id: string } }) {
  await connectToDatabase();

  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const code = await CodeModel.findById(id).lean();

  if (!code) {
    return React.createElement('div', null, 'Code not found');
  }

  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
            ${code.css}
        </style>
    </head>
    <body>
        ${code.html}
        <script>
            ${code.js}
        </script>
    </body>
    </html>
        `;
  return React.createElement('iframe', {
    sandbox: 'allow-scripts',
    srcDoc: content,
    style: { width: '100%', height: '100vh', border: 'none' },
  });
}
