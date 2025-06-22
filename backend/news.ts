import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'

async function fetchETtoday() {
  const res = await axios.get('	https://tw.news.yahoo.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  })

  const $ = cheerio.load(res.data)
  const news: { time: string; title: string; link: string }[] = []

  $('.part_list_2 > ul > li').each((_, el) => {
    const time = $(el).find('.date').text().trim()
    const title = $(el).find('a').text().trim()
    const link = 'https://www.ettoday.net' + $(el).find('a').attr('href')
    if (title) news.push({ time, title, link })
  })

  fs.writeFileSync('./news.json', JSON.stringify(news, null, 2))
  console.log(`[${new Date().toLocaleTimeString()}] ✅ 抓到 ${news.length} 筆 ETtoday 新聞`)
}

fetchETtoday()
