import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`${BACKEND}/api/books/${id}`, { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const res = await fetch(`${BACKEND}/api/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await fetch(`${BACKEND}/api/books/${id}`, { method: 'DELETE' })
  return NextResponse.json({ ok: true })
}