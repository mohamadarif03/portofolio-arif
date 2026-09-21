# Design System — Website Portofolio

## 1. Prinsip Desain

- **Solid color, no gradient** — semua warna dipakai flat/solid, tidak ada gradient background, gradient text, atau gradient button
- **No purple/violet** — accent color dijauhkan dari spektrum ungu
- Minimalis: 1 warna dominan + 1 accent, hindari warna berlebihan
- Animasi halus & fungsional, bukan sekadar dekorasi berlebihan

---

## 2. Color Palette

### Opsi A — Dark Mode (Rekomendasi utama)

| Token | Hex | Penggunaan |
|---|---|---|
| `--bg-primary` | `#0B0F14` | Background utama |
| `--bg-secondary` | `#12171F` | Background card/section alternatif |
| `--text-primary` | `#E7EAEE` | Teks utama |
| `--text-secondary` | `#9AA4B2` | Teks sekunder/deskripsi |
| `--accent` | `#2563EB` (biru) | Tombol, link, highlight |
| `--accent-hover` | `#1D4ED8` | Hover state |
| `--border` | `#1F2733` | Garis pembatas, card border |
| `--success` | `#16A34A` | Indikator positif (misal badge "selesai") |

*Alternatif accent kalau nggak mau biru: emerald `#10B981` atau amber `#F59E0B` — tetap solid, tanpa campuran gradient.*

### Opsi B — Light Mode (kalau berubah pikiran ke arah terang)

| Token | Hex | Penggunaan |
|---|---|---|
| `--bg-primary` | `#FAFAFA` | Background utama |
| `--bg-secondary` | `#F0F1F3` | Background card |
| `--text-primary` | `#111318` | Teks utama |
| `--text-secondary` | `#5B6270` | Teks sekunder |
| `--accent` | `#2563EB` | Tombol, link, highlight |
| `--accent-hover` | `#1D4ED8` | Hover state |
| `--border` | `#E2E4E9` | Garis pembatas |

**Catatan:** Pilih salah satu mode sebagai default. Bisa ditambahkan toggle dark/light nanti sebagai fitur tambahan, bukan prioritas awal.

---

## 3. Tipografi

**Referensi gaya:** grotesque sans-serif, bold & tracking rapat untuk heading (terinspirasi dari referensi visual scrolltide.co/ui). Rekomendasi font gratis dengan karakter serupa:

- **Pilihan utama:** [General Sans](https://www.fontshare.com/fonts/general-sans) (Fontshare, gratis, lisensi komersial oke)
- **Alternatif:** [Switzer](https://www.fontshare.com/fonts/switzer) atau **Inter Tight** (jika ingin tetap dalam keluarga Inter tapi tracking lebih rapat)

> Catatan: identifikasi font dari screenshot tidak 100% presisi. Kalau nanti sempat cek langsung lewat DevTools (Inspect → Computed → font-family) di situs referensinya, ganti nilai di bawah dengan nama font yang sebenarnya dipakai.

| Elemen | Font | Ukuran (desktop) | Weight | Letter-spacing |
|---|---|---|---|---|
| Heading 1 (Hero) | General Sans | 56-64px | 700 (Bold) | -0.02em (rapat) |
| Heading 2 (Section title) | General Sans | 32-40px | 700 (Bold) | -0.02em |
| Heading 3 (Card title) | General Sans | 20-24px | 600 (Semibold) | -0.01em |
| Body text | General Sans / Inter | 16-18px | 400 (Regular) | normal |
| Small/caption (mis. label "UI") | General Sans | 12-13px | 500 (Medium), uppercase, tracked out | +0.08em (lebar) |

- Font fallback: `"General Sans", Inter, system-ui, sans-serif`
- Line-height body: 1.6 — 1.7 untuk keterbacaan
- Line-height heading: 1.05 — 1.15 (rapat, sesuai referensi)
- Cara pasang: import dari Fontshare (`@import` CSS atau self-host `.woff2`) — lebih ringan daripada Google Fonts untuk sebagian kasus

---

## 4. Spacing & Layout

- Base unit: `8px` (semua spacing kelipatan 8: 8, 16, 24, 32, 48, 64, 96)
- Max content width: `1200px`, centered dengan padding horizontal `24px` (mobile) / `48px` (desktop)
- Section vertical padding: `80-120px` (desktop), `48-64px` (mobile)
- Grid gap (card grid): `24-32px`

---

## 5. Komponen

### Button
- **Primary:** background solid `--accent`, teks putih, border-radius `8px`, padding `12px 24px`
- **Secondary/Outline:** border `1px solid --accent`, teks `--accent`, background transparan
- Hover: transisi warna `0.2s ease`, tidak ada efek gradient shimmer

### Card (Project/Achievement)
- Background `--bg-secondary`
- Border `1px solid --border`
- Border-radius `12px`
- Padding `24px`
- Hover: elevasi ringan (box-shadow halus) + border berubah ke `--accent`, tanpa scale berlebihan

### Badge (Tech stack/kategori)
- Background `--bg-secondary` dengan border `1px solid --border`
- Border-radius `999px` (pill shape)
- Padding `4px 12px`
- Font size `13px`

---

## 6. Animasi

Prinsip: halus, singkat, tidak mengganggu. Durasi umum `0.3-0.6s`, easing `ease-out`.

| Elemen | Jenis Animasi |
|---|---|
| Hero heading | Fade-in + slight slide-up saat load |
| Section saat scroll | Fade-in + slide-up 20px, trigger sekali (`viewport once`) |
| Stats counter | Number count-up saat masuk viewport |
| Card project/achievement | Fade-in stagger antar card |
| Hover card | Elevasi ringan (shadow) + border accent, transisi `0.2s` |
| Button hover | Perubahan warna background, transisi `0.2s` |
| Navigasi antar halaman | Fade transition sederhana (tanpa efek berat) |

**Library yang disarankan:**
- Framer Motion — untuk semua animasi di atas
- Lenis — smooth scroll (opsional, kalau mau kesan lebih "premium")

**Dihindari:**
- Gradient animasi (gradient shift, animated blob gradient)
- Efek 3D berat tanpa tujuan jelas
- Parallax berlebihan yang mengganggu keterbacaan

---

## 7. Iconography

- Gunakan icon set konsisten: **Lucide Icons** atau **Phosphor Icons**
- Style: outline/stroke, bukan filled, agar selaras dengan estetika minimal
- Ukuran standar: `20-24px` untuk icon inline, `32-40px` untuk icon dekoratif

---

## 8. Dark Mode Consideration

Karena rekomendasi utama sudah dark mode, pastikan:
- Kontras teks vs background memenuhi standar aksesibilitas (rasio minimal 4.5:1 untuk body text)
- Accent color (`#2563EB` biru) diuji agar tetap terlihat jelas di atas `--bg-primary` gelap

---

## 9. Referensi Implementasi

- Tailwind CSS untuk utility styling, definisikan token warna di atas sebagai CSS variables/theme config
- Konsisten pakai token warna (jangan hardcode hex di banyak tempat) agar mudah diubah kalau mau ganti accent color nanti