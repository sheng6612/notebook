// app/page.tsx
'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Commit = {
  sha: string
  commit: {
    message: string
    author: { name: string; date: string }
  }
}

export default function Home() {
  const [commits, setCommits] = useState<Commit[]>([])

  useEffect(() => {
  fetch('/api/github-commits')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setCommits(data.slice())
      } else {
        console.error('⚠️ 回傳不是陣列：', data)
      }
    })
    .catch(err => {
      console.error('❌ 錯誤：', err)
    })
    console.log(process.env.GITHUB_TOKEN) 
}, [])


  return (
    <main className="p-6 h-full w-full bg-gradient-to-b from-slate-200 to-slate-500">
      <div className='flex justify-between mb-2'>
        <h1 className="text-2xl font-bold mb-4">📦 最新 Commits</h1>
        <div className='flex px-4 space-x-4'>
          <Link href="/">
            <Button variant="ghost" className='text-2xl font-mono'>返回</Button>
          </Link>
        </div>
      </div>
          <ul className="space-y-2">
        {commits.map((c, i) => (
          <li key={i} className="border-b pb-2">
            <div className="font-mono">{c.commit.message}</div>
            <div className="text-sm text-gray-500">
              by {c.commit.author.name} @ {new Date(c.commit.author.date).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
//TODO:UI優化
//FIXME:介面重寫
