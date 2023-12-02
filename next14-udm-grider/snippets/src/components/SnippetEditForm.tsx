'use client'

import { Editor } from '@monaco-editor/react';
import type { Snippet } from '@prisma/client';
import { useState } from 'react';
import { updateSnippet } from '../app/actions';

interface Props { snippet: Snippet }

export default function SnippetEditForm({ snippet }: Props) {
    const [code, setCode] = useState(snippet.code);

    const handleEditorChange = async (value: string = '') => setCode(value)

    const editSnippetAction = updateSnippet.bind(null, snippet.id, code);

    return (
        <div>
            <Editor
                height="40vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={handleEditorChange}
                options={{ minimap: { enabled: false } }}
            />
            <form action={editSnippetAction}>
                <button type='submit' className='p-2 border rounded'>
                    Save
                </button>
            </form>
        </div>
    )
}
