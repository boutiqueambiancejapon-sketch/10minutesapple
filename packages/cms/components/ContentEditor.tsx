'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { FieldDef } from '../types'
import { WysiwygEditor } from './WysiwygEditor'
import { markdownToHtml, htmlToMarkdown } from '../lib/html-md'

// --- Slugify ---
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// --- Toast ---
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      padding: '12px 20px', borderRadius: 8,
      background: type === 'success' ? '#0f2918' : '#2a1215',
      border: `1px solid ${type === 'success' ? '#1a5c2e' : '#5c2328'}`,
      color: type === 'success' ? '#6f6' : '#f88',
      fontSize: 13, fontWeight: 500,
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      animation: 'cms-toast-in 200ms ease-out',
    }}>
      {message}
      <style>{`@keyframes cms-toast-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}

// --- Props ---
type Props = {
  collection: string
  slug: string
  fields: Record<string, FieldDef>
  format: 'mdx' | 'yaml'
  initialData: Record<string, unknown>
  initialBody: string
  sha: string
  isNew: boolean
}

export function ContentEditor({ collection, slug, fields, format, initialData, initialBody, sha, isNew }: Props) {
  const router = useRouter()
  const [data, setData] = useState<Record<string, unknown>>(initialData)
  const [bodyMd, setBodyMd] = useState(initialBody)
  const [bodyHtml, setBodyHtml] = useState(() => markdownToHtml(initialBody))
  const [entrySlug, setEntrySlug] = useState(slug)
  const [slugManual, setSlugManual] = useState(!isNew) // user manually edited slug?
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const importRef = useRef<HTMLInputElement>(null)

  const isDraft = !!data.draft

  function updateField(key: string, value: unknown) {
    setData((prev) => ({ ...prev, [key]: value }))
    // Auto-slugify from title
    if (key === 'title' && isNew && !slugManual && typeof value === 'string') {
      setEntrySlug(slugify(value))
    }
  }

  function toggleDraft() {
    setData((prev) => ({ ...prev, draft: !prev.draft }))
  }

  function handleImportMd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const raw = ev.target?.result as string
      if (!raw) return

      // Check for YAML frontmatter
      const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

      if (fmMatch) {
        // Parse frontmatter fields
        const yamlStr = fmMatch[1]
        const body = fmMatch[2].trim()
        const parsed: Record<string, unknown> = {}

        for (const line of yamlStr.split('\n')) {
          const m = line.match(/^(\w[\w-]*)\s*:\s*(.+)$/)
          if (m) {
            let val: unknown = m[2].trim()
            // Remove quotes
            if (typeof val === 'string' && ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))) {
              val = (val as string).slice(1, -1)
            }
            // Inline array [a, b]
            if (typeof val === 'string' && val.startsWith('[') && val.endsWith(']')) {
              val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''))
            }
            // Number
            if (typeof val === 'string' && /^\d+$/.test(val)) val = parseInt(val, 10)
            parsed[m[1]] = val
          }
        }

        // Fill fields from frontmatter
        setData((prev) => ({ ...prev, ...parsed }))

        // Use slug from frontmatter, or auto-generate from title
        if (isNew) {
          if (parsed.slug) {
            setEntrySlug(parsed.slug as string)
            setSlugManual(true)
          } else if (parsed.title) {
            setEntrySlug(slugify(parsed.title as string))
          }
        }

        // Fill body
        setBodyMd(body)
        setBodyHtml(markdownToHtml(body))

        setToast({ message: 'Fichier importé (avec frontmatter)', type: 'success' })
      } else {
        // No frontmatter — extract title from H1, description from first paragraph
        const lines = raw.trim().split('\n')
        const h1Match = lines[0]?.match(/^#\s+(.+)$/)
        const newData: Record<string, unknown> = {}

        let bodyStart = 0
        if (h1Match) {
          newData.title = h1Match[1]
          bodyStart = 1
          if (isNew) setEntrySlug(slugify(h1Match[1]))
        }

        // Find first non-empty line after H1 as description
        for (let i = bodyStart; i < lines.length; i++) {
          const l = lines[i].trim()
          if (l && !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('*') && !l.startsWith('>') && !l.startsWith('```')) {
            newData.description = l
            bodyStart = i + 1
            break
          }
          if (l) break // non-paragraph line, stop looking
        }

        setData((prev) => ({ ...prev, ...newData }))

        const body = lines.slice(bodyStart).join('\n').trim()
        setBodyMd(body)
        setBodyHtml(markdownToHtml(body))

        setToast({ message: 'Fichier importé (sans frontmatter — titre et description extraits)', type: 'success' })
      }
    }
    reader.readAsText(file)
    // Reset input so same file can be imported again
    if (importRef.current) importRef.current.value = ''
  }

  async function handleSave() {
    const finalSlug = entrySlug || slug
    if (!finalSlug) { setToast({ message: 'Le slug est requis', type: 'error' }); return }

    setSaving(true)
    try {
      const res = await fetch(`/api/cms/content/${collection}/${finalSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, body: format === 'mdx' ? bodyMd : undefined, sha: isNew ? undefined : sha }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Save failed')
      }
      setToast({ message: isDraft ? 'Brouillon sauvegardé' : 'Publié !', type: 'success' })
      if (isNew) router.push(`/admin/${collection}/${finalSlug}`)
    } catch (e) {
      setToast({ message: e instanceof Error ? e.message : 'Erreur', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Supprimer cette entrée ?')) return
    setSaving(true)
    try {
      const res = await fetch(`/api/cms/content/${collection}/${slug}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sha }),
      })
      if (!res.ok) throw new Error('Delete failed')
      router.push(`/admin/${collection}`)
    } catch (e) {
      setToast({ message: e instanceof Error ? e.message : 'Erreur', type: 'error' })
      setSaving(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
            {isNew ? 'Nouvelle entrée' : slug}
          </h1>
          {isDraft && (
            <span style={{ fontSize: 11, fontWeight: 600, background: '#332800', color: '#fa0', padding: '2px 8px', borderRadius: 4 }}>
              Brouillon
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Import .md */}
          {isNew && format === 'mdx' && (
            <label style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #333', color: '#888', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
              Importer .md
              <input ref={importRef} type="file" accept=".md,.mdx,.markdown" onChange={handleImportMd} style={{ display: 'none' }} />
            </label>
          )}
          {/* Draft toggle */}
          <button onClick={toggleDraft} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #333', color: isDraft ? '#fa0' : '#888', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
            {isDraft ? 'Passer en publié' : 'Brouillon'}
          </button>
          {!isNew && (
            <button onClick={handleDelete} disabled={saving} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #333', color: '#f44', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
              Supprimer
            </button>
          )}
          <button onClick={handleSave} disabled={saving} style={{ padding: '8px 14px', background: '#fff', color: '#000', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600, opacity: saving ? 0.5 : 1 }}>
            {saving ? 'Enregistrement…' : isDraft ? 'Sauvegarder le brouillon' : 'Publier'}
          </button>
        </div>
      </div>

      {/* Slug field for new entries */}
      {isNew && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 4 }}>Slug (nom du fichier)</label>
          <input
            type="text"
            value={entrySlug}
            onChange={(e) => { setEntrySlug(e.target.value); setSlugManual(true) }}
            placeholder="mon-article"
            style={{ width: '100%', padding: '8px 12px', background: '#161616', border: '1px solid #333', borderRadius: 6, color: '#e5e5e5', fontSize: 14, boxSizing: 'border-box' }}
          />
          {!slugManual && entrySlug && (
            <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>Auto-généré depuis le titre</div>
          )}
        </div>
      )}

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Object.entries(fields).map(([key, field]) => (
          field.type === 'image'
            ? <ImageField key={key} label={field.label} value={(data[key] as string) ?? ''} onChange={(v) => updateField(key, v)} articleTitle={(data.title as string) ?? ''} articleSlug={entrySlug} />
            : <FieldInput key={key} fieldKey={key} field={field} value={data[key]} onChange={(v) => updateField(key, v)} />
        ))}
      </div>

      {/* Body editor for MDX — WYSIWYG like WordPress */}
      {format === 'mdx' && (
        <WysiwygEditor
          value={bodyHtml}
          onChange={(html) => {
            setBodyHtml(html)
            setBodyMd(htmlToMarkdown(html))
          }}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}

// --- Field Inputs ---
function FieldInput({ fieldKey, field, value, onChange }: { fieldKey: string; field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const inputStyle = { width: '100%', padding: '8px 12px', background: '#161616', border: '1px solid #333', borderRadius: 6, color: '#e5e5e5', fontSize: 14, boxSizing: 'border-box' as const }
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 4 }

  switch (field.type) {
    case 'text':
    case 'slug':
    case 'date':
      return (
        <div>
          <label style={labelStyle}>{field.label}{field.required && ' *'}</label>
          <input type={field.type === 'date' ? 'date' : 'text'} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
        </div>
      )
    case 'textarea':
    case 'richtext':
      return (
        <div>
          <label style={labelStyle}>{field.label}{field.required && ' *'}</label>
          <textarea value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
      )
    case 'number':
      return (
        <div>
          <label style={labelStyle}>{field.label}</label>
          <input type="number" value={(value as number) ?? field.default ?? ''} onChange={(e) => onChange(Number(e.target.value))} style={inputStyle} />
        </div>
      )
    case 'select':
      return (
        <div>
          <label style={labelStyle}>{field.label}</label>
          <select value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} style={inputStyle}>
            <option value="">—</option>
            {field.options?.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      )
    case 'tags':
      return (
        <div>
          <label style={labelStyle}>{field.label}</label>
          <input
            type="text"
            value={Array.isArray(value) ? (value as string[]).join(', ') : ''}
            onChange={(e) => onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
            placeholder="tag1, tag2, tag3"
            style={inputStyle}
          />
        </div>
      )
    case 'image':
      return <ImageField label={field.label} value={(value as string) ?? ''} onChange={onChange} />
    case 'list':
      return <ListField label={field.label} value={Array.isArray(value) ? value as string[] : []} onChange={onChange} />
    case 'repeater':
      return <RepeaterField label={field.label} fields={field.fields ?? {}} value={Array.isArray(value) ? value as Record<string, unknown>[] : []} onChange={onChange} />
    default:
      return (
        <div>
          <label style={labelStyle}>{field.label} ({field.type})</label>
          <input type="text" value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
        </div>
      )
  }
}

function ImageField({ label, value, onChange, articleTitle, articleSlug }: { label: string; value: string; onChange: (v: unknown) => void; articleTitle?: string; articleSlug?: string }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [showAiPrompt, setShowAiPrompt] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/cms/media/upload', { method: 'POST', body: formData })
      if (!res.ok) { const err = await res.json(); alert(err.error ?? 'Upload failed'); return }
      const data = await res.json()
      onChange(data.url)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  function openAiPrompt() {
    setAiPrompt(articleTitle || '')
    setShowAiPrompt(true)
  }

  async function handleGenerate() {
    if (!aiPrompt.trim()) return
    setGenerating(true)
    try {
      const res = await fetch('/api/cms/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, slug: articleSlug }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.error ?? 'Generation failed'); return }
      onChange(data.url)
      setShowAiPrompt(false)
    } finally {
      setGenerating(false)
    }
  }

  const busy = uploading || generating

  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>{label}</label>
      {value && (
        <div style={{ marginBottom: 10, position: 'relative', display: 'inline-block' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Feature" style={{ maxWidth: '100%', maxHeight: 220, borderRadius: 10, border: '1px solid #222', display: 'block' }} />
          <button
            onClick={() => onChange('')}
            style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.7)', color: '#f44', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}
          >
            ✕
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ padding: '8px 14px', background: '#1a1a1a', color: '#ccc', borderRadius: 8, cursor: 'pointer', fontSize: 12, border: '1px solid #222', opacity: busy ? 0.5 : 1 }}>
          {uploading ? 'Upload…' : '📁 Choisir'}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} disabled={busy} />
        </label>
        <button
          onClick={openAiPrompt}
          disabled={busy}
          style={{ padding: '8px 14px', background: 'linear-gradient(135deg, #4285f4, #a855f7)', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, opacity: busy ? 0.5 : 1 }}
        >
          ✨ Générer avec IA
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/mon-image.webp"
          style={{ flex: '1 1 200px', padding: '8px 12px', background: '#161616', border: '1px solid #333', borderRadius: 6, color: '#e5e5e5', fontSize: 13, boxSizing: 'border-box' }}
        />
      </div>

      {/* AI Prompt panel */}
      {showAiPrompt && (
        <div style={{ marginTop: 10, padding: 16, background: '#111', border: '1px solid #222', borderRadius: 10 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 6 }}>
            Décrivez l&apos;image souhaitée
          </label>
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={3}
            placeholder="Ex: Un iPhone 17 Pro Max sur fond sombre avec des reflets néon bleus et rouges"
            style={{ width: '100%', padding: 10, background: '#161616', border: '1px solid #333', borderRadius: 6, color: '#e5e5e5', fontSize: 13, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5 }}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button
              onClick={handleGenerate}
              disabled={generating || !aiPrompt.trim()}
              style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #4285f4, #a855f7)', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, opacity: generating || !aiPrompt.trim() ? 0.5 : 1 }}
            >
              {generating ? '✨ Génération en cours…' : '✨ Générer'}
            </button>
            <button
              onClick={() => setShowAiPrompt(false)}
              disabled={generating}
              style={{ padding: '8px 16px', background: 'transparent', color: '#888', borderRadius: 8, border: '1px solid #333', cursor: 'pointer', fontSize: 12 }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ListField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: unknown) => void }) {
  function add() { onChange([...value, '']) }
  function update(i: number, v: string) { const arr = [...value]; arr[i] = v; onChange(arr) }
  function remove(i: number) { onChange(value.filter((_, idx) => idx !== i)) }
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 4 }}>{label}</label>
      {value.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          <textarea value={item} onChange={(e) => update(i, e.target.value)} rows={2} style={{ flex: 1, padding: '8px 12px', background: '#161616', border: '1px solid #333', borderRadius: 6, color: '#e5e5e5', fontSize: 13, resize: 'vertical' }} />
          <button onClick={() => remove(i)} style={{ background: 'transparent', border: '1px solid #333', color: '#f44', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 12 }}>✕</button>
        </div>
      ))}
      <button onClick={add} style={{ fontSize: 12, color: '#888', background: 'transparent', border: '1px dashed #333', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}>+ Ajouter</button>
    </div>
  )
}

