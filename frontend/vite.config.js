import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SITE_URL = 'https://www.magdalenatecza.com'

function sitemapPlugin() {
  return {
    name: 'seo-sitemap',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      const indexUrl = `${SITE_URL}/`
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${indexUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  resolve: {
    alias: {
      'react': 'react',
      'react-dom': 'react-dom'
    },
    dedupe: ['react', 'react-dom']
  }
})
