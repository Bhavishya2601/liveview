'use client';

import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { EditorView } from '@codemirror/view';
import Image from 'next/image';

interface CssEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CssEditor: React.FC<CssEditorProps> = ({ value, onChange }) => {
  return (
    <div className="h-full bg-black overflow-auto custom-scrollbar px-2">
      <div className="flex gap-2 items-center p-2 text-gray-300">
        <Image src="images/css.svg" alt="css" width={20} height={20} />
        <div className="font-semibold text-lg">CSS</div>
      </div>
      <CodeMirror
        value={value}
        theme={vscodeDark}
        extensions={[css(), EditorView.lineWrapping]}
        onChange={(value) => {
          onChange(value);
        }}
      />
    </div>
  );
};

export default CssEditor;
