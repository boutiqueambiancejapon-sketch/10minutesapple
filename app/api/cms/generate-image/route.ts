import { NextResponse } from 'next/server'
import { getSession, getGitHubToken } from '@/packages/cms/lib/get-session'
import { uploadBinary } from '@/packages/cms/lib/github'
import { cmsConfig } from '@/cms.config'

export const dynamic = 'force-dynamic'

const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const token = await getGitHubToken()
  if (!token) return NextResponse.json({ error: 'No GitHub token' }, { status: 401 })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })

  const { prompt, slug } = (await request.json()) as { prompt: string; slug?: string }
  if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })

  try {
    // Call Gemini API to generate image
    const geminiRes = await fetch(`${GEMINI_API}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a high-quality blog header image for an article titled: "${prompt}".
Style: modern, clean, tech-focused, dark background preferred.
The image should be suitable as a hero/feature image for a tech blog article.
Do NOT include any text in the image.`
          }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE'],
        }
      }),
    })

    if (!geminiRes.ok) {
      const err = await geminiRes.text()
      return NextResponse.json({ error: `Gemini API error: ${geminiRes.status} ${err.slice(0, 200)}` }, { status: 500 })
    }

    const data = await geminiRes.json()

    // Find the image part in the response
    const parts = data.candidates?.[0]?.content?.parts ?? []
    const imagePart = parts.find((p: Record<string, unknown>) => p.inlineData)

    if (!imagePart?.inlineData?.data) {
      return NextResponse.json({ error: 'Gemini did not return an image. Try a different prompt.' }, { status: 400 })
    }

    const base64Data = imagePart.inlineData.data
    const mimeType = imagePart.inlineData.mimeType || 'image/png'
    const ext = mimeType.includes('jpeg') || mimeType.includes('jpg') ? 'jpg' : mimeType.includes('webp') ? 'webp' : 'png'

    // Generate filename from slug or timestamp
    const filename = slug
      ? `${slug}-feature.${ext}`
      : `generated-${Date.now()}.${ext}`

    const filePath = `${cmsConfig.media.path}/${filename}`

    // Upload to GitHub
    const result = await uploadBinary(
      token,
      cmsConfig.repo,
      filePath,
      base64Data,
      `media: AI-generated image for ${slug || 'article'}`,
      cmsConfig.branch
    )

    const url = `/${filePath.replace(/^public\//, '')}`

    return NextResponse.json({ url, sha: result.sha, filename })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Generation failed' }, { status: 500 })
  }
}
