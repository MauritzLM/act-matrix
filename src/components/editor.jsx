
import { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

export default function TextEditor() {
    const [editor] = useState(() => withReact(createEditor()))

    return (
        <Slate editor={editor} initialValue={initialValue} >
            <Editable   onKeyDown={event => {
            if (event.key === '&') {
              // Prevent the ampersand character from being inserted.
              event.preventDefault()
              // Execute the `insertText` method when the event occurs.
              editor.insertText('and')
            }
            }}
            />
        </Slate>
    )
}
