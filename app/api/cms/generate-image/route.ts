import { NextResponse } from 'next/server'
import { getSession, getGitHubToken } from '@/packages/cms/lib/get-session'
import { uploadBinary } from '@/packages/cms/lib/github'
import { cmsConfig } from '@/cms.config'

export const dynamic = 'force-dynamic'

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
    // Use Gemini 2.0 Flash with image generation
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a high-quality blog header image: ${prompt}. Style: modern, clean, tech-focused, dark background. No text in the image.`
          }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE'],
        }
      }),
    })

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      return NextResponse.json({ error: `Gemini API error: ${geminiRes.status} ${errText.slice(0, 300)}` }, { status: 500 })
    }

    const data = await geminiRes.json()
    const parts = data.candidates?.[0]?.content?.parts ?? []
    const imagePart = parts.find((p: Record<string, unknown>) => p.inlineData)

    if (!imagePart?.inlineData?.data) {
      return NextResponse.json({ error: 'Gemini n\'a pas généré d\'image. Essayez un autre prompt.' }, { status: 400 })
    }

    const base64Data = imagePart.inlineData.data
    const mimeType = imagePart.inlineData.mimeType || 'image/png'
    const ext = mimeType.includes('jpeg') || mimeType.includes('jpg') ? 'jpg' : mimeType.includes('webp') ? 'webp' : 'png'

    const filename = slug ? `${slug}-feature.${ext}` : `generated-${Date.now()}.${ext}`
    const filePath = `${cmsConfig.media.path}/${filename}`

    const result = await uploadBinary(
      token, cmsConfig.repo, filePath, base64Data,
      `media: AI-generated image for ${slug || 'article'}`, cmsConfig.branch
    )

    return NextResponse.json({ url: `/${filePath.replace(/^public\//, '')}`, sha: result.sha, filename })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Generation failed' }, { status: 500 })
  }
}
