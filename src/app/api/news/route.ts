import axios from 'axios'
import * as cheerio from 'cheerio'

async function fetchNews() {
  console.log(`[${new Date().toLocaleString()}] 開始爬取 UDN 新聞...`)
  try {
    const { data } = await axios.get('https://udn.com/news/breaknews/1')
    const $ = cheerio.load(data)
    const headlines: string[] = []

    $('.story__headline').each((_, el) => {
      const title = $(el).text().trim()
      if (title) headlines.push(title)
    })

    console.log(`✅ 共抓到 ${headlines.length} 則新聞`)
    console.log(headlines.slice(0, 5)) // 只列前 5 筆
  } catch (err: any) {
    console.error(`❌ 錯誤：${err.message}`)
  }
}

// 每 5 分鐘執行一次
setInterval(fetchNews, 5 * 60 * 1000)

// 立即執行一次
fetchNews()
