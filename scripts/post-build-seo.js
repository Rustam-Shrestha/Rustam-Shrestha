import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const publicDir = path.join(rootDir, 'public')

const BASE_URL = 'https://santoshshrestha4.com.np'
const TODAY = new Date().toISOString().split('T')[0]

// Define all public crawlable routes with SEO metadata
const ROUTES = [
  {
    path: '/',
    dir: '',
    title: 'Santosh (Rustam) Shrestha | Full-Stack Developer (MERN Stack)',
    description:
      'Official portfolio of Santosh (Rustam) Shrestha. Exploring production ML systems, full-stack ERP architectures, and scalable web solutions.',
    priority: '1.0',
    changefreq: 'weekly',
    heading: 'Santosh (Rustam) Shrestha',
    subheading: 'Full-Stack Developer (MERN Stack) · Applied ML Enthusiast',
  },
  {
    path: '/about',
    dir: 'about',
    title: 'About Me | Santosh (Rustam) Shrestha',
    description:
      'Engineering background, university education, career milestones, and certifications of Santosh (Rustam) Shrestha.',
    priority: '0.8',
    changefreq: 'monthly',
    heading: 'Background, academic training & career journey',
    subheading: 'Bachelor in Computer Application (BCA) at Tribhuvan University, Full-Stack MERN Developer in industry.',
  },
  {
    path: '/projects',
    dir: 'projects',
    title: 'Projects & Platforms | Santosh (Rustam) Shrestha',
    description:
      'Machine learning credit-risk models, structured data intelligence systems, and full-stack web platforms by Santosh (Rustam) Shrestha.',
    priority: '0.9',
    changefreq: 'weekly',
    heading: 'Production systems & applied platforms',
    subheading: 'Curated projects spanning deep learning LSTM, XGBoost credit scoring, and PERN stack platforms.',
  },
  {
    path: '/skills',
    dir: 'skills',
    title: 'Technical Skills & Competencies | Santosh (Rustam) Shrestha',
    description:
      'Comprehensive technical skill matrix, languages, frameworks, database systems, and ML tooling mastered by Santosh (Rustam) Shrestha.',
    priority: '0.8',
    changefreq: 'monthly',
    heading: 'Engineering competencies & technology stack',
    subheading: 'Specialized tooling matrix across frontend, backend, databases, and machine learning.',
  },
  {
    path: '/testimonials',
    dir: 'testimonials',
    title: 'Testimonials & Professional Recommendations | Santosh (Rustam) Shrestha',
    description:
      'Verified recommendations, academic mentorship endorsements, and enterprise feedback for Santosh (Rustam) Shrestha from university leadership, supervisors, and industry executives.',
    priority: '0.85',
    changefreq: 'monthly',
    heading: 'Professional testimonials & verified recommendations',
    subheading: 'Direct endorsements from academic heads, engineering mentors, industry leadership, and system evaluators.',
  },
  {
    path: '/contact',
    dir: 'contact',
    title: 'Contact & Inquiries | Santosh (Rustam) Shrestha',
    description:
      'Get in touch with Santosh (Rustam) Shrestha for software engineering roles, applied machine learning projects, or technical consulting.',
    priority: '0.7',
    changefreq: 'monthly',
    heading: 'Initiate direct dialogue for projects & engineering roles',
    subheading: 'Available for full-stack engineering roles, applied machine learning collaborations, and technical consulting.',
  },
]

// 1. Generate sitemap.xml
function generateSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${BASE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8')
  }
  console.log(`[SEO] Generated sitemap.xml with ${ROUTES.length} canonical routes.`)
}

// 2. Generate robots.txt
function generateRobots() {
  const content = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), content, 'utf8')
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'robots.txt'), content, 'utf8')
  }
  console.log(`[SEO] Generated robots.txt pointing to ${BASE_URL}/sitemap.xml`)
}

