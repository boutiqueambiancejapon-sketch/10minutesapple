import { NextResponse } from 'next/server'
import { getSession } from '@/packages/cms/lib/get-session'
import { put } from '@vercel/blob'

export const dynamic = 'force-dynamic'

const BFL_API = 'https://api.bfl.ai/v1'
const MAX_POLLS = 60 // 30 seconds max

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.BFL_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'BFL_API_KEY not configured' }, { status: 500 })

  const { prompt, slug } = (await request.json()) as { prompt: string; slug?: string }
  if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })

  try {
    // 1. Submit generation request
    const submitRes = await fetch(`${BFL_API}/flux-2-pro-preview`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `${prompt}. Style: modern, clean, tech-focused, dark background preferred. No text in the image.`,
        width: 1440,
        height: 810,
      }),
    })

    if (!submitRes.ok) {
      const err = await submitRes.text()
      return NextResponse.json({ error: `Flux API error: ${submitRes.status} ${err.slice(0, 200)}` }, { status: 500 })
    }

    const submitData = await submitRes.json()
    const pollingUrl = submitData.polling_url
    const requestId = submitData.id

    if (!pollingUrl || !requestId) {
      return NextResponse.json({ error: 'Flux API did not return a polling URL' }, { status: 500 })
    }

    // 2. Poll for result
    let imageUrl: string | null = null

    for (let i = 0; i < MAX_POLLS; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const pollRes = await fetch(`${pollingUrl}?id=${requestId}`, {
        headers: { 'accept': 'application/json', 'x-key': apiKey },
      })

      if (!pollRes.ok) continue

      const pollData = await pollRes.json()

      if (pollData.status === 'Ready') {
        imageUrl = pollData.result?.sample
        break
      }

      if (pollData.status === 'Error' || pollData.status === 'Failed') {
        return NextResponse.json({ error: `Génération échouée : ${JSON.stringify(pollData)}` }, { status: 500 })
      }
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'Timeout — l\'image met trop de temps à se générer. Réessayez.' }, { status: 504 })
    }

    // 3. Download the image (Flux URLs expire in 10 min)
    const imageRes = await fetch(imageUrl)
    if (!imageRes.ok) {
      return NextResponse.json({ error: 'Failed to download generated image' }, { status: 500 })
    }

    // 4. Upload to Vercel Blob (instant, no redeploy)
    const contentType = imageRes.headers.get('content-type') || 'image/jpeg'
    const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg'
    const filename = slug ? `${slug}-feature.${ext}` : `generated-${Date.now()}.${ext}`

    const blob = await put(`images/${filename}`, imageRes.body!, {
      access: 'public',
      contentType,
      addRandomSuffix: false,
    })

    return NextResponse.json({ url: blob.url, filename })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Generation failed' }, { status: 500 })
  }
}
