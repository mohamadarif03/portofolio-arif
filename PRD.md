# PRD — Redesign Website Portofolio

## 1. Overview

**Nama Proyek:** Redesign Portofolio Personal
**Tipe:** Multi-page website
**Tujuan:** Merombak total tampilan & struktur portofolio agar lebih modern, menonjolkan identitas sebagai Web Developer & Data Enthusiast, serta menampilkan pencapaian kompetisi secara maksimal.

## 2. Target Audience

- Recruiter/HR yang melakukan quick-scan kandidat
- Klien freelance yang mencari jasa web development
- Sesama developer/komunitas tech untuk networking

## 3. Goals

- Menampilkan identitas profesional (Web Dev + Data Science) secara jelas
- Menonjolkan 10+ prestasi kompetisi sebagai social proof utama
- Memberikan detail proyek yang lengkap per proyek (bukan cuma preview)
- Tampilan modern dengan animasi halus, tidak berlebihan
- Mobile-friendly & performa loading cepat

## 4. Sitemap / Struktur Halaman

| # | Halaman | URL | Deskripsi Singkat |
|---|---------|-----|--------------------|
| 1 | Home | `/` | Landing page — ringkasan & highlight semua section |
| 2 | About | `/about` | Cerita, journey, skills detail |
| 3 | Projects | `/projects` | Grid semua proyek dengan filter kategori |
| 4 | Project Detail | `/projects/[slug]` | Template dinamis, 1 halaman per proyek |
| 5 | Achievements | `/achievements` | Daftar kompetisi yang dimenangkan + sertifikasi |
| 6 | Contact | `/contact` | Form kontak & social links |

**Total: 6 jenis halaman** (Project Detail bersifat template, jumlah route aktual mengikuti jumlah proyek)

---

## 5. Detail Konten per Halaman

### 5.1 Home (`/`)

| Section | Isi | Catatan Animasi |
|---|---|---|
| Hero | Foto/avatar, nama, headline, tagline 1-2 kalimat, 2 CTA button (Lihat Proyek / Hubungi Saya), social icons | Text reveal/typing effect, background gradient blob bergerak halus |
| Stats Bar | 4 angka mencolok: kompetisi dimenangkan, proyek selesai, sertifikasi, tahun pengalaman | Counter animation saat scroll masuk viewport |
| About Preview | 2-3 kalimat ringkas + tombol "Selengkapnya" ke `/about` | Fade-in on scroll |
| Skills Preview | Grid/row icon tech stack (React, Golang, Laravel, Python, SQL, dst) | Stagger fade-in / infinite marquee |
| Featured Projects | 2-3 card proyek terbaik: screenshot, judul, deskripsi singkat, tech badge, tombol detail | Hover zoom + overlay |
| Achievements Highlight | 3-4 card lomba paling bergengsi: nama, posisi, tahun + tombol "Lihat Semua" | Fade-in stagger |
| CTA Penutup | Headline ajakan kolaborasi + tombol besar ke Contact | — |
| Footer | Copyright, quick links, social icons | — |

### 5.2 About (`/about`)

- Foto/portrait
- Cerita latar belakang & journey (naratif, personal tapi profesional)
- Values / cara kerja
- Skills & tech stack lengkap (kategorikan: Frontend, Backend, Data Science, Tools)
- Fun facts (opsional)
- Tombol download CV (opsional)

### 5.3 Projects (`/projects`)

- Filter/tab kategori: All / Web Dev / Data Science
- Grid card proyek, tiap card:
  - Thumbnail/screenshot
  - Judul proyek
  - Deskripsi singkat (1 kalimat)
  - Badge tech stack yang dipakai
  - Tombol "Lihat Detail" → ke Project Detail
- Search bar (opsional, jika proyek sangat banyak)

### 5.4 Project Detail (`/projects/[slug]`)

Template yang dipakai berulang untuk tiap proyek, isi:
- Hero: judul proyek, screenshot/cover besar
- Ringkasan: problem yang diselesaikan
- Proses: pendekatan/tahapan pengerjaan
- Tech stack yang digunakan
- Peran kamu di proyek ini
- Hasil/impact (angka jika ada)
- Screenshot/gallery tambahan
- Link: Live Demo & Source Code (GitHub)
- Navigasi: Next/Previous project

### 5.5 Achievements (`/achievements`)

Dibagi 2 kategori (bisa tab atau section terpisah):

**A. Competitions**
- Nama lomba
- Penyelenggara
- Tahun
- Hasil/posisi (Juara 1, Finalis, dst)
- Kategori (Web Dev, Data Science, Hackathon, dll)
- Link ke proyek terkait (jika relevan, nyambung ke Project Detail)

**B. Certifications**
- Nama sertifikat
- Penerbit (Coursera, Dicoding, AWS, dll)
- Tahun
- Link verifikasi (jika ada)

### 5.6 Contact (`/contact`)

- Headline ajakan kolaborasi
- Form kontak (Nama, Email, Pesan)
- Alternatif kontak langsung: email, WhatsApp (opsional)
- Social links (GitHub, LinkedIn, Instagram, dll)

---

## 6. Design System

### 6.1 Warna
Pilih salah satu arah (rekomendasi: **Dark mode modern**):
- Background: `#0A0A0F` / `#0D1117`
- Accent: satu warna vibrant (electric blue `#3B82F6`, violet `#8B5CF6`, atau emerald `#10B981`)
- Text: `#E5E7EB` (putih pudar, bukan putih pekat)

Alternatif: Warm minimal (`#FAFAF9` + accent orange `#EA580C`) atau Gradient mesh.

**Aturan:** 1 warna dominan + 1 accent saja, hindari lebih dari itu.

### 6.2 Tipografi
- Font modern (sans-serif): Inter, Geist, atau Satoshi
- Hierarki jelas: heading besar & bold, body text nyaman dibaca

### 6.3 Animasi & Library
- **Framer Motion** — transisi & scroll-triggered animation
- **GSAP** — animasi kompleks/timeline (parallax)
- **Lenis** — smooth scroll
- **Three.js / React Three Fiber** — elemen 3D di hero (opsional)
- **Tailwind CSS** — styling utama
- **Aceternity UI / Magic UI** — komponen siap pakai dengan animasi

---

## 7. Non-Functional Requirements

- Responsive di semua ukuran layar (mobile-first)
- Loading cepat (lazy load gambar, optimasi asset)
- SEO-friendly (meta tag tiap halaman berbeda, semantic HTML)
- Aksesibilitas dasar (alt text, kontras warna cukup)

## 8. Out of Scope (untuk versi awal)

- Blog/Articles — akan ditambahkan di fase berikutnya jika dibutuhkan
- Multi-language support
- CMS/admin panel untuk update konten (kelola konten manual dulu via code)

## 9. Referensi

- Struktur navigasi mengacu pada portofolio developer sejenis (Web Dev + Data Science)