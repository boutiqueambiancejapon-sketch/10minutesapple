import { cookies } from 'next/headers'
import { decryptSession } from './session'
import type { CmsSession } from '../types'

/** Get the current CMS session from cookies. Returns null if not logged in. */
export async function getSession(): Promise<CmsSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('cms-session')?.value
  if (!token) return null
  return decryptSession(token)
}
