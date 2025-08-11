"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"

type logsItem = {
    time: string,
    title: string,
    messang: string, // 保持與 JSON 文件中的字段名一致
    level: string,
}

const PIE_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b']
const PIE_LEVELS = [
    { key: '警急', name: '警急' },
    { key: '普通', name: '普通' },
    { key: '進行中', name: '進行中' },
    { key: '遇時', name: '遇時' },
]

// 統計各 level 數量
const getLogCounts = (logData: logsItem[]) => {
const counts: Record<string, number> = {}
PIE_LEVELS.forEach(({ key }) => {
    counts[key] = 0
})

    logData.forEach(log => {
        if (counts.hasOwnProperty(log.level)) {
            counts[log.level]++
            }
    })

return counts
}

// 顏色對應 Tailwind class
const getLevelColor = (level: string) => {
    switch (level) {
    case '警急':
        return 'text-red-400'
    case '普通':
        return 'text-blue-400'
    case '進行中':
        return 'text-green-400'
    case '遇時':
        return 'text-yellow-400'
    default:
        return 'text-gray-300'
    }
}

export default function HomeTable() {
    const [logss, setlogss] = useState<logsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchlogss = async () => {
        try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/journal')
        if (!res.ok) throw new Error('獲取數據失敗')
        const data = await res.json()
        setlogss(data.news || [])
        } catch (err) {
        setError(err instanceof Error ? err.message : '未知錯誤')
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchlogss()
        const timer = setInterval(fetchlogss, 10 * 60 * 1000) // 每 10 分鐘更新
        return () => clearInterval(timer)
    }, [])

    const levelCounts = getLogCounts(logss)

    if (loading) {
        return (
        <div className="mt-6 bg-slate-500 rounded-lg p-4">
            <div className="text-white text-center">載入中...</div>
        </div>
        )
    }

    if (error) {
        return (
        <div className="mt-6 bg-red-500 rounded-lg p-4">
            <div className="text-white text-center">錯誤: {error}</div>
        </div>
        )
    }

    return (
        <div>
            <div className="flex space-x-4 justify-center mb-4">
                {PIE_LEVELS.map((lvl, index) => (
                <div
                    key={lvl.key}
                    className="text-white text-xl px-4 py-2 rounded-lg font-medium"
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                >
                    {lvl.name}: {levelCounts[lvl.key] || 0}
                </div>
                ))}
                <div className="flex flex-row-reverse mb-4">
                    <Button className="text-xl" onClick={fetchlogss}>更新</Button>
                </div>
            </div>

        <div className="mt-6 bg-slate-500 rounded-lg overflow-hidden">
            <table className="w-full">
            <thead className="bg-slate-400">
                <tr>
                <th className="px-4 py-3 text-black font-medium">時間</th>
                <th className="px-4 py-3 text-black font-medium">標題</th>
                <th className="px-4 py-3 text-black font-medium">內容</th>
                <th className="px-4 py-3 text-black font-medium">類型</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-400">
                {logss.length === 0 ? (
                <tr>
                    <td colSpan={4} className="px-4 py-8 text-white text-center">
                    暫無數據
                    </td>
                </tr>
                ) : (
                logss.map((log, index) => (
                    <tr key={index}>
                    <td className="px-4 py-3 text-white text-center font-mono">{log.time}</td>
                    <td className="px-4 py-3 text-white text-center font-mono">{log.title}</td>
                    <td className="px-4 py-3 text-white text-center font-mono">{log.messang}</td>
                    <td className={`px-4 py-3 text-center font-medium ${getLevelColor(log.level)}`}>
                        {log.level}
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    )
    }
