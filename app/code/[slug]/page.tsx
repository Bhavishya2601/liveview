'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import CssEditor from '@/components/CssEditor';
import HtmlEditor from '@/components/HtmlEditor';
import JavaScriptEditor from '@/components/JavaScriptEditor';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/Resizable';
import {useUser} from '@clerk/nextjs';
import toast from 'react-hot-toast';

export default function Home() {
  const {user} = useUser()
  const router = useRouter()
  const params = useParams();
  const slug = params.slug
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [projectId, setProjectId] = useState('');

  useEffect(()=>{
    if (user?.id) {
      fetch("/api/projectCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: slug,
          userId: user?.id
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            toast.error("You do not have access to this project or it does not exist", {
              style: {
                maxWidth: '600px',
                whiteSpace: 'nowrap',
              },
            });
            router.push('/');
            return;
          }
          setHtmlCode(data.htmlCode)
          setCssCode(data.cssCode)
          setJsCode(data.jsCode)
          setProjectId(data._id)
        })
        .catch(error => {
          toast.error(error.message);
          router.push('/');
        });
    }
  }, [user?.id, slug])

  return (
    <div>
      <Header 
        htmlCode={htmlCode}
        cssCode={cssCode}
        jsCode={jsCode}
        slug={slug as string}
        projectId={projectId}
      />
      <ResizablePanelGroup direction="vertical" className="min-h-[calc(100vh-4rem)] min-w-full">
        <ResizablePanel defaultSize={65} minSize={30}>
          <ResizablePanelGroup direction="horizontal" className="min-h-full">
            <ResizablePanel defaultSize={33} minSize={20}>
              <HtmlEditor value={htmlCode} onChange={setHtmlCode} />
            </ResizablePanel>

            <ResizableHandle withHandle className='hover:bg-slate-800 bg-slate-700'  />

            <ResizablePanel defaultSize={34} minSize={20}>
              <CssEditor value={cssCode} onChange={setCssCode} />
            </ResizablePanel>

            <ResizableHandle withHandle className='hover:bg-slate-800 bg-slate-700' />

            <ResizablePanel defaultSize={33} minSize={20}>
              <JavaScriptEditor value={jsCode} onChange={setJsCode} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={35} minSize={10}>
          <div className="h-full w-full bg-white">
            <iframe
              className="w-full h-full border-0"
              srcDoc={`
              <!DOCTYPE html>
              <html lang="en">
              <head>
              <style>${cssCode}</style>
              </head>
        <body>
          ${htmlCode}
          <script>
            try {
              ${jsCode}
            } catch (e) {
              document.body.innerHTML += '<pre style="color: red;">' + e + '</pre>';
            }
          </script>
        </body>
        </html>
        `}
              sandbox="allow-scripts"
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
