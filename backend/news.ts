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
    const time = new Date().toLocaleString()
    if (title) news.push({ title, time, link, source: 'CNA' })
  })

  return news
}

async function fetchAllNews(): Promise<NewsItem[]> {
  const [et, ltn, cna] = await Promise.all([
    fetchETtoday(),
    fetchLTN(),
    fetchCNA()
  ])
  return [...et, ...ltn, ...cna]
}

function mergeNews(newData: NewsItem[], existingData: NewsItem[]): NewsItem[] {
  const combined = [...newData, ...existingData]
  const seen = new Set<string>()
  return combined.filter(item => {
    if (seen.has(item.link)) return false
    seen.add(item.link)
    return true
  })
}

async function runCrawler() {
  try {
    const newNews = await fetchAllNews()

    // 讀取舊資料（如果有）
    let oldNews: NewsItem[] = []
    const path = './news.json'
    if (fs.existsSync(path)) {
      const raw = fs.readFileSync(path, 'utf-8')
      oldNews = JSON.parse(raw)
    }

    const mergedNews = mergeNews(newNews, oldNews)

    // 時間排序（從新到舊）
    mergedNews.sort((a, b) => b.time.localeCompare(a.time))

    fs.writeFileSync(path, JSON.stringify(mergedNews, null, 2))
    console.log(`[${new Date().toLocaleString()}] ✅ 新增 ${newNews.length} 筆，總數 ${mergedNews.length} 筆`)
  } catch (err) {
    console.error(`[${new Date().toLocaleString()}] ❌ 抓取失敗`, err)
  }
}
runCrawler()

// ✅ 每 5 分鐘定時抓取一次
setInterval(runCrawler, 1 * 60 * 1000)