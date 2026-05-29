# 📋 PRD — Portfolio Website
> **Frontend / Full-stack Developer** · Bold & Brutalist · Astro + GSAP

---

## 1. Overview

| Field | Detail |
|---|---|
| **Project Name** | Personal Portfolio Website |
| **Owner** | Frontend / Full-stack Developer |
| **Tech Stack** | Astro, Tailwind CSS, GSAP, Lenis |
| **Deployment Target** | Vercel |
| **Status** | Planning |

### Tujuan Produk

Membangun sebuah web portfolio personal yang berfungsi sebagai **showcase profesional** bagi seorang Frontend / Full-stack Developer. Website dirancang dengan estetika **Bold & Brutalist** — raw, kontras tinggi, tipografi dominan — untuk menciptakan kesan yang kuat, berbeda, dan tak terlupakan bagi rekruter, klien, dan komunitas developer.

---

## 2. Target Pengguna

| Segmen | Kebutuhan |
|---|---|
| **Rekruter / HRD** | Melihat skill, pengalaman, dan cara menghubungi |
| **Klien Potensial** | Melihat portofolio proyek dan kualitas kerja |
| **Sesama Developer** | Eksplorasi teknik & stack yang digunakan |

---

## 3. Ruang Lingkup

### 3.1 In Scope

- Landing / Hero section dengan animasi GSAP
- About section
- Projects / Portfolio section
- Contact form dengan integrasi email
- Custom cursor animasi
- Smooth scrolling dengan Lenis
- Responsive design (mobile & desktop)
- Animasi scroll-triggered (GSAP ScrollTrigger)

### 3.2 Out of Scope (versi ini)

- Blog / artikel
- Filter kategori proyek
- Dashboard admin / CMS
- Autentikasi pengguna
- Internasionalisasi (i18n)

---

## 4. Tech Stack

```
Astro 4.x          → Framework utama (SSG)
Tailwind CSS 3.x   → Utility-first styling
GSAP 3.x           → Animasi & timeline
  └─ ScrollTrigger → Animasi berbasis scroll
  └─ TextPlugin    → Animasi teks
Lenis              → Smooth scroll
TypeScript         → Type safety
Vercel             → Deployment & hosting
```

---

## 5. Struktur Halaman

```
/                  → Home (Hero + About + Projects + Contact)
/projects/[slug]   → Detail halaman proyek (opsional)
```

### 5.1 Arsitektur Komponen

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Projects.astro
│   │   └── Contact.astro
│   └── ui/
│       ├── CustomCursor.astro
│       ├── ProjectCard.astro
│       └── Button.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   └── projects/
│       └── [slug].astro
├── styles/
│   └── global.css
└── scripts/
    ├── gsap-init.ts
    ├── cursor.ts
    └── lenis-init.ts
