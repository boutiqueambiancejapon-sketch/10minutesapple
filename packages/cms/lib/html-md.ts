/**
 * Lightweight HTML ↔ Markdown converter for TipTap editor.
 * Preserves MDX/JSX components as raw blocks.
 */

// MDX component tags to preserve as-is (not converted)
const MDX_TAGS = ['Tip', 'Warning', 'Verdict', 'PullQuote', 'StatCard', 'StatRow', 'CompareBar', 'CompareBarGroup', 'ProductCTA']
const MDX_TAG_REGEX = new RegExp(`(<(?:${MDX_TAGS.join('|')})[\\s\\S]*?(?:\\/>|<\\/(?:${MDX_TAGS.join('|')})>))`, 'g')

/** Convert Markdown (with possible MDX) to HTML for TipTap */
export function markdownToHtml(md: string): string {
  // Extract MDX blocks and replace with placeholders
  const mdxBlocks: string[] = []
  let html = md.replace(MDX_TAG_REGEX, (match) => {
    mdxBlocks.push(match)
    return `<div data-mdx="${mdxBlocks.length - 1}" style="background:#1a1a2e;border:1px solid #333;border-radius:6px;padding:12px;margin:12px 0;font-family:monospace;font-size:12px;color:#888;white-space:pre-wrap;">${escapeHtml(match)}</div>`
  })

  // Code blocks
  const codeBlocks: string[] = []
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    codeBlocks.push(code)
    return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`
  })

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr>')

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Bold + Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<s>$1</s>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Blockquotes
  const lines = html.split('\n')
  const result: string[] = []
  let inBlockquote = false
  let inList = false
  let listType = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Blockquotes
    if (line.match(/^>\s?(.*)$/)) {
      const content = line.replace(/^>\s?/, '')
      if (!inBlockquote) { result.push('<blockquote>'); inBlockquote = true }
      result.push(`<p>${content}</p>`)
      continue
    }
    if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false }

    // Unordered lists
    if (line.match(/^[-*]\s(.+)$/)) {
      const content = line.replace(/^[-*]\s/, '')
      if (!inList || listType !== 'ul') {
        if (inList) result.push(`</${listType}>`)
        result.push('<ul>'); inList = true; listType = 'ul'
      }
      result.push(`<li>${content}</li>`)
      continue
    }

    // Ordered lists
    if (line.match(/^\d+\.\s(.+)$/)) {
      const content = line.replace(/^\d+\.\s/, '')
      if (!inList || listType !== 'ol') {
        if (inList) result.push(`</${listType}>`)
        result.push('<ol>'); inList = true; listType = 'ol'
      }
      result.push(`<li>${content}</li>`)
      continue
    }

    if (inList) { result.push(`</${listType}>`); inList = false; listType = '' }

    // Empty lines
    if (!line.trim()) {
      result.push('')
      continue
    }

    // Already HTML
    if (line.trim().startsWith('<')) {
      result.push(line)
      continue
    }

    // Paragraph
    result.push(`<p>${line}</p>`)
  }

  if (inBlockquote) result.push('</blockquote>')
  if (inList) result.push(`</${listType}>`)

  return result.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

/** Convert TipTap HTML to Markdown for saving */
export function htmlToMarkdown(html: string): string {
  let md = html

  // Restore MDX blocks from placeholders
  md = md.replace(/<div[^>]*data-mdx="(\d+)"[^>]*>[\s\S]*?<\/div>/g, (_, idx) => {
    return `\n\n` // MDX blocks are preserved in original markdown
  })

  // Normalize
  md = md.replace(/\u200B/g, '')
  md = md.replace(/&nbsp;/g, ' ')

  // Block elements
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n')

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    const text = content.replace(/<\/?p[^>]*>/g, '').trim()
    return '\n' + text.split('\n').map((l: string) => `> ${l.trim()}`).filter((l: string) => l !== '> ').join('\n') + '\n'
  })

  // Lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content) => {
    return '\n' + content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n').trim() + '\n'
  })
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content) => {
    let i = 0
    return '\n' + content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m: string, text: string) => {
      i++
      return `${i}. ${text}\n`
    }).trim() + '\n'
  })

  // Code blocks
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => {
    return '\n```\n' + unescapeHtml(code.trim()) + '\n```\n'
  })

  // Horizontal rule
  md = md.replace(/<hr[^>]*\/?>/gi, '\n---\n')

  // Inline elements
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')
  md = md.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, '$1')
  md = md.replace(/<s[^>]*>([\s\S]*?)<\/s>/gi, '~~$1~~')
  md = md.replace(/<del[^>]*>([\s\S]*?)<\/del>/gi, '~~$1~~')
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')

  // Paragraphs/divs → newlines
  md = md.replace(/<\/p>/gi, '\n')
  md = md.replace(/<p[^>]*>/gi, '')
  md = md.replace(/<\/div>/gi, '\n')
  md = md.replace(/<div[^>]*>/gi, '')
  md = md.replace(/<br\s*\/?>/gi, '\n')

  // Strip remaining tags
  md = md.replace(/<[^>]+>/g, '')

  // Unescape
  md = unescapeHtml(md)

  // Clean whitespace
  md = md.replace(/\n{3,}/g, '\n\n').trim()

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
