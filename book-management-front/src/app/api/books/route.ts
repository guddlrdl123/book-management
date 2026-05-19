import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL

export async function GET(req: NextRequest) {
    // 임시 디버그
    if (!BACKEND) {
        return NextResponse.json({ error: 'BACKEND_URL is undefined' }, { status: 500 })
    }

    const { searchParams } = req.nextUrl
    const query = searchParams.toString()
    const res = await fetch(`${BACKEND}/api/books${query ? '?' + query : ''}`, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const res = await fetch(`${BACKEND}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}