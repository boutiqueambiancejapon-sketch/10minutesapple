import { NextResponse } from 'next/server'
import { getSession, getGitHubToken } from '@/packages/cms/lib/get-session'
import { uploadBinary } from '@/packages/cms/lib/github'
import { cmsConfig } from '@/cms.config'

export const dynamic = 'force-dynamic'

/** Try multiple Gemini model names — availability varies by API key/region */
const MODELS_TO_TRY = [
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp-image-generation',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
]

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const ghToken = await getGitHubToken()
  if (!ghToken) return NextResponse.json({ error: 'No GitHub token' }, { status: 401 })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })

  const body = (await request.json()) as { prompt: string; slug?: string }

  // If action=list-models, return available models (for debugging)
  if (body.prompt === '__list_models__') {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
    const data = await res.json()
    const models = (data.models ?? []).map((m: Record<string, unknown>) => m.name)
    return NextResponse.json({ models })
  }

  const { prompt, slug } = body
  if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })

  // Try each model until one works
  for (const model of MODELS_TO_TRY) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    try {
      const geminiRes = await fetch(url, {
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

      if (!geminiRes.ok) continue // Try next model

      const data = await geminiRes.json()
      const parts = data.candidates?.[0]?.content?.parts ?? []
      const imagePart = parts.find((p: Record<string, unknown>) => p.inlineData)

      if (!imagePart?.inlineData?.data) continue // Model worked but no image, try next

      const base64Data = imagePart.inlineData.data as string
      const mimeType = (imagePart.inlineData.mimeType as string) || 'image/png'
      const ext = mimeType.includes('jpeg') || mimeType.includes('jpg') ? 'jpg' : mimeType.includes('webp') ? 'webp' : 'png'
      const filename = slug ? `${slug}-feature.${ext}` : `generated-${Date.now()}.${ext}`
      const filePath = `${cmsConfig.media.path}/${filename}`

      const result = await uploadBinary(
        ghToken, cmsConfig.repo, filePath, base64Data,
        `media: AI-generated image for ${slug || 'article'}`, cmsConfig.branch
      )

      return NextResponse.json({
        url: `/${filePath.replace(/^public\//, '')}`,
        sha: result.sha,
        filename,
        model, // tell which model worked
      })
    } catch {
      continue // Try next model
    }
  }

  // All models failed — list available ones for debugging
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
    const listData = await listRes.json()
    const available = (listData.models ?? [])
      .map((m: Record<string, string>) => m.name)
      .filter((n: string) => n.includes('gemini'))
      .slice(0, 10)
      .join(', ')
    return NextResponse.json({
      error: `Aucun modèle Gemini n'a pu générer d'image. Modèles disponibles : ${available}`
    }, { status: 500 })
  } catch {
    return NextResponse.json({ error: 'Tous les modèles ont échoué. Vérifiez votre GEMINI_API_KEY.' }, { status: 500 })
  }
}
