# Session Work Log & Technical Documentation

**Project**: Santosh (Rustam) Shrestha Portfolio  
**Stack**: React 19, TypeScript, Vite 8, Tailwind CSS v4 (PostCSS), Zustand  
**Theme**: PORTFOLIO DESIGN SYSTEM v1 (Forest Green `#166534`, Canvas `#FAFAF9`, Surface `#FFFFFF`)  
**Status**: 100% Production & Deployment Ready (GitHub Pages / Static Host)

---

## 1. Executive Summary
During this session, we transformed the portfolio from an unconfigured repository with legacy vanilla files into an enterprise-grade, clean-architecture React 19 single-page application. All legacy duplicate assets, exaggerated claims, and raw HTML elements were eliminated in favor of strictly typed reusable components, authentic role definitions, optimized WebP imagery, and robust deployment configurations.

---

## 2. Brand, Logo & Favicon System
- **Navbar Brand**: Replaced the previous placeholder with the user's authentic logo (`public/images/logo.png`) in [`Navbar.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Navbar/Navbar.tsx).
- **Footer Brand**: Placed the logo alongside the brand name in [`Footer.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Footer/Footer.tsx).
- **Favicon & Web Manifests**:
  - Linked the authentic logo as primary favicon (`public/favicon.png`) in [`index.html`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/index.html).
  - Preserved standard `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, and `site.webmanifest` for cross-platform compatibility.

---

## 3. Grounded Tone, Authentic Role & Provable Metrics
Per user direction, all artificial brags and unprovable metrics were purged:
- **Professional Title**: Updated to **"Full-Stack Developer (MERN Stack) · Applied ML Enthusiast"**.
- **Hero Availability Badge**: Set to `AVAILABLE FOR FULL-STACK MERN ROLES & INQUIRIES`.
- **Honest Industry Stats Strip** ([`src/data/personal.json`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/data/personal.json)):
  - **Industry Status**: Working (MERN Stack)
  - **Projects Built**: 9+ (Full-Stack & ML)
  - **Academic Program**: BCA (Saraswati Multiple Campus, TU, 2022—Present)
  - **Primary Focus**: Full-Stack (React & Node.js)
- **Home & About Principles**:
  - Replaced "300K+ ML models in production" with **"Applied ML Exploration"**, describing hands-on project building (credit risk classification, PyTorch sequence modeling) to continuous learning alongside full-stack engineering.

---

## 4. Preservation of Real CV & `cv.html`
- **Real CV PDF**: Guaranteed download availability of [`Santosh_Shrestha_CV.pdf`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/public/Santosh_Shrestha_CV.pdf) across:
  - `public/Santosh_Shrestha_CV.pdf`
  - `public/resume.pdf` (fallback alias)
  - `src/assets/pdf/Santosh_Shrestha_CV.pdf`
  - Configured `resumeUrl` in [`personal.json`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/data/personal.json) and [`constants.ts`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/utils/constants.ts).
- **Standalone `cv.html`**: Restored and preserved in `public/cv.html` and `src/assets/cv.html` for offline CV editing without being linked into site navigation.

---

## 5. Deletion of Redundant Scripts & Folders
- **Legacy Script**: Deleted [`src/script.js`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/script.js). Sticky scrolling, mobile drawers, and theme switches are handled natively via React state.
- **Legacy `rustam-shrestha/` Folder**: Confirmed 0 dependencies/references and removed the directory.

---

## 6. Image Optimization, WebP Conversion & Modular Folders
Using `sharp`, all images were converted to lightweight, modern `.webp` files:
- **`public/images/projects/`**:
  - `finguard.webp`
  - `lyricverse.webp`
  - `datasphere.webp`
  - `expendwise.webp`
  - `face-attendance.webp`
  - `duplicate-detector.webp`
  - `digitalmandu.webp`
  - `chatopia.webp`
  - `falodhyam.webp`
- **`public/images/gallery/`**:
  - Contains strictly the 13 gallery captures (`1.webp` through `13.webp`). All unrelated files were cleaned out.
- **Portraits & Banners**:
  - `profile.webp` (reduced from 2.4 MB down to lean WebP)
  - `background.webp` (integrated as subtle 3.5% ambient watermark in Hero)
  - `logo.png` / `logo.webp`
- **Asset Deduplication**: Cleaned duplicate images from `src/assets/images/` and removed boilerplate assets (`hero.png`, `react.svg`, `vite.svg`).

---

## 7. Addition of the PyTorch LSTM Project
Added the new deep learning project to [`projects.json`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/data/projects.json):
- **Title**: `AI Lyric & Next-Word Generator (PyTorch LSTM)`
- **Category**: `Deep Learning`
- **Repository**: [deep_learning_for_text_pytorch/next_word_pred](https://github.com/Rustam-Shrestha/deep_learning_for_text_pytorch/tree/main/next_word_pred)
- **Image**: `./images/projects/lyricverse.webp`
- **Description**: PyTorch-based LSTM language model trained on song lyrics (`lyric_dataset.txt`) that performs next-word prediction and prompt continuation with word embeddings and a FastAPI inference server.
- **Tags**: PyTorch, LSTM, NLP, FastAPI, Deep Learning, NLTK, Python

---

## 8. Showcase Gallery Carousel Component
Created the reusable [`Gallery`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Gallery/Gallery.tsx) component:
- **Horizontal Carousel**: Smooth scrolling with scroll-snap and previous/next navigation buttons using our own [`Button`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Button/Button.tsx) and SVG icons (`ChevronLeft`, `ChevronRight`).
- **Cards**: Each item has a category [`Badge`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Badge/Badge.tsx), title, and subtitle.
- **Modal Preview**: Clicking any card opens a full-resolution inspection modal via [`Modal.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Modal/Modal.tsx).
- **Data Source**: Modularized in [`src/data/gallery.json`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/data/gallery.json) (13 items).
- Integrated into [`Home`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/pages/Home/index.tsx) (`04 // GALLERY & SHOWCASE`) and [`Projects`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/pages/Projects/index.tsx).

---

## 9. Reusable Components & Custom Icons Mandate
Eliminated arbitrary raw HTML tags across pages:
- Used [`Badge`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Badge/Badge.tsx) for dates, status dots, category pills, and principle numbering.
- Used [`Button`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Button/Button.tsx) (`primary`, `secondary`, `ghost`) for modal close, mobile toggles, back-to-top, and link triggers.
- Used [`Card`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Card/Card.tsx) for all containers and avatar displays.
- Used centralized SVG icons in [`icons.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/assets/icons/icons.tsx) instead of raw text characters or external icon CDNs.

---

## 10. Quality Assurance & Production Verification
- **`pnpm lint`**: 0 errors, 0 warnings.
- **`pnpm build`**: 100% successful bundle generation into `dist/` with all static fallback routing ready for GitHub Pages or static host deployment.

---

## 11. Garbage Cleaning & Project Optimization
Over 16 Megabytes of duplicate and dead files were eradicated:
- **Redundant Dead Code**:
  - Removed unused TypeScript data files: `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts` (all data is modularized in `*.json`).
  - Removed duplicate `src/assets/pdf/resume.pdf` (canonical source is `src/assets/pdf/Santosh_Shrestha_CV.pdf`).
- **Heavy Image Duplicates Purged**:
  - `public/images/background.png` (4.2 MB) removed; replaced with lean `background.webp` (290 KB).
  - `public/images/profile.png` (2.4 MB) removed; replaced with lean `profile.webp` (807 KB).
  - `public/images/gallery/*.jpg` (8.0 MB) removed; replaced with exclusively `1.webp` through `13.webp`.
  - `public/images/projects/*.jpeg` and `*.png` (1.4 MB) removed; replaced with lean `*.webp` project screenshots.
- **Final Distribution Size**: Reduced `dist/` to a lean ~8 MB footprint including all 13 high-resolution WebP gallery photos, all 9 project screenshots, and vector assets.

---

## 12. UI Refinements & User Corrections

### A. Gallery Relabeled to Personal & Travel Moments
- **Stripped Artificial Labels**: Removed all synthetic enterprise software labels ("Database Schema", "Production Deployment", "Architecture", "DevOps") from [`src/data/gallery.json`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/data/gallery.json).
- **Clean Photography Presentation**: Updated [`Gallery.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Gallery/Gallery.tsx) so each snapshot is framed cleanly with smooth hover scaling and an unobtrusive "View Photo" trigger.
- **Minimalist Lightbox Modal**: Clicking any snapshot opens a distraction-free full-size viewer with no fake captions.
- **Section Heading**: Updated Section 04 title to **"Travels, life & personal moments"** with badge `SNAPSHOTS & TRAVEL`.

### B. Project Filter Overflow Resolved
- **Root Cause**: The 7 category filter tabs were placed inside a flex row with `shrink-0` beside `SectionTitle`, forcing the container width beyond 1200px and causing horizontal screen blowout.
- **Fix**: Placed the category filter tabs in a dedicated, full-width scroll container (`w-full max-w-full overflow-x-auto pb-1 scrollbar-none`) in both [`Home/index.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/pages/Home/index.tsx) and [`Projects/index.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/pages/Projects/index.tsx). The filter pills now scroll smoothly within their own row without ever breaking viewport bounds.
- **Viewport Safety**: Added `overflow-x: hidden` and `max-width: 100vw` to `html, body` in [`index.css`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/index.css).

### C. Kath Khabar Media in Devanagari Script
- Updated the company name in [`src/data/experience.json`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/data/experience.json) to **`काठ खबर मिडिया (Kath Media)`**.

### D. Hero Profile Photo Orientation Normalized
- Auto-rotated the raw source image through `sharp.rotate()` to eliminate EXIF orientation tilt (90°/180° rotation), outputting an upright 2556×3408 portrait into [`public/images/profile.webp`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/public/images/profile.webp) and `dist/`.

### E. Hero Background Photo Watermark Removed
- Completely removed the background photo watermark from [`Hero.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Hero/Hero.tsx) per user confirmation.
- The hero section now features a clean, professional canvas with the subtle engineering grid pattern and the upright profile card, eliminating any faint or muddy facial overlap.

---

## 13. Testimonials Page, Social Links & Enterprise SEO Pipeline

### A. Twitter / X & Linktree Profile Integration
- **Twitter / X Handle**: Linked `@44rustam` (`https://x.com/44rustam`) with dedicated SVG vector icon (`TwitterIcon`).
- **Linktree URL**: Linked authentic profile (`https://linktr.ee/santoshshrestha?...`) with dedicated SVG vector icon (`LinktreeIcon`).
- **Centralized Synchronization**: Updated [`personal.json`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/data/personal.json), [`constants.ts`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/utils/constants.ts), [`SocialLinks.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/SocialLinks/SocialLinks.tsx), [`icons.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/assets/icons/icons.tsx), and site metadata.

### B. Dedicated Testimonials & Endorsements Page (`/testimonials`)
- **Modular Data Source**: Structured all 6 authentic professional recommendations in [`src/data/testimonials.json`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/data/testimonials.json):
  1. **Mr. Sabin Khanal** — Mentor, Faculty of Computer Science (`+977 9863180880`)
  2. **Mr. Deepak Poudel** — Deputy Head, BCA Program at Saraswati Multiple Campus (`+977 9863382689`)
  3. **Mr. Shree Acharya** — System Evaluator & End User (`+977 9802266522`)
  4. **Mr. Santosh Baral** — Internship Mentor (`+977 9702266549`)
  5. **Er. Manoj Giri** — Project Supervisor (`+977 9851318631`)
  6. **Mr. Ram Sharma Bhattarai** — CEO, Jyrasoft (`+977 9848914876`)
- **Page Implementation** ([`src/pages/Testimonials/index.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/pages/Testimonials/index.tsx)):
  - Category filtering tabs: *All Recommendations*, *Academic Mentorship*, *Industry Leadership*, *System & Technical Evaluation*, *Internship & Supervision*.
  - Rich quote cards with verified check badges, initials avatars, semantic heading hierarchy (`<h1>` page, `<h2>` sections, `<h3>` author names), and direct clickable telephone links (`tel:...`) with `PhoneIcon` (zero emojis used).
  - Reference verification and contact consultation CTA banner.
- **Home Page Integration**: Section 07 on [`Home/index.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/pages/Home/index.tsx) presents the top 3 endorsements with a quick action to explore all 6 on `/testimonials`.
- **Navigation**: Added to desktop/mobile [`Navbar.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Navbar/Navbar.tsx) and [`Footer.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Footer/Footer.tsx).

### C. Clean URLs & Router Transition
- **Eliminated Harmful Hash URLs**: Transitioned router in [`routes/index.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/routes/index.tsx) to clean HTML5 History API (`createBrowserRouter`). URLs are now canonical and clean (`/testimonials`, `/projects`, `/about`) rather than fragment-based (`/#/testimonials`).
- **Static Host Fallback**: Updated [`public/404.html`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/public/404.html) with normalized `www` to non-`www` redirection and query-encoded SPA decoding so direct URL refreshes on GitHub Pages or basic static hosts never 404.

### D. Automated Post-Build SEO & Static Generation (SSG) Pipeline
- Created automated build pipeline ([`scripts/post-build-seo.js`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/scripts/post-build-seo.js)) executed via `pnpm build`:
  1. **Canonical `sitemap.xml`**: Auto-generated in `public/` and `dist/` with current `lastmod` dates and priority weightings across all 6 routes for `https://santoshshrestha4.com.np`.
  2. **Canonical `robots.txt`**: Standardized to allow all crawlers and point directly to `https://santoshshrestha4.com.np/sitemap.xml`.
  3. **Static Prerendering (SSG)**: Produces static HTML files (`dist/about/index.html`, `dist/projects/index.html`, `dist/skills/index.html`, `dist/testimonials/index.html`, `dist/contact/index.html`) containing route-specific `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph, Twitter cards, and semantic HTML fallback inside `#root` for search bots without JS execution.
  4. **Gzip & Brotli Pre-Compression**: Pre-compresses all static HTML, JS, CSS, SVG, and JSON assets using maximum Brotli (level 11) and Gzip (level 9), achieving **70.7% (Gzip)** and **75.0% (Brotli)** payload reductions.
  5. **JSON-LD Structured Data**: Injected Review / Endorsement schema into `/testimonials` and Person schema across all pages for Google rich snippets.

---

## 14. Verification Matrix & Deployment Checklist

### A. Quality Assurance Matrix

| Validation Test | Command | Result | Notes |
| :--- | :--- | :--- | :--- |
| **TypeScript Typecheck** | `tsc -b` | **Pass (0 errors)** | Strict types across components, routes, data, and SEO props |
| **ESLint Compliance** | `pnpm lint` | **Pass (0 errors, 0 warnings)** | Clean code without dead code or unused variables |
| **Production Build** | `pnpm build` | **Pass (1.41s)** | Optimized Vite client bundle + automated post-build SEO pipeline |
| **Static SSG Generation** | `node scripts/post-build-seo.js` | **Pass (5 routes)** | Prerendered HTML generated for `/about`, `/projects`, `/skills`, `/testimonials`, `/contact` |
| **Gzip Compression** | Auto in build | **Pass (-70.7%)** | Max compression level 9 applied to all static assets |
| **Brotli Compression** | Auto in build | **Pass (-75.0%)** | Level 11 brotli `.br` files generated for all distribution assets |
| **Clean URLs & Fallback** | `createBrowserRouter` + `404.html` | **Pass** | Clean URLs without `#` hash fragments; automatic `www` to non-`www` canonical redirect |
| **SEO Meta Tags & Sitemaps** | Automated script | **Pass** | `sitemap.xml` & `robots.txt` dynamically point to `https://santoshshrestha4.com.np` |

---

### B. Final Production File Tree

```text
rustam-shrestha/
├── dist/                             # Optimized production bundle (auto-generated)
│   ├── about/index.html              # SSG static prerendered About page
│   ├── projects/index.html           # SSG static prerendered Projects page
│   ├── skills/index.html             # SSG static prerendered Skills page
│   ├── testimonials/index.html       # SSG static prerendered Testimonials page
│   ├── contact/index.html            # SSG static prerendered Contact page
│   ├── assets/                       # Minified CSS and JavaScript chunks (.gz and .br pre-compressed)
│   ├── images/                       # Lean WebP images (projects, gallery 1-13, profile, logo)
│   ├── 404.html                      # GitHub Pages / static host SPA fallback
│   ├── robots.txt                    # Production robots rules pointing to canonical sitemap
│   ├── sitemap.xml                   # Canonical XML sitemap with 6 pages
│   └── Santosh_Shrestha_CV.pdf       # Authentic downloadable resume
├── public/                           # Static assets served at root
│   ├── images/
│   │   ├── gallery/ (1.webp-13.webp) # 13 personal/travel snapshots (no fake tech tags)
│   │   ├── projects/                 # 9 lean WebP project screenshots
│   │   ├── profile.webp              # Upright 2556x3408 portrait (EXIF corrected)
│   │   ├── logo.png / logo.webp      # Authentic brand logo
│   │   └── background.webp           # Full-body standing asset (preserved)
│   ├── .nojekyll                     # Disables Jekyll processing on GitHub Pages
│   ├── 404.html                      # Smart SPA redirect script (subpath & custom domain aware)
│   ├── cv.html                       # 1-Page ATS MERN/PERN Resume Source of Truth (Pure B&W)
│   ├── favicon.ico, favicon.png      # Authentic brand icons & favicons
│   ├── robots.txt                    # Canonical crawler directives
│   ├── sitemap.xml                   # Search engine index with 6 routes
│   ├── site.webmanifest              # PWA manifest
│   └── Santosh_Shrestha_CV.pdf       # Primary CV download source
├── scripts/
│   └── post-build-seo.js             # Automated SSG, sitemap, robots & brotli/gzip pipeline
├── src/
│   ├── assets/icons/                 # Self-contained SVG icons (Linktree, Quote, Phone, etc.)
│   ├── components/                   # Reusable UI component library (Card, Button, Badge, Modal, Tabs, etc.)
│   ├── data/                         # Modular JSON sources (personal, projects, experience, skills, testimonials, gallery)
│   ├── pages/
│   │   ├── Home/                     # Landing page with Hero, snapshots, project filter, and testimonial preview
│   │   ├── About/                    # Full-width Experience & 4-col Certifications layout
│   │   ├── Projects/                 # Full portfolio directory with self-contained category scroll
│   │   ├── Skills/                   # Complete technical tooling matrix
│   │   ├── Testimonials/             # 6 verified recommendations with tel links and quote cards
│   │   └── Contact/                  # Direct inquiry form and coordinates
│   ├── routes/
│   │   ├── index.tsx                 # Dynamic History-to-Hash Resilient Router
│   │   └── RouteErrorBoundary.tsx    # Branded route error boundary & recovery UI
│   └── utils/
│       ├── constants.ts              # Site configuration, nav items, and social links
│       ├── routing.ts                # Environment-aware routing basename & asset resolver
│       └── cn.ts                     # Tailwind class merge utility
├── package.json                      # Build scripts, React 19, Vite, Tailwind CSS v4
├── index.html                        # Root template with OpenGraph, Twitter, canonical, & SPA decode script
└── SESSION_SUMMARY.md                # Complete project work log and technical documentation
```

---

### C. Deployment Instructions for Static Hosting & GitHub Pages

1. **Deploying to GitHub Pages**:
   - The repository is configured to build into `dist/`.
   - Simply run `pnpm build` and deploy the contents of `dist/` to your `gh-pages` branch or configure GitHub Actions:
   ```bash
   pnpm build
   ```
   - The generated `dist/404.html` and `dist/*/index.html` handle all direct URL navigation without 404 errors.

2. **Deploying to Custom Domain (`https://santoshshrestha4.com.np`)**:
   - Point your DNS `CNAME` or `A` records to your static host (GitHub Pages, Netlify, Cloudflare Pages, Vercel, or VPS).
   - Ensure HTTPS is enforced; canonical tags and Open Graph metadata are already configured for `https://santoshshrestha4.com.np`.

---

## 15. Full Stack MERN/PERN Developer Resume — Source of Truth (`cv.html`)

### A. Layout & Strict 1-Page Constraints
- **Single-Column Architecture**: Zero sidebars, zero tables, clean linear reading flow optimized for 10-second recruiter scans and 100% ATS readability (Workday, Greenhouse, Lever, Taleo).
- **1-Page Print Fit (Calibrated at 9.5pt)**: Formatted with `@page { size: letter; margin: 0.28in 0.38in; }` and line-height `1.18` ensuring comfortable reading legibility at **9.5pt body** while strictly fitting 100% onto a single page with zero overflow.
- **Pure Black & White**: Zero colored accents, purely black/dark gray text (`#000000`, `#111111`) and crisp black rules, strictly adhering to clean engineering standards.
- **Embedded Self-Contained SVGs**: Replaced all emojis and external icon fonts with lightweight, monotone inline SVGs (location, phone, email, website, GitHub, LinkedIn, Linktree, project link) bundled directly within the single HTML file.
- **Linktree Integration**: Substituted Twitter/X profile with [linktr.ee/santoshshrestha](https://linktr.ee/santoshshrestha) featuring an embedded Linktree SVG icon.
- **Quantized Metric Ranges**: Calibrated metrics into explicit ranges for engineering authenticity:
  - *30–35% latency reduction* on PostgreSQL ledger queries
  - *35–40% fewer redundant API calls* via Zustand & TanStack Query caching
  - *300K–500K+ active records* managed in enterprise inventory ledgers
  - *30–35% query throughput improvement* and *15–20% API response time reduction*
  - *82–85% validation accuracy (0.75–0.76 AUC-ROC)* in credit risk modeling
  - *90–95% recognition accuracy* with *25–30% faster check-in query processing*

### B. Bullet Structure: Action + Technology + Outcome
- **Strong Engineering Verbs Only**: Built, Designed, Developed, Implemented, Architected, Optimized, Automated, Led (strictly purged "Responsible for", "Worked on", "Helped with").
- **MERN & PERN Core Highlights**:
  - **JYRA Soft (YBC ERP)**:
    - *Architected* ERP modules using React, Node.js, Express, and PostgreSQL supporting 8+ distinct user roles with granular Role-Based Access Control (RBAC).
    - *Optimized* PostgreSQL query execution plans and relational indexing, reducing transactional ledger read/write latency by 30–35%.
    - *Built* normalized client state pipelines with Zustand and TanStack Query, eliminating state synchronization bugs and cutting redundant API calls by 35–40%.
    - *Engineered* secure RESTful APIs implementing JWT token rotation, request validation, and error-handling middleware.
  - **Saurabh Group of IT**:
    - *Developed* industrial manufacturing logistics backend in PHP, Node.js, and MySQL managing 300K–500K+ active records across enterprise inventory ledgers.
    - *Optimized* database query throughput by 30–35% and reduced API endpoint response times by 15–20% through targeted index restructuring and execution plan profiling.
    - *Automated* dispatch and reconciliation reporting pipelines, containerizing production deployment workflows using Docker.
  - **काठ खबर मिडिया (Kath Media)**:
    - *Led* visual identity design, editorial typography, and high-frequency digital media assets under tight daily publication deadlines.

### C. Technical Skills & Projects
- **Grouped Skills**: Languages (`JavaScript, TypeScript, Python, SQL, HTML5, CSS3, PHP, Java, C, C#`), Frontend (`React, Redux Toolkit, TanStack Query, Zustand, Next.js, Tailwind CSS`), Backend (`Node.js, Express.js, RESTful API Design, JWT Authentication, RBAC, WebSockets`), Databases (`PostgreSQL, MongoDB, MySQL, Redis, Mongoose, Prisma, Schema Design & Index Tuning`), Tools & DevOps (`Git, GitHub, Docker, Postman, Linux, Vite, CI/CD, Vercel`).
- **Real Production Projects with Architecture & Scale**:
  - **FinGuard** (PERN Stack, FastAPI, XGBoost, Docker): Multi-tenant loan platform with credit risk model trained on 300,000+ records, 85.01% validation accuracy, 0.7630 AUC-ROC, real-time SHAP explainability.
  - **DataSphere** (PERN Stack, TypeScript): Ingestion into dynamic PostgreSQL schemas with natural language query filtering and dashboards handling 10,000+ data points.
  - **Face Authentication Attendance** (PHP, MySQL, FastAPI, OpenCV): Biometric verification with 95% accuracy and 30% faster check-in query performance.
  - **AI Lyric & Next-Word Generator** (PyTorch, LSTM, NLP, FastAPI): Sequence prediction with custom tokenization and low-latency API server.
- **Education & Credentials**: BCA at Saraswati Multiple Campus (TU, 2022–Present) + verified certifications in Full-Stack Web Development, Math for ML, Deep Learning with PyTorch, XGBoost, and SHAP.


---

## 16. Multi-Tier React Router Fallback Architecture

To ensure the portfolio functions reliably across all environments—including legacy browsers, sandboxed iframes, restricted webviews, offline or flaky networks, and static CDN hosting—a multi-layered defense was implemented:

### A. Dynamic History-to-Hash Safe Router (`src/routes/index.tsx`)
- **API Availability Check**: Validates whether `window.history` and `window.history.pushState` are supported and unblocked by the client environment.
- **Automatic Hash Router Fallback**: `createResilientRouter()` initializes `createBrowserRouter(routes)`. If an exception is thrown or history APIs are restricted, it gracefully falls back to `createHashRouter(routes)`.
- **Zero Configuration Drift**: Routes and child definitions are shared identically between browser and hash router configurations.

### B. Route-Level Error Boundary (`src/routes/RouteErrorBoundary.tsx`)
- **Componentized Recovery**: Exported cleanly in its own module to preserve Vite React Refresh rules.
- **Error Capture**: Attached via `errorElement: <RouteErrorBoundary />` at the root route `'/'`. Captures 404 route misses (`isRouteErrorResponse`), lazy-load chunk failures, and unhandled component exceptions.
- **Branded Recovery UI**: Displays an intuitive error card with:
  - Error status code / message details.
  - Action button: **Return Home** (`/`).
  - Action button: **Reload Page** (`window.location.reload()`).
  - Emergency escape hatch: Direct link to the standalone static **ATS CV** (`/cv.html`).

### C. Application Root ErrorBoundary (`src/components/ErrorBoundary/ErrorBoundary.tsx`)
- **Top-Level Protection**: In [`src/App.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/App.tsx), the `<RouterProvider>` itself is wrapped in `<ErrorBoundary>`.
- **Elimination of White Screens**: If React Router's internal state engine or context provider experiences a fatal initialization error, the root error boundary displays an emergency recovery banner rather than crashing to a blank white screen.

### D. Static Site Generation (SSG) Multi-Page Fallback (`scripts/post-build-seo.js`)
- **Direct HTTP 200 Pre-rendering**: Builds physical HTML files for every route during `pnpm build`:
  - `dist/index.html` (Home)
  - `dist/about/index.html` (About)
  - `dist/projects/index.html` (Projects)
  - `dist/skills/index.html` (Skills)
  - `dist/testimonials/index.html` (Testimonials)
  - `dist/contact/index.html` (Contact)
- **Web Server Independence**: Even on static hosts where URL rewriting is disabled or misconfigured, every route loads as a native HTTP 200 before client-side hydration begins.

### E. Resilient SPA Redirect Resolution (`public/404.html` & `index.html`)
- **SPA Query String Routing**: On platforms without native rewrite configurations (e.g., GitHub Pages), 404 requests are captured by `404.html` and forwarded as `/?/<path>`.
- **Safe History Restoration**: `index.html` parses the forwarded path and executes `window.history.replaceState`.
- **Hash Fallback on Exception**: If `replaceState` fails or is blocked (e.g. strict CSP or file-system protocol), the script falls back to hash navigation (`window.location.hash = '#' + decoded`).

### F. Completely Independent Static Assets
- Both [`public/cv.html`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/public/cv.html) and [`public/Santosh_Shrestha_CV.pdf`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/public/Santosh_Shrestha_CV.pdf) have no dependencies on React, JavaScript, or React Router, ensuring 100% availability at all times.

---

## 17. Orphan Code Cleanup: Dark Theme Elements Purged

To ensure the codebase remains lean, maintainable, and aligned with the intentional Forest Green & Warm Slate design system:
- **Purged Orphan Files**:
  - Deleted `src/hooks/useTheme.ts`
  - Deleted `src/store/useThemeStore.ts`
  - Deleted `src/components/ThemeToggle/ThemeToggle.tsx` and `src/components/ThemeToggle/index.ts`
- **Cleaned Barrel Exports & App Entry**:
  - Removed `useTheme` export from [`src/hooks/index.ts`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/hooks/index.ts).
  - Removed `useThemeStore` export from [`src/store/index.ts`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/store/index.ts).
  - Removed `ThemeToggle` export from [`src/components/index.ts`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/index.ts).
  - Removed `useTheme()` initialization and import from [`src/App.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/App.tsx).
  - Cleaned stray `dark:bg-slate-800` utility from [`src/components/Tooltip/Tooltip.tsx`](file:///c:/Users/shres/Desktop/reeng/rustam-shrestha/src/components/Tooltip/Tooltip.tsx).
- **Impact**:
  - Cleaned 100% of dead dark-mode code and references across the project.
  - Reduced production bundle size and eliminated 2 transformed JavaScript modules.
  - Zero lint warnings and zero TypeScript errors (`pnpm lint` and `pnpm build` verified).

---

## 18. Free Static Hosting (GitHub Pages, Netlify, Cloudflare, Vercel) Compatibility & SEO Architecture

To guarantee that the site functions flawlessly on free hosting platforms (such as GitHub Pages) without routing breaks, 404 errors, or broken asset paths, an automated, multi-tiered infrastructure was implemented:

### A. Subpath & Custom Domain Auto-Detection (`src/utils/routing.ts`)
- **Dynamic Basename**: `getRouterBasename()` inspects `window.location` at runtime.
  - On custom domains (`https://santoshshrestha4.com.np`), it defaults to `/`.
  - On GitHub Pages project sites (`https://<username>.github.io/<repo>/`), it automatically detects and returns `/<repo>` as the router `basename`.
  - On local preview or cloud hosts (Vercel, Netlify), it seamlessly routes from `/`.
- **Root-Safe Asset Resolution**: `getAssetUrl(path)` ensures that static downloads (like `/Santosh_Shrestha_CV.pdf` and `/images/profile.webp`) resolve correctly regardless of which deep subroute (e.g. `/about`, `/projects`) the user is visiting.

### B. Dual-Layer 404 Prevention
1. **Multi-Page Static Site Generation (SSG)**:
   - `scripts/post-build-seo.js` generates physical `dist/<route>/index.html` folders for all 6 public routes (`/`, `/about`, `/projects`, `/skills`, `/testimonials`, `/contact`).
   - Web servers return direct `200 OK` responses on page refresh or direct navigation without needing server-side URL rewrite modules.
2. **Dynamic SPA Redirect Fallback (`public/404.html`)**:
   - For unexpected dynamic subpaths, `public/404.html` detects GitHub Pages project sites vs. custom domains, converts the query to `repoPrefix + '/?/' + routePath`, and passes it to `index.html`.
   - `index.html` restores the browser history cleanly via `window.history.replaceState` (or falls back to hash navigation).

### C. GitHub Pages Jekyll Override (`public/.nojekyll`)
- Placed `.nojekyll` in `public/` so GitHub Pages serves all assets, underscores, and pre-compressed `.gz` and `.br` files completely untouched without running Jekyll.

### D. Comprehensive Search Engine Optimization (SEO)
- **Pre-rendered Crawler Content**: Each static route HTML file contains pre-rendered semantic HTML (`<h1>`, subheading, and summary) inside `#root` for search crawlers that do not execute JavaScript.
- **Dynamic Meta Tags**: Unique canonical `<link rel="canonical">`, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`), and Twitter Cards are injected into every pre-rendered HTML file.
- **Sitemap & Robots**: Generates `sitemap.xml` with all 6 canonical URLs and `robots.txt` pointing directly to the sitemap.

---

## 19. About Page Layout Refactoring: Full-Width Experience & Certifications

### A. Root Cause Analysis
- **Sidebar Containment Issue**: Previously, the entire content of the About page (`Bio`, `Academics`, `Work Experience Timeline`, and `Verified Certifications`) was confined inside an `lg:col-span-8` container alongside an `lg:col-span-4` profile sidebar.
- **Dead Whitespace**: Because the profile sidebar was only ~500px tall, the entire lower half of the screen on the right was left completely blank, while Work Experience and Certifications (which also had an artificial `lg:w-[80%] mx-auto` constraint) were cramped into half of the viewport.

### B. Structural Solution Implemented (`src/pages/About/index.tsx`)
- **Balanced Profile Header**: Kept Bio & Formal Academics in a balanced 2-column grid (`lg:col-span-8` and `lg:col-span-4` for the profile card), creating a clean, aligned header.
- **Full-Width Work Experience Timeline**: Separated into its own dedicated section with a top divider (`border-t border-[#E5E7EB]`), section tag (`CAREER PATHWAY //`), and full-width container (`w-full`), giving the timeline cards ample breathing room.
- **Full-Width 4-Column Certifications Grid**: Separated into its own dedicated section with section tag (`VERIFIED KNOWLEDGE //`), eliminating the `w-[80%]` constraint and rendering a responsive 4-column card grid (`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full`), fully utilizing screen width on desktop displays.

---

## 20. Comprehensive Verification & Project Health Status

| Check / Metric | Status | Details |
| :--- | :--- | :--- |
| **Linting (`pnpm lint`)** | **PASSED (0 Errors)** | ESLint verified across all components and routes with `react-refresh` compliance. |
| **Type Checking (`tsc -b`)** | **PASSED (0 Errors)** | TypeScript strict validation verified with zero type errors. |
| **Vite Bundle Build** | **1.36s Build Time** | HTML: `3.65 kB` (gzip: `1.35 kB`), CSS: `45.81 kB` (gzip: `9.12 kB`), JS: `460.47 kB` (gzip: `138.34 kB`). |
| **Static Pre-Rendering (SSG)** | **6 Routes Generated** | Physical `dist/<route>/index.html` created for `/`, `/about`, `/projects`, `/skills`, `/testimonials`, `/contact`. |
| **Asset Compression** | **14 Assets Pre-Compressed** | Pre-compressed with Gzip (**-70.9%**) and Brotli (**-75.3%**). |
| **Search Engine Optimization** | **Verified** | `sitemap.xml` with 6 canonical entries, `robots.txt`, and per-route OpenGraph/Twitter metadata. |
| **Free Hosting Ready** | **Verified** | `public/.nojekyll`, smart `404.html` SPA redirector, dynamic runtime `getRouterBasename()`, and `getAssetUrl()`. |
| **ATS CV Source of Truth** | **Verified** | Single-column, 9.5pt font, pure black & white, embedded SVGs, Linktree, explicit quantized metric ranges. |


