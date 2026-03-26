'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { useCallback, useEffect, useRef } from 'react'

type Props = {
  value: string
  onChange: (html: string) => void
}

export function WysiwygEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { style: 'color: #6af; text-decoration: underline;' } }),
      Image.configure({ HTMLAttributes: { style: 'max-width: 100%; height: auto; border-radius: 6px; margin: 12px 0;' } }),
      Placeholder.configure({ placeholder: 'Commencez à écrire…' }),
    ],
    content: value,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML())
    },
    editorProps: {
      attributes: {
        style: 'outline: none; min-height: 500px; padding: 16px; color: #e5e5e5; font-size: 15px; font-family: system-ui, sans-serif; line-height: 1.8;',
      },
    },
  })

  // Update editor content when value changes externally (e.g. import)
  const lastExternalValue = useRef(value)
  useEffect(() => {
    if (editor && value !== lastExternalValue.current) {
      lastExternalValue.current = value
      editor.commands.setContent(value)
    }
  }, [editor, value])

  const addLink = useCallback(() => {
    if (!editor) return
    const url = prompt('URL du lien :')
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return
    const url = prompt('URL de l\'image (ex: /images/mon-image.webp) :')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) return null

  const btn = (active: boolean) => ({
    padding: '4px 8px',
    background: active ? '#333' : 'transparent',
    border: '1px solid #333',
    borderRadius: 4,
    color: active ? '#fff' : '#ccc',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 600 as const,
    minWidth: 28,
    lineHeight: '18px',
  })

  const sep = { width: 1, height: 20, background: '#333', margin: '0 4px', flexShrink: 0 }

  return (
    <div style={{ marginTop: 24 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>
        Contenu
      </label>

      {/* Toolbar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 10px',
        background: '#111', border: '1px solid #333', borderBottom: 'none',
        borderRadius: '6px 6px 0 0', alignItems: 'center',
      }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()} style={btn(editor.isActive('bold'))} title="Gras"><b>B</b></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} style={btn(editor.isActive('italic'))} title="Italique"><i>I</i></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} style={btn(editor.isActive('underline'))} title="Souligné"><u>U</u></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} style={btn(editor.isActive('strike'))} title="Barré"><s>S</s></button>

        <div style={sep} />

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={btn(editor.isActive('heading', { level: 2 }))} title="Titre 2">H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} style={btn(editor.isActive('heading', { level: 3 }))} title="Titre 3">H3</button>
        <button onClick={() => editor.chain().focus().setParagraph().run()} style={btn(editor.isActive('paragraph'))} title="Paragraphe">P</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} style={btn(editor.isActive('blockquote'))} title="Citation">❝</button>

        <div style={sep} />

        <button onClick={() => editor.chain().focus().toggleBulletList().run()} style={btn(editor.isActive('bulletList'))} title="Liste à puces">•</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} style={btn(editor.isActive('orderedList'))} title="Liste numérotée">1.</button>

        <div style={sep} />

        <button onClick={addLink} style={btn(editor.isActive('link'))} title="Lien">🔗</button>
        <button onClick={() => editor.chain().focus().unsetLink().run()} style={btn(false)} title="Retirer lien">✂</button>
        <button onClick={addImage} style={btn(false)} title="Image">🖼</button>

        <div style={sep} />

        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} style={btn(editor.isActive('codeBlock'))} title="Bloc code">{'<>'}</button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} style={btn(false)} title="Séparateur">—</button>

        <div style={sep} />

        <button onClick={() => editor.chain().focus().undo().run()} style={btn(false)} title="Annuler">↩</button>
        <button onClick={() => editor.chain().focus().redo().run()} style={btn(false)} title="Rétablir">↪</button>
      </div>

      {/* Editor */}
      <div style={{
        background: '#161616', border: '1px solid #333', borderTop: 'none',
        borderRadius: '0 0 6px 6px', overflow: 'hidden',
      }}>
        <EditorContent editor={editor} />
      </div>

      {/* Editor styles */}
      <style>{`
        .tiptap { outline: none; min-height: 500px; padding: 16px; }
        .tiptap h2 { font-size: 22px; font-weight: 700; margin: 24px 0 8px; color: #fff; }
        .tiptap h3 { font-size: 18px; font-weight: 600; margin: 20px 0 6px; color: #f0f0f0; }
        .tiptap h4 { font-size: 16px; font-weight: 600; margin: 16px 0 4px; color: #e0e0e0; }
        .tiptap p { margin: 0 0 12px; color: #e5e5e5; }
        .tiptap blockquote { border-left: 3px solid #444; padding-left: 16px; color: #aaa; margin: 12px 0; }
        .tiptap ul, .tiptap ol { padding-left: 24px; margin: 8px 0; color: #e5e5e5; }
        .tiptap li { margin: 4px 0; }
        .tiptap a { color: #6af; text-decoration: underline; }
        .tiptap img { max-width: 100%; height: auto; border-radius: 6px; margin: 12px 0; display: block; }
        .tiptap strong { color: #fff; }
        .tiptap code { background: #222; padding: 2px 6px; border-radius: 3px; font-size: 13px; color: #f8f8f2; }
        .tiptap pre { background: #111; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0; }
        .tiptap pre code { background: none; padding: 0; }
        .tiptap hr { border: none; border-top: 1px solid #333; margin: 24px 0; }
        .tiptap p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #555; pointer-events: none; float: left; height: 0; }
      `}</style>
    </div>
  )
}
