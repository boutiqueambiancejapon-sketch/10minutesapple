const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? 'ambiancejap0a-21'
const AMAZON_DOMAINS = /amazon\.(fr|com|co\.uk|de|es|it)/i

export function addAffiliateTag(href: string): string {
  try {
    const url = new URL(href)
    if (AMAZON_DOMAINS.test(url.hostname)) {
      url.searchParams.set('tag', AMAZON_TAG)
      url.searchParams.delete('ref')
      return url.toString()
    }
  } catch {
    // Invalid URL — return as-is
  }
  return href
}
