import { authOptions } from '@/lib/authOptions'
import { createUrl, getUrlsForUser } from '@/lib/url'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // Get Session data
  const session = await getServerSession(authOptions)
  if (!session || !session?.user) {
    return NextResponse.redirect('/dashboard')
  }

  // Get skip and take params from the URL
  const {
    nextUrl: { search },
  } = req
  const urlSearchParams = new URLSearchParams(search)
  const skip = parseInt(urlSearchParams.get('skip') ?? '0')
  const take = Math.min(parseInt(urlSearchParams.get('take') ?? '10'), 100)

  // Get URLs for the user
  const data = await getUrlsForUser(session.user.id, skip, take)

  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  // Get Session data
  const session = await getServerSession(authOptions)
  if (!session || !session?.user) {
    return NextResponse.redirect('/dashboard')
  }

  try {
    // Get originalUrl from the body of request
    const body = await req.json()
    console.log(body)
    const originalUrl = body.get('url')

    // Try to parse the URL
    // This will throw an exception if the URL is incorrect
    new URL(originalUrl)

    // Create the Url object for the user
    const url = await createUrl(originalUrl, session)

    return NextResponse.json(url)
  } catch (e) {
    return NextResponse.json({ details: 'Invalid URL' }, { status: 400 })
  }
}
