import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const headers: Record<string, string> = {
      'User-Agent': 'MyNextApp',
      'Accept': 'application/vnd.github.v3+json',
    }

    const token = process.env.GITHUB_TOKEN
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      console.warn('⚠️ GITHUB_TOKEN 未設定，將以匿名身份呼叫 GitHub API，可能會受到 rate limit 限制')
    }

    const res = await fetch('https://api.github.com/repos/sheng6612/notebook/commits', {
      headers,
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('❌ GitHub API 錯誤：', res.status, errorText)
      return NextResponse.json({
        error: 'GitHub API 錯誤',
        status: res.status,
        response: errorText,
        debug: !token ? '⚠️ 確認是否有設置 GITHUB_TOKEN？' : undefined,
      }, { status: 500 })
    }

    const data = await res.json()
    if (!Array.isArray(data)) {
      console.error('❌ GitHub API 回傳非陣列：', data)
      return NextResponse.json({ error: 'GitHub API 回傳格式錯誤' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('❌ 無法請求 GitHub API：', err)
    return NextResponse.json({
      error: '伺服器錯誤',
      detail: String(err),
      hint: '確認是否設有網路代理或環境變數格式錯誤',
    }, { status: 500 })
  }
}
