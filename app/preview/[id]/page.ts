import React from 'react';
import connectToDatabase from '@/lib/mongodb';
import { CodeModel } from '@/lib/mongodb';

export default async function PreviewPage({ params }: { params: Promise<{id: string}> }) {
  await connectToDatabase();

  const {id} = await params;
  const code = await CodeModel.findById(id).lean();

  if (!code || Array.isArray(code)) {
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
