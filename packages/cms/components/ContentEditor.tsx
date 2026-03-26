'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { FieldDef } from '../types'

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
  const [body, setBody] = useState(initialBody)
  const [entrySlug, setEntrySlug] = useState(slug)
  const [slugManual, setSlugManual] = useState(!isNew) // user manually edited slug?
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

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

  async function handleSave() {
    const finalSlug = entrySlug || slug
    if (!finalSlug) { setToast({ message: 'Le slug est requis', type: 'error' }); return }

    setSaving(true)
    try {
      const res = await fetch(`/api/cms/content/${collection}/${finalSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, body: format === 'mdx' ? body : undefined, sha: isNew ? undefined : sha }),
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
          <FieldInput key={key} fieldKey={key} field={field} value={data[key]} onChange={(v) => updateField(key, v)} />
        ))}
      </div>

      {/* Body editor for MDX */}
      {format === 'mdx' && (
        <RichBodyEditor value={body} onChange={setBody} />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}

// --- Rich Body Editor with toolbar ---
type ToolbarAction = { label: string; icon: string; prefix: string; suffix: string; block?: boolean }

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { label: 'Gras', icon: 'B', prefix: '**', suffix: '**' },
  { label: 'Italique', icon: 'I', prefix: '*', suffix: '*' },
  { label: 'Titre 2', icon: 'H2', prefix: '## ', suffix: '', block: true },
  { label: 'Titre 3', icon: 'H3', prefix: '### ', suffix: '', block: true },
  { label: 'Lien', icon: '🔗', prefix: '[', suffix: '](url)' },
  { label: 'Image', icon: '🖼', prefix: '![alt](', suffix: ')' },
  { label: 'Liste', icon: '•', prefix: '- ', suffix: '', block: true },
  { label: 'Liste num.', icon: '1.', prefix: '1. ', suffix: '', block: true },
  { label: 'Citation', icon: '❝', prefix: '> ', suffix: '', block: true },
  { label: 'Code', icon: '`', prefix: '`', suffix: '`' },
  { label: 'Bloc code', icon: '```', prefix: '```\n', suffix: '\n```', block: true },
  { label: 'Séparateur', icon: '—', prefix: '\n---\n', suffix: '', block: true },
]

function RichBodyEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const applyAction = useCallback((action: ToolbarAction) => {
    const ta = textareaRef.current
    if (!ta) return

    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = value.substring(start, end)
    const before = value.substring(0, start)
    const after = value.substring(end)

    let newText: string
    let cursorPos: number

    if (action.block && !selected) {
      const needsNewline = before.length > 0 && !before.endsWith('\n') ? '\n' : ''
      newText = before + needsNewline + action.prefix + action.suffix + after
      cursorPos = before.length + needsNewline.length + action.prefix.length
    } else {
      newText = before + action.prefix + (selected || action.label) + action.suffix + after
      cursorPos = before.length + action.prefix.length + (selected || action.label).length
    }

    onChange(newText)
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(cursorPos, cursorPos)
    })
  }, [value, onChange])

  const btnStyle = {
    padding: '4px 8px', background: 'transparent', border: '1px solid #333',
    borderRadius: 4, color: '#ccc', cursor: 'pointer', fontSize: 12,
    fontWeight: 600, minWidth: 28, lineHeight: '18px',
  } as const

  return (
    <div style={{ marginTop: 24 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>Contenu</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 10px', background: '#111', border: '1px solid #333', borderBottom: 'none', borderRadius: '6px 6px 0 0' }}>
        {TOOLBAR_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => applyAction(action)}
            title={action.label}
            style={btnStyle}
            onMouseOver={(e) => { e.currentTarget.style.background = '#222' }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            {action.icon}
          </button>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', minHeight: 500, padding: 12, background: '#161616',
          border: '1px solid #333', borderTop: 'none', borderRadius: '0 0 6px 6px',
          color: '#e5e5e5', fontSize: 14, fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.7, resize: 'vertical', boxSizing: 'border-box',
        }}
      />
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