// 3. Static Pre-Rendering (SSG) for static hosts
function prerenderStaticPages() {
  const baseHtmlPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(baseHtmlPath)) {
    console.warn('[SEO] dist/index.html not found, skipping static prerender.')
    return
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8')

  for (const route of ROUTES) {
    if (!route.dir) {
      // Root index.html - update canonical & title
      let rootHtml = baseHtml
      rootHtml = replaceMetaTags(rootHtml, route)
      fs.writeFileSync(baseHtmlPath, rootHtml, 'utf8')
      continue
    }

    const routeDir = path.join(distDir, route.dir)
    fs.mkdirSync(routeDir, { recursive: true })

    const routeHtmlPath = path.join(routeDir, 'index.html')
    let prerenderedHtml = replaceMetaTags(baseHtml, route)
    // Fix relative links for nested directories (e.g. ./assets -> ../assets)
    prerenderedHtml = prerenderedHtml
      .replaceAll('href="./', 'href="../')
      .replaceAll('src="./', 'src="../')
    fs.writeFileSync(routeHtmlPath, prerenderedHtml, 'utf8')
    console.log(`[SSG] Prerendered static page: dist/${route.dir}/index.html`)
  }
}

function replaceMetaTags(html, route) {
  const canonicalUrl = `${BASE_URL}${route.path === '/' ? '/' : route.path}`

  let result = html

  // Title
  result = result.replace(/<title>.*?<\/title>/is, `<title>${route.title}</title>`)

  // Canonical tag
  if (result.includes('<link rel="canonical"')) {
    result = result.replace(
      /<link rel="canonical"[^>]*>/is,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
  } else {
    result = result.replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`
    )
  }

  // Meta description
  result = result.replace(
    /<meta name="description"[^>]*>/is,
    `<meta name="description" content="${route.description}" />`
  )

  // Open Graph
  result = result.replace(
    /<meta property="og:title"[^>]*>/is,
    `<meta property="og:title" content="${route.title}" />`
  )
  result = result.replace(
    /<meta property="og:description"[^>]*>/is,
    `<meta property="og:description" content="${route.description}" />`
  )
  result = result.replace(
    /<meta property="og:url"[^>]*>/is,
    `<meta property="og:url" content="${canonicalUrl}" />`
  )

  // Twitter
  result = result.replace(
    /<meta property="twitter:title"[^>]*>/is,
    `<meta property="twitter:title" content="${route.title}" />`
  )
  result = result.replace(
    /<meta property="twitter:description"[^>]*>/is,
    `<meta property="twitter:description" content="${route.description}" />`
  )

  // Fallback crawler content inside #root for crawlers without JS
  const crawlerFallback = `
    <div id="root">
      <main style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:system-ui,sans-serif;">
        <h1 style="font-size:2rem;font-weight:bold;color:#111827;">${route.heading}</h1>
        <p style="color:#166534;font-size:1.1rem;margin-top:8px;">${route.subheading}</p>
        <p style="color:#4B5563;margin-top:16px;">${route.description}</p>
      </main>
    </div>`

  result = result.replace(/<div id="root"><\/div>/is, crawlerFallback.trim())

  return result
}

// 4. Pre-compress all static assets with Gzip and Brotli
function compressAssets() {
  if (!fs.existsSync(distDir)) return

  const compressibleExtensions = ['.html', '.js', '.css', '.svg', '.json', '.xml', '.txt']
  let count = 0
  let originalBytes = 0
  let gzipBytes = 0
  let brotliBytes = 0

  function walkAndCompress(dir) {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walkAndCompress(fullPath)
      } else {
        const ext = path.extname(file).toLowerCase()
        if (compressibleExtensions.includes(ext) && !file.endsWith('.gz') && !file.endsWith('.br')) {
          const content = fs.readFileSync(fullPath)
          originalBytes += content.length

          // Gzip compression (level 9 maximum)
          const gzipped = zlib.gzipSync(content, { level: 9 })
          fs.writeFileSync(`${fullPath}.gz`, gzipped)
          gzipBytes += gzipped.length

          // Brotli compression (level 11 maximum quality)
          const brotli = zlib.brotliCompressSync(content, {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          })
          fs.writeFileSync(`${fullPath}.br`, brotli)
          brotliBytes += brotli.length

          count++
        }
      }
    }
  }

  walkAndCompress(distDir)
  const gzipSaved = (((originalBytes - gzipBytes) / originalBytes) * 100).toFixed(1)
  const brotliSaved = (((originalBytes - brotliBytes) / originalBytes) * 100).toFixed(1)

  console.log(
    `[Compression] Pre-compressed ${count} assets: Gzip (${gzipSaved}% smaller) · Brotli (${brotliSaved}% smaller)`
  )
}

// Run all tasks
console.log('[Build] Executing Post-Build SEO & Optimization Pipeline...')
generateSitemap()
generateRobots()
prerenderStaticPages()
compressAssets()
console.log('[Build] Pipeline completed successfully.')
