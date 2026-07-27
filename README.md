# 🚀 Portfolio Website - Mohammad Wahyu Sanusi Putra

Website Portofolio Interaktif **Front-End Developer** milik **Mohammad Wahyu Sanusi Putra (MWSP)**. Dibuat menggunakan **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, dan **Motion**, serta dilengkapi dengan fitur **Dark/Light Mode** dan dukungan **Dwi-Bahasa (Bahasa Indonesia & English)**.

Dapat dijalankan secara universal di **macOS (Big Sur s/d macOS Sequoia versi terbaru, Apple Silicon M1/M2/M3/M4 & Intel)**, **Windows**, serta **Linux**.

---

## 📋 Fitur Utama

- 🌗 **Dark Mode & Light Mode**: Switch tema terang/gelap dengan persistence `localStorage` dan sinkronisasi warna sistem.
- 🇮🇩 🇬🇧 **Dwi-Bahasa (ID / EN)**: Dukungan Bahasa Indonesia dan Bahasa Inggris secara penuh di seluruh bagian website.
- 📱 **Responsif & Modern**: Tampilan bersih, intuitif, dan responsif di smartphone, tablet, serta laptop/desktop.
- 💻 **Filter & Modal Portofolio**: Filter kategori proyek (React, Next.js, Interactive Apps) serta modal detail proyek.
- ⚡ **Animasi & Confetti FX**: Transisi halus berbasis `motion/react` dan kembang api `canvas-confetti` saat mengirim pesan.

---

## 💻 Panduan Langkah demi Langkah dari Awal (From Scratch)

Ikuti langkah-langkah di bawah ini dari membuat folder kosong hingga proyek dapat berjalan sempurna di laptop Anda (macOS / Windows / Linux).

---

### Langkah 1: Prasyarat Sistem (Prerequisites)

Pastikan software berikut sudah terpasang di perangkat Anda:

- **Node.js**: Versi `18.0.0` atau lebih baru (Rekomendasi: Node.js v20 LTS / v22+).
  - **Di macOS** (instal via Homebrew atau installer dari [nodejs.org](https://nodejs.org)):
    ```bash
    brew install node
    ```
  - Cek versi Node.js di Terminal / Command Prompt:
    ```bash
    node -v
    ```
- **npm** (otomatis terikut saat menginstal Node.js):
    ```bash
    npm -v
    ```

---

### Langkah 2: Membuat Folder Proyek Baru

Buka Terminal (di macOS/Linux) atau Command Prompt/PowerShell (di Windows), lalu buat folder proyek baru dan masuk ke dalamnya:

```bash
# 1. Buat folder proyek
mkdir portfolio-mwsp

# 2. Masuk ke dalam folder
cd portfolio-mwsp
```

---

### Langkah 3: Mengkloning atau Meng-inisialisasi Proyek

#### **Cara A: Mengkloning Repositori yang Sudah Ada (Direkomendasikan)**

Jika Anda memiliki kode repositori ini, cukup kloning langsung:

```bash
git clone https://github.com/mwahyusp/portfolio.git .
npm install
```

---

#### **Cara B: Membuat dari Nol (Inisialisasi Manual)**

Jika Anda ingin membuat dari folder kosong dari awal menggunakan Vite:

1. **Inisialisasi Vite React TypeScript:**
   ```bash
   npm create vite@latest . -- --template react-ts
   ```

2. **Instal Pustaka & Dependensi Utama:**
   ```bash
   npm install motion lucide-react canvas-confetti clsx tailwind-merge
   ```

3. **Instal Dependensi Pengembang (DevDependencies):**
   ```bash
   npm install -D tailwindcss @tailwindcss/vite @types/canvas-confetti @types/node
   ```

---

### Langkah 4: Konfigurasi Tailwind CSS v4 & Vite

1. **Buka file `vite.config.ts`**, sesuaikan menjadi:
   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     plugins: [react(), tailwindcss()],
     server: {
       port: 3000,
       host: '0.0.0.0',
     },
   });
   ```

2. **Buka file `src/index.css`**, ganti baris teratas dengan impor Tailwind v4:
   ```css
   @import "tailwindcss";

   @custom-variant dark (&:where(.dark, .dark *));

   @layer base {
     html {
       scroll-behavior: smooth;
     }
   }
   ```

---

### Langkah 5: Menyusun Berkas Kode Sumber (`src/`)

Pastikan struktur folder dan file di dalam `src/` tersusun sebagai berikut:

```text
portfolio-mwsp/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx      # Bilah navigasi, pengubah bahasa & tema
│   │   ├── Hero.tsx        # Area perkenalan & foto profil
│   │   ├── About.tsx       # Bio, rekam jejak pelatihan & statistik
│   │   ├── Skills.tsx      # Daftar keahlian & progress bar
│   │   ├── Portfolio.tsx   # Galeri proyek, filter & modal detail
│   │   ├── Contact.tsx     # Formulir kontak & salin email
│   │   ├── Footer.tsx      # Tautan navigasi & hak cipta
│   │   └── BackToTop.tsx   # Tombol kembali ke atas
│   ├── data/
│   │   └── portfolioData.ts # Terjemahan ID/EN & data portofolio
│   ├── types.ts            # Type definitions TypeScript
│   ├── App.tsx             # Komponen utama & pengatur state
│   ├── main.tsx            # Entry point React
│   └── index.css           # Styling Tailwind CSS v4
├── package.json
├── vite.config.ts
└── README.md
```

---

### Langkah 6: Jalankan Server Pengembang (Development Server)

Jalankan perintah berikut di Terminal:

```bash
npm run dev
```

Output Terminal akan menampilkan:

```text
  VITE v6.x.x  ready in 280 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

