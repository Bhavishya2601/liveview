'use client';

import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { EditorView } from '@codemirror/view';
import Image from 'next/image';

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({ value, onChange }) => {
  return (
    <div className="h-full bg-black overflow-auto custom-scrollbar px-2">
      <div className="flex gap-2 items-center p-2 text-gray-300">
        <Image src="images/html.svg" alt="html" width={20} height={20} />
        <div className="font-semibold text-lg">HTML</div>
      </div>
      <CodeMirror
        value={value}
        theme={vscodeDark}
        extensions={[html(), EditorView.lineWrapping]}
        onChange={(value) => {
          onChange(value);
        }}
      />
    </div>
  );
};

export default HtmlEditor;
