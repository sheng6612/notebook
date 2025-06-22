
import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'

type NewsItem = {
  title: string
  time: string
  link: string
  source: string
}

async function fetchETtoday(): Promise<NewsItem[]> {
  const res = await axios.get('https://www.ettoday.net/news/news-list.htm', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  })

  const $ = cheerio.load(res.data)
  const news: NewsItem[] = []

  $('.part_list_2 > ul > li').each((_, el) => {
    const time = $(el).find('.date').text().trim()
    const title = $(el).find('a').text().trim()
    const link = 'https://www.ettoday.net' + $(el).find('a').attr('href')
    if (title) news.push({ title, time, link, source: 'ETtoday' })
  })

  return news
}

async function fetchLTN(): Promise<NewsItem[]> {
  const res = await axios.get('https://news.ltn.com.tw/list/breakingnews')
  const $ = cheerio.load(res.data)
  const news: NewsItem[] = []

  $('ul.list > li').each((_, el) => {
    const time = $(el).find('span.time').text().trim()
    const title = $(el).find('a').text().trim()
    const link = 'https:' + $(el).find('a').attr('href')
    if (title) news.push({ title, time, link, source: 'LTN' })
  })

  return news
}

async function fetchCNA(): Promise<NewsItem[]> {
  const res = await axios.get('https://www.cna.com.tw/list/aall.aspx')
  const $ = cheerio.load(res.data)
  const news: NewsItem[] = []

  $('.mainList li a').each((_, el) => {
    const title = $(el).text().trim()
    const link = 'https://www.cna.com.tw' + $(el).attr('href')
    const time = new Date().toLocaleString() // CNA 沒有時間，手動補
    if (title) news.push({ title, time, link, source: 'CNA' })
  })

  return news
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const [et, ltn, cna] = await Promise.all([fetchETtoday(), fetchLTN(), fetchCNA()])
  const all = [...et, ...ltn, ...cna]
  all.sort((a, b) => b.time.localeCompare(a.time)) // 時間排序（可優化）
  return all
}

// 儲存成 JSON 檔（可接到 PM2 定時任務）
fetchAllNews().then(news => {
  fs.writeFileSync('./news.json', JSON.stringify(news, null, 2))
  console.log(`[${new Date().toLocaleTimeString()}]✅ 已抓取 ${news.length} 則新聞`)
})
//TODO:測試刷新