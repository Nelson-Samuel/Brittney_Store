// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

// Change this to your actual domain (no trailing slash)
const BASE_URL = 'https://www.brittneystore.com'

// Define all your pages
const pages = [
  '/',
  '/about',
  '/contact',
  '/products',
  '/collections',
]

// Generate the sitemap
const sitemapStream = new SitemapStream({ hostname: BASE_URL })
pages.forEach((page) => sitemapStream.write({ url: page, changefreq: 'weekly' }))
sitemapStream.end()

streamToPromise(sitemapStream).then((data) => {
  const writeStream = createWriteStream('./public/sitemap.xml')
  writeStream.write(data.toString())
  console.log('✅ Sitemap created at public/sitemap.xml')
})