Buka peramban (Safari / Chrome / Firefox / Edge) lalu akses:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### Langkah 7: Kompilasi untuk Produksi (Production Build)

Untuk menghasilkan bundel produksi teroptimasi:

```bash
# 1. Jalankan pemeriksaan tipe & kompilasi produksi
npm run build

# 2. Pratinjau hasil build produksi secara lokal
npm run preview
```

Hasil kompilasi akan tersimpan otomatis di dalam folder `dist/`.

---

## 📜 Ringkasan Perintah NPM (NPM Scripts)

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembang lokal di port `3000`. |
| `npm run build` | Kompilasi bundel produksi ke folder `dist/`. |
| `npm run preview` | Menjalankan preview lokal dari folder `dist/`. |
| `npm run lint` | Memeriksa validasi tipe kode TypeScript (`tsc --noEmit`). |

---

## 🛠️ Troubleshooting macOS Big Sur (`dyld: Symbol not found: _SecTrustCopyCertificateChain`)

Jika Anda menemui error seperti ini saat menjalankan `npm install` atau `npm run dev` di macOS 11 Big Sur:
```text
dyld: Symbol not found: _SecTrustCopyCertificateChain
Referenced from: .../node_modules/esbuild/bin/esbuild (which was built for Mac OS X 12.0)
```

**Penyebab:** Biner native `esbuild` versi terbaru dikompilasi menggunakan SDK macOS 12 (Monterey). Fungsi `_SecTrustCopyCertificateChain` belum ada di macOS 11 (Big Sur).

**Solusi 1 (Rekomendasi - Menggunakan WASM / WebAssembly):**
1. Instal `esbuild-wasm`:
   ```bash
   npm install -D esbuild-wasm
   ```
2. Jalankan `npm install` dengan opsi `--ignore-scripts`:
   ```bash
   npm install react-icons --ignore-scripts
   ```

**Solusi 2 (Atur Overrides Versi esbuild di `package.json`):**
Tambahkan `overrides` di `package.json` Anda untuk menggunakan `esbuild@0.20.2` yang mendukung macOS 11:
```json
"overrides": {
  "esbuild": "0.20.2"
}
```
Kemudian hapus `node_modules` dan instal ulang:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 👨‍💻 Pengembang

**Mohammad Wahyu Sanusi Putra**  
*Front-End Developer — Jakarta, Indonesia*

- 🐙 **GitHub**: [mwahyusp](https://github.com/mwahyusp)
- 💼 **LinkedIn**: [mwahyusp](https://linkedin.com/in/mwahyusp)
- 📧 **Email**: [remoteworkwithwahyu@gmail.com](mailto:remoteworkwithwahyu@gmail.com)

---

## 📄 Lisensi

Hak Cipta &copy; 2026 **Mohammad Wahyu Sanusi Putra**. Semua Hak Dilindungi.
