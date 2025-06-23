import { NextResponse } from 'next/server'
import fs from 'fs'

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync('./backend/news.json', 'utf-8'))
    return NextResponse.json({ news: data })
  } catch {
    return NextResponse.json({ news: [] }, { status: 500 })
  }
}
