/**
 * lib/blog.ts — utilitaires serveur pour les articles MDX.
 * Lecture de content/blog/**\/*.mdx via gray-matter.
 * Server-side uniquement (fs, path).
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type ArticleMeta = {
  slug: string
  categorie: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  readingTimeMin: number
  aiSummary?: string[]
  tags?: string[]
  faq?: { q: string; a: string }[]
}

export type ArticleRaw = {
  meta: ArticleMeta
  content: string
}

export function getAllArticles(): ArticleMeta[] {
  const categories = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => fs.statSync(path.join(BLOG_DIR, f)).isDirectory())

  const articles: ArticleMeta[] = []

  for (const categorie of categories) {
    const files = fs
      .readdirSync(path.join(BLOG_DIR, categorie))
      .filter((f) => f.endsWith('.mdx'))

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(
        path.join(BLOG_DIR, categorie, file),
        'utf-8'
      )
      const { data } = matter(raw)

      articles.push({
        slug,
        categorie,
        title: data.title ?? '',
        description: data.description ?? '',
        publishedAt: data.publishedAt ?? '',
        updatedAt: data.updatedAt,
        readingTimeMin: data.readingTimeMin ?? 5,
        aiSummary: data.aiSummary,
        tags: data.tags,
        faq: data.faq,
      })
    }
  }

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getArticleRaw(categorie: string, slug: string): ArticleRaw {
  const filePath = path.join(BLOG_DIR, categorie, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    meta: {
      slug,
      categorie,
      title: data.title ?? '',
      description: data.description ?? '',
      publishedAt: data.publishedAt ?? '',
      updatedAt: data.updatedAt,
      readingTimeMin: data.readingTimeMin ?? 5,
      aiSummary: data.aiSummary,
      tags: data.tags,
      faq: data.faq,
    },
    content,
  }
}

export function articleExists(categorie: string, slug: string): boolean {
  return fs.existsSync(
    path.join(BLOG_DIR, categorie, `${slug}.mdx`)
  )
}

/**
 * Retourne jusqu'à `limit` articles liés.
 * Priorité : même catégorie → autres catégories.
 * Exclut l'article courant.
 */
export function getRelatedArticles(
  categorie: string,
  currentSlug: string,
  limit = 3
): ArticleMeta[] {
  const all = getAllArticles()
  const sameCat = all.filter(
    (a) => a.categorie === categorie && a.slug !== currentSlug
  )
  const otherCat = all.filter(
    (a) => a.categorie !== categorie
  )
  return [...sameCat, ...otherCat].slice(0, limit)
}
