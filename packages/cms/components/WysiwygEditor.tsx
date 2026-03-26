'use client'

import { useRef, useCallback, useEffect } from 'react'

type Props = {
  value: string
  onChange: (html: string) => void
}

/**
 * WordPress-style WYSIWYG editor using contentEditable.
 * Input/output is HTML. Converts to/from Markdown at save time.
 */
export function WysiwygEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInternalChange = useRef(false)

  // Set initial content
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true
      onChange(editorRef.current.innerHTML)
      isInternalChange.current = false
    }
  }, [onChange])

  const exec = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }, [handleInput])

  const insertLink = useCallback(() => {
    const url = prompt('URL du lien :')
    if (url) exec('createLink', url)
  }, [exec])

  const insertImage = useCallback(() => {
    const url = prompt('URL de l\'image (ex: /images/mon-image.webp) :')
    if (url) exec('insertImage', url)
  }, [exec])

  const btnStyle = {
    padding: '4px 8px', background: 'transparent', border: '1px solid #333',
    borderRadius: 4, color: '#ccc', cursor: 'pointer', fontSize: 12,
    fontWeight: 600, minWidth: 28, lineHeight: '18px',
  } as const

  const sepStyle = {
    width: 1, height: 20, background: '#333', margin: '0 4px', flexShrink: 0,
  } as const

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
        <button onClick={() => exec('bold')} title="Gras" style={btnStyle}><b>B</b></button>
        <button onClick={() => exec('italic')} title="Italique" style={btnStyle}><i>I</i></button>
        <button onClick={() => exec('underline')} title="Souligné" style={btnStyle}><u>U</u></button>
        <button onClick={() => exec('strikeThrough')} title="Barré" style={btnStyle}><s>S</s></button>

        <div style={sepStyle} />

        <button onClick={() => exec('formatBlock', 'h2')} title="Titre 2" style={btnStyle}>H2</button>
        <button onClick={() => exec('formatBlock', 'h3')} title="Titre 3" style={btnStyle}>H3</button>
        <button onClick={() => exec('formatBlock', 'p')} title="Paragraphe" style={btnStyle}>P</button>
        <button onClick={() => exec('formatBlock', 'blockquote')} title="Citation" style={btnStyle}>❝</button>

        <div style={sepStyle} />

        <button onClick={() => exec('insertUnorderedList')} title="Liste à puces" style={btnStyle}>•</button>
        <button onClick={() => exec('insertOrderedList')} title="Liste numérotée" style={btnStyle}>1.</button>

        <div style={sepStyle} />

        <button onClick={insertLink} title="Insérer un lien" style={btnStyle}>🔗</button>
        <button onClick={() => exec('unlink')} title="Retirer le lien" style={btnStyle}>✂</button>
        <button onClick={insertImage} title="Insérer une image" style={btnStyle}>🖼</button>

        <div style={sepStyle} />

        <button onClick={() => exec('removeFormat')} title="Supprimer la mise en forme" style={btnStyle}>✕</button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        style={{
          width: '100%', minHeight: 500, padding: 16, background: '#161616',
          border: '1px solid #333', borderTop: 'none', borderRadius: '0 0 6px 6px',
          color: '#e5e5e5', fontSize: 15, fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.8, outline: 'none', boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      />

      {/* Editor styles */}
      <style>{`
        [contenteditable] h2 { font-size: 22px; font-weight: 700; margin: 24px 0 8px; color: #fff; }
        [contenteditable] h3 { font-size: 18px; font-weight: 600; margin: 20px 0 6px; color: #f0f0f0; }
        [contenteditable] p { margin: 0 0 12px; }
        [contenteditable] blockquote { border-left: 3px solid #444; padding-left: 16px; color: #aaa; margin: 12px 0; }
        [contenteditable] ul, [contenteditable] ol { padding-left: 24px; margin: 8px 0; }
        [contenteditable] li { margin: 4px 0; }
        [contenteditable] a { color: #6af; text-decoration: underline; }
        [contenteditable] img { max-width: 100%; height: auto; border-radius: 6px; margin: 12px 0; }
        [contenteditable] strong { color: #fff; }
        [contenteditable]:empty:before { content: 'Commencez à écrire…'; color: #555; }
      `}</style>
    </div>
  )
}