```

---

## 6. Fitur & Requirements

### 6.1 F-001 · Hero Section

**Priority:** P0 — Must Have

**Deskripsi:** Section pertama yang dilihat pengunjung. Harus langsung menciptakan kesan kuat dengan nama, tagline, dan animasi masuk yang dramatis.

**Requirements:**
- Menampilkan nama, role, dan tagline
- Animasi entrance GSAP saat halaman pertama dimuat (staggered text reveal)
- Teks besar, dominan, dan bold — karakter brutalist
- CTA button menuju Projects dan Contact section
- Background kontras tinggi (hitam/putih atau warna aksidental tunggal)

**Animasi GSAP:**
```typescript
// Contoh implementasi
gsap.from(".hero-title", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  stagger: 0.1,
});
```

---

### 6.2 F-002 · About Section

**Priority:** P1 — Should Have

**Deskripsi:** Pengenalan singkat tentang diri, skill, dan nilai yang ditawarkan.

**Requirements:**
- Foto atau ilustrasi diri (opsional)
- Bio singkat (2–3 paragraf)
- Daftar tech stack / skill utama
- Animasi reveal saat masuk viewport (ScrollTrigger)

---

### 6.3 F-003 · Projects Section

**Priority:** P0 — Must Have

**Deskripsi:** Showcase proyek-proyek terbaik dalam format card grid.

**Requirements:**
- Minimal 3–6 project card
- Setiap card menampilkan: nama proyek, deskripsi singkat, tech stack yang digunakan, link demo & repository
- Hover effect yang kuat dan berkarakter
- Animasi stagger saat card muncul di viewport

**Data Struktur Proyek:**
```typescript
interface Project {
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  year: number;
}
```

---

### 6.4 F-004 · Contact Form

**Priority:** P0 — Must Have

**Deskripsi:** Form sederhana untuk pengunjung mengirim pesan langsung dari website.

**Requirements:**
- Field: Nama, Email, Pesan
- Validasi input sisi client (format email, field tidak kosong)
- Submit menggunakan Astro API Route atau form service (Resend / Formspree)
- Feedback sukses / error yang jelas untuk pengguna
- Animasi form field saat fokus

**Integrasi yang direkomendasikan:**
```
Resend (resend.com)  → Email delivery via API, gratis hingga 3.000 email/bulan
Formspree            → Alternatif tanpa backend, plug-and-play
```

**Astro API Route (jika pakai Resend):**
```
src/pages/api/contact.ts
```

---

### 6.5 F-005 · Custom Cursor

**Priority:** P1 — Should Have

**Deskripsi:** Cursor kustom yang menggantikan cursor default browser, bergerak smooth dan bereaksi terhadap elemen interaktif.

**Requirements:**
- Cursor dot kecil yang mengikuti posisi mouse dengan lag ringan (lerp)
- State hover: cursor membesar / berubah bentuk saat di atas link dan button
- Bersembunyi saat mouse keluar dari viewport
- Tidak aktif di perangkat touch (mobile)
- Diimplementasikan dengan GSAP quickTo untuk performa optimal

**Implementasi:**
```typescript
// src/scripts/cursor.ts
const cursor = document.querySelector(".cursor");
const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```

---

### 6.6 F-006 · Smooth Scroll (Lenis)

**Priority:** P1 — Should Have

**Deskripsi:** Smooth scrolling untuk pengalaman navigasi yang premium dan seamless dengan animasi GSAP ScrollTrigger.

**Requirements:**
- Lenis terintegrasi dengan GSAP ticker
- Navigasi anchor link (klik menu → scroll ke section)
- Scroll progress indicator (opsional)

**Integrasi:**
```typescript
// src/scripts/lenis-init.ts
import Lenis from "lenis";
import { gsap } from "gsap";

const lenis = new Lenis();

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

---

## 7. Design System

### 7.1 Estetika: Bold & Brutalist

Desain mengutamakan raw energy, kejujuran visual, dan kontras tinggi. Tidak ada dekorasi yang tidak perlu — setiap elemen ada karena fungsinya.

### 7.2 Color Palette

| Token | Value | Penggunaan |
|---|---|---|
| `--color-bg` | `#0A0A0A` | Background utama |
| `--color-surface` | `#111111` | Card, section alt |
| `--color-primary` | `#FFFFFF` | Teks utama |
| `--color-secondary` | `#888888` | Teks sekunder |
| `--color-accent` | `#FF3B00` | CTA, highlight, border aksidental |
| `--color-border` | `#222222` | Border elemen |

### 7.3 Typography

```css
/* Display / Hero */
font-family: 'Space Grotesk', sans-serif;  /* atau Bebas Neue untuk heading besar */
font-weight: 700–900;
font-size: clamp(3rem, 10vw, 9rem);

/* Body */
font-family: 'IBM Plex Mono', monospace;   /* monospace untuk karakter teknis */
font-size: 1rem;
line-height: 1.7;
```

### 7.4 Spacing & Layout

```css
/* Grid */
--grid-cols: 12;
--grid-gap: 1.5rem;

/* Container */
--container-max: 1440px;
--container-padding: clamp(1rem, 5vw, 4rem);

/* Spacing scale */
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 2rem;
--space-lg: 4rem;
--space-xl: 8rem;
```

---

## 8. Animasi & Interaksi

### 8.1 Prinsip Animasi

| Prinsip | Penerapan |
|---|---|
| **Purposeful** | Animasi hanya jika menambah makna atau kejelasan |
| **Snappy** | Durasi pendek: 0.4s–0.8s. Tidak ada animasi bertele-tele |
| **Easing** | `power4.out` untuk entrance, `power2.inOut` untuk transisi |
| **Performance** | Hanya animasi `transform` dan `opacity` (GPU-accelerated) |

