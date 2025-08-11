import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // 使用絕對路徑讀取 JSON 文件
    const filePath = path.join(process.cwd(), 'backend', 'journal.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return NextResponse.json({ news: data })
  } catch (error) {
    console.error('讀取 journal.json 失敗:', error)
    return NextResponse.json({ news: [] }, { status: 500 })
  }
}
