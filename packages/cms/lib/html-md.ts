/**
 * Lightweight HTML ↔ Markdown converter.
 * No external dependencies. Handles the basics for CMS editing.
 */

/** Convert Markdown to HTML (for loading into WYSIWYG editor) */
export function markdownToHtml(md: string): string {
  let html = md

  // Escape HTML entities in code blocks first
  const codeBlocks: string[] = []
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match)
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`
  })

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')

  // Bold + Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<s>$1</s>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '<br>')

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr>')

  // Paragraphs: wrap loose text lines
  html = html.replace(/^(?!<[a-z/]|__CODE)(.+)$/gm, (_, text) => {
    const trimmed = text.trim()
    if (!trimmed) return ''
    return `<p>${trimmed}</p>`
  })

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    const lang = block.match(/^```(\w*)/)?.[1] || ''
    const code = block.replace(/^```\w*\n?/, '').replace(/\n?```$/, '')
    html = html.replace(`__CODE_BLOCK_${i}__`, `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`)
  })

  // Clean up empty lines
  html = html.replace(/\n{3,}/g, '\n\n')

  return html.trim()
}

/** Convert HTML to Markdown (for saving from WYSIWYG editor) */
export function htmlToMarkdown(html: string): string {
  let md = html

  // Normalize: remove zero-width spaces, fix nbsp
  md = md.replace(/\u200B/g, '')
  md = md.replace(/&nbsp;/g, ' ')

  // Block elements → Markdown with newlines
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    return '\n' + content.replace(/<br\s*\/?>/g, '\n').split('\n').map((l: string) => `> ${l.trim()}`).join('\n') + '\n'
  })

  // Lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content) => {
    return '\n' + content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1').trim() + '\n'
  })
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content) => {
    let i = 0
    return '\n' + content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => {
      i++
      return `${i}. `
    }).trim() + '\n'
  })

  // Code blocks
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => {
    return '\n```\n' + unescapeHtml(code) + '\n```\n'
  })

  // Inline elements
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')
  md = md.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, '$1')
  md = md.replace(/<s[^>]*>([\s\S]*?)<\/s>/gi, '~~$1~~')
  md = md.replace(/<del[^>]*>([\s\S]*?)<\/del>/gi, '~~$1~~')
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')

  // Horizontal rule
  md = md.replace(/<hr[^>]*\/?>/gi, '\n---\n')

  // Paragraphs and divs → newlines
  md = md.replace(/<\/p>/gi, '\n')
  md = md.replace(/<p[^>]*>/gi, '')
  md = md.replace(/<\/div>/gi, '\n')
  md = md.replace(/<div[^>]*>/gi, '')

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n')

  // Strip remaining HTML tags
  md = md.replace(/<[^>]+>/g, '')

  // Unescape HTML entities
  md = unescapeHtml(md)

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n')
  md = md.trim()

  return md
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function unescapeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}
