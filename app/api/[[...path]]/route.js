import { NextResponse } from 'next/server'

// GET handler for root path
export async function GET(request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  // Root API endpoint
  if (pathname === '/api/' || pathname === '/api') {
    return NextResponse.json({ 
      message: 'Arabic to Kurdish Converter API is running',
      status: 'success',
      timestamp: new Date().toISOString()
    })
  }

  // Fallback for undefined routes
  return NextResponse.json(
    { error: 'API endpoint not found' },
    { status: 404 }
  )
}

// POST handler (if needed for future extensions)
export async function POST(request) {
  try {
    const body = await request.json()
    
    // For future API endpoints if needed
    return NextResponse.json({
      message: 'POST endpoint ready for future use',
      received: body
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
}