### 8.2 Animasi yang Direncanakan

| Elemen | Tipe Animasi | Trigger |
|---|---|---|
| Hero title | Staggered slide up | Page load |
| Nav links | Fade in | Page load |
| Section headings | Clip reveal | ScrollTrigger |
| Project cards | Stagger fade up | ScrollTrigger |
| About text | Line reveal | ScrollTrigger |
| Custom cursor | Lerp follow | Mouse move |
| Button hover | Scale + color shift | Hover |
| Contact form | Field slide in | ScrollTrigger |

---

## 9. Performa & SEO

### 9.1 Target Performa

| Metrik | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FID / INP | < 200ms |

### 9.2 Strategi Optimasi

- Astro SSG: semua halaman di-generate statis, zero JS by default
- GSAP hanya diload di client dengan `client:load` atau `client:idle`
- Font self-hosted atau subset via `font-display: swap`
- Gambar menggunakan format WebP dengan `<Image />` bawaan Astro
- Lazy load untuk gambar proyek di bawah fold

### 9.3 SEO

- Meta title & description per halaman
- Open Graph tags untuk social sharing
- Structured data (JSON-LD) untuk personal profile
- `sitemap.xml` via `@astrojs/sitemap`
- `robots.txt`

---

## 10. Responsivitas

| Breakpoint | Lebar | Perilaku |
|---|---|---|
| Mobile | < 768px | Single column, navigasi hamburger, cursor dinonaktifkan |
| Tablet | 768px – 1024px | 2 kolom untuk project grid |
| Desktop | > 1024px | Layout penuh, cursor aktif |

---

## 11. Aksesibilitas

- Semantic HTML (`<main>`, `<section>`, `<nav>`, `<article>`)
- Alt text untuk semua gambar
- Fokus keyboard yang terlihat jelas
- Kontras warna memenuhi WCAG AA (ratio ≥ 4.5:1 untuk body text)
- `prefers-reduced-motion` — animasi dimatikan jika user mengaktifkan setting ini

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 12. Milestones

| Fase | Durasi | Deliverable |
|---|---|---|
| **Fase 1 – Setup** | 1–2 hari | Init Astro project, Tailwind, GSAP, Lenis, struktur folder |
| **Fase 2 – Desain** | 2–3 hari | Design system, komponen dasar, layout halaman |
| **Fase 3 – Sections** | 3–5 hari | Hero, About, Projects, Contact selesai |
| **Fase 4 – Animasi** | 2–3 hari | GSAP animations, custom cursor, scroll triggers |
| **Fase 5 – Polish** | 1–2 hari | Responsivitas, aksesibilitas, performa |
| **Fase 6 – Deploy** | 1 hari | Deploy ke Vercel, domain custom, final QA |

**Total Estimasi: ~2 minggu**

---

## 13. Risiko & Mitigasi

| Risiko | Probabilitas | Mitigasi |
|---|---|---|
| GSAP konflik dengan Astro SSR | Sedang | Gunakan `client:only` atau cek `typeof window !== 'undefined'` sebelum init |
| Animasi berat menyebabkan jank | Sedang | Profiling di Chrome DevTools, batasi animasi simultaneous |
| Contact form tidak terkirim | Rendah | Test di staging, fallback ke mailto link |
| Custom cursor tidak muncul di mobile | Pasti terjadi | Deteksi touch device dan nonaktifkan cursor JS |
| Skor Lighthouse rendah karena GSAP | Rendah | Defer load GSAP, minify, gunakan CDN atau tree-shake |

---

## 14. Dependencies

```json
{
  "dependencies": {
    "astro": "^4.x",
    "@astrojs/tailwind": "^5.x",
    "@astrojs/sitemap": "^3.x",
    "gsap": "^3.x",
    "lenis": "^1.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "typescript": "^5.x"
  }
}
```

---

## 15. Referensi & Inspirasi

- [GSAP Docs](https://gsap.com/docs/)
- [Astro Docs](https://docs.astro.build/)
- [Lenis Docs](https://lenis.darkroom.engineering/)
- [Awwwards Brutalist Sites](https://www.awwwards.com/websites/brutalism/)
- [Resend Docs](https://resend.com/docs)

---

*Dokumen ini bersifat living document dan akan diperbarui seiring perkembangan project.*
