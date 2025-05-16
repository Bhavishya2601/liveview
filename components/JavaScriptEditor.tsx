"use client"

import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { EditorView } from '@codemirror/view'
import Image from 'next/image'

interface JavaScriptEditorProps {
    value: string
    onChange: (value: string) => void
}

const JavaScriptEditor: React.FC<JavaScriptEditorProps> = ({ value, onChange }) => {
    return (
        <div className='h-full bg-black overflow-auto custom-scrollbar'>
<div className='flex gap-2 items-center p-2 text-gray-300'>
                <Image
                    src="images/javascript.svg"
                    alt="JavaScript"
                    width={20}
                    height={20}
                />
                <div className='font-semibold text-lg'>JS</div>
            </div>            <CodeMirror
                value={value}
                theme={vscodeDark}
                extensions={[
                    javascript(),
                    EditorView.lineWrapping
                ]}
                onChange={(value) => {
                    onChange(value);
                }}
            />
        </div>
    )
}

export default JavaScriptEditor