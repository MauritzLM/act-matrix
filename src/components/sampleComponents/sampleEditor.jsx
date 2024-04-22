import '../../assets/sass/editor.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import PropTypes from 'prop-types'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <>
      <div className='menubar'>
        <div className='button-group'>
          <button title='bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <img alt='bold' src='./src/assets/svgs/format_bold.svg' aria-hidden='true'></img>
          </button>
          <button title='italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <img alt='italic' src='./src/assets/svgs/format_italic.svg' aria-hidden='true'></img>
          </button>
          <button title='strikethrough'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <img alt='strikethrough' src='./src/assets/svgs/format_strikethrough.svg' aria-hidden='true'></img>
          </button>
          <button title='paragraph'
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            <img alt='paragraph' src='./src/assets/svgs/format_paragraph.svg' aria-hidden='true'></img>
          </button>
          {/* code
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''} 
      > 
          </button>
          */}

          <button title='bulleted list'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <img alt='bullet list' src='./src/assets/svgs/format_list_bulleted.svg' aria-hidden='true'></img>
          </button>
          <button title='ordered list'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            <img alt='ordered list' src='./src/assets/svgs/format_list_numbered.svg' aria-hidden='true'></img>
          </button>
          {/* <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
             code block
      </button> */}
          <button title='blockquote'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <img alt='blockqoute' src='./src/assets/svgs/format_quote.svg' aria-hidden='true'></img>
          </button>
        </div>

        <div className='button-group'>
          <button title='heading 1'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            <img alt='heading 1' src='./src/assets/svgs/format_h1.svg' aria-hidden='true'></img>
          </button>
          <button title='heading 2'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            <img alt='heading 2' src='./src/assets/svgs/format_h2.svg' aria-hidden='true'></img>
          </button>
          <button title='heading 3'
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            <img alt='heading 3' src='./src/assets/svgs/format_h3.svg' aria-hidden='true'></img>
          </button>
          <button title='heading 4'
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
          >
            <img alt='heading 4' src='./src/assets/svgs/format_h4.svg' aria-hidden='true'></img>
          </button>
          <button title='heading 5'
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
          >
            <img alt='heading 5' src='./src/assets/svgs/format_h5.svg' aria-hidden='true'></img>
          </button>
          <button title='heading 6'
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
          >
            <img alt='heading 6' src='./src/assets/svgs/format_h6.svg' aria-hidden='true'></img>
          </button>

        </div>

        {/* <div className='button-group'>
          <button title='bulleted list'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <img alt='bullet list' src='./src/assets/svgs/format_list_bulleted.svg'></img>
          </button>
          <button title='ordered list'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            <img alt='ordered list' src='./src/assets/svgs/format_list_numbered.svg'></img>
          </button>
          {/* <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
             code block
      </button> 
          <button title='blockquote'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <img alt='blockqoute' src='./src/assets/svgs/format_quote.svg'></img>
          </button>

        </div> */}

        <div className='button-group'>
          <button title='horizontal rule'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <img alt='horizontal rule' src='./src/assets/svgs/horizontal_rule.svg' aria-hidden='true'></img>
          </button>
          <button title='hard break'
            onClick={() => editor.chain().focus().setHardBreak().run()}>
            <img alt='hard break' src='./src/assets/svgs/keyboard_return.svg' aria-hidden='true'></img>
          </button>
          <button title='undo'
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
          >
            <img alt='undo' src='./src/assets/svgs/undo.svg' aria-hidden='true'></img>
          </button>
          <button title='redo'
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
          >
            <img alt='redo' src='./src/assets/svgs/redo.svg' aria-hidden='true'></img>
          </button>

          <button
            onClick={() => editor.chain().focus().setColor('#958DF1').run()}
            className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
          >
            purple
          </button>

        </div>

      </div>

    </>
  )
}


const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]


export default function SampleTextEditor({ id, placeholder }) {
  const [editorContent, setEditorContent] = useState("");

  // get local storage if available
  const content = window.localStorage.getItem(id) || `<h3>${placeholder}</h3>`

  // save content to local storage
  const save = () => {
    window.localStorage.setItem(id, editorContent)
  }

  return (
    <>
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions} onUpdate={({ editor }) => setEditorContent(editor.getHTML())} content={content}></EditorProvider>

      <button className='cs-button' onClick={save}>Save</button>
    </>
  )
}


SampleTextEditor.propTypes = {
  id: PropTypes.number,
  placeholder: PropTypes.string
};