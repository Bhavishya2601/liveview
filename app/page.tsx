"use client"

import React, { useState } from 'react';
import Header from "@/components/Header"
import CssEditor from "@/components/CssEditor"
import HtmlEditor from "@/components/HtmlEditor"
import JavaScriptEditor from "@/components/JavaScriptEditor"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"

export default function Home() {
  const [htmlCode, setHtmlCode] = useState("")
  const [cssCode, setCssCode] = useState("")
  const [jsCode, setJsCode] = useState("")

  return (
    <div>
      <Header />
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[calc(100vh-4rem)] min-w-full"
    >
      <ResizablePanel defaultSize={65} minSize={30}>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-full"
        >
          <ResizablePanel defaultSize={33} minSize={20}>
            <HtmlEditor value={htmlCode} onChange={setHtmlCode} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={34} minSize={20}>
            <CssEditor value={cssCode} onChange={setCssCode} />
          </ResizablePanel>

          <ResizableHandle withHandle />

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
  )
}
