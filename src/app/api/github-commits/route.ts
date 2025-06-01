import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/repos/sheng6612/notebook/commits', {
      headers: {
        'User-Agent': 'MyNextApp',
        'Accept': 'application/vnd.github.v3+json',
        // 若有 token，可加上：
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('❌ GitHub API 錯誤：', res.status, errorText)
      return NextResponse.json({ error: 'GitHub API 錯誤', status: res.status }, { status: 500 })
    }

    const data = await res.json()
    if (!Array.isArray(data)) {
      console.error('❌ GitHub API 回傳非陣列：', data)
      return NextResponse.json({ error: 'GitHub API 回傳格式錯誤' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('❌ 無法請求 GitHub API：', err)
    return NextResponse.json({ error: '伺服器錯誤', detail: String(err) }, { status: 500 })
  }
}