function RepeaterField({ label, fields, value, onChange }: { label: string; fields: Record<string, FieldDef>; value: Record<string, unknown>[]; onChange: (v: unknown) => void }) {
  function add() { onChange([...value, {}]) }
  function update(i: number, key: string, v: unknown) { const arr = [...value]; arr[i] = { ...arr[i], [key]: v }; onChange(arr) }
  function remove(i: number) { onChange(value.filter((_, idx) => idx !== i)) }
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>{label}</label>
      {value.map((item, i) => (
        <div key={i} style={{ padding: 12, background: '#111', border: '1px solid #222', borderRadius: 6, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: '#666' }}>#{i + 1}</span>
            <button onClick={() => remove(i)} style={{ background: 'transparent', border: 'none', color: '#f44', cursor: 'pointer', fontSize: 12 }}>✕</button>
          </div>
          {Object.entries(fields).map(([key, field]) => (
            <div key={key} style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontSize: 11, color: '#666', marginBottom: 2 }}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea value={(item[key] as string) ?? ''} onChange={(e) => update(i, key, e.target.value)} rows={2} style={{ width: '100%', padding: '6px 10px', background: '#161616', border: '1px solid #333', borderRadius: 4, color: '#e5e5e5', fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }} />
              ) : (
                <input type="text" value={(item[key] as string) ?? ''} onChange={(e) => update(i, key, e.target.value)} style={{ width: '100%', padding: '6px 10px', background: '#161616', border: '1px solid #333', borderRadius: 4, color: '#e5e5e5', fontSize: 13, boxSizing: 'border-box' }} />
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={add} style={{ fontSize: 12, color: '#888', background: 'transparent', border: '1px dashed #333', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}>+ Ajouter</button>
    </div>
  )
}
