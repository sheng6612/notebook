'use client'

import { useState } from 'react'

export default function Home() {
  const [news, setNews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchNews = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/news')
      const data = await res.json()
      setNews(data.news || [])
    } catch (err) {
      alert('抓取失敗')
    }
    setLoading(false)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">即時新聞爬蟲（udn.com）</h1>
      <button
        onClick={fetchNews}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? '抓取中...' : '取得新聞'}
      </button>

      <ul className="mt-6 space-y-2">
        {news.map((item, idx) => (
          <li key={idx} className="bg-gray-100 p-3 rounded">{item}</li>
        ))}
      </ul>
    </div>
  )
}
