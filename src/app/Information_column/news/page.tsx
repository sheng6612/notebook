'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type NewsItem = {
  title: string
  time: string
  link: string
  source: string
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch('/api/news')
      const data = await res.json()
      setNews(data.news || [])
    }
    fetchNews()
    const timer = setInterval(fetchNews, 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="p-6 bg-slate-300">
      <div className='flex justify-between mb-2'>
        <h1 className="text-3xl font-mono mb-4">news</h1>
        <div className='lex px-4 space-x-4'>
          <Link href="/">
            <Button variant="ghost"className='text-2xl font-mono'>返回</Button>
          </Link>
        </div>
      </div>
      
      <ul className="space-y-2">
        {news.map((item, idx) => (
          <li key={idx} className="bg-white p-3 rounded shadow">
            <a href={item.link} target="_blank" className="text-blue-600 font-semibold hover:underline">
              [{item.source}] {item.title}
            </a>
            <div className="text-sm text-gray-500">{item.time}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
//TODO:測試刷新