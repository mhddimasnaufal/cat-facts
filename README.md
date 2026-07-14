CAT FACTS APP
=========================

Aplikasi React JS untuk menampilkan fakta-fakta kucing dari Cat Facts API 
dengan fitur CRUD lokal, filter, pencarian, dan tampilan responsif 
menggunakan Bootstrap 5.


LIVE DEMO
=========
[https://catfacts-app.netlify.app](https://catfacts-app.netlify.app/)


API YANG DIGUNAKAN
==================
Cat Facts API - https://catfact.ninja/

Endpoint:
- GET /facts            : Mengambil 1 fakta kucing acak
- GET /facts?limit=10   : Mengambil 10 fakta kucing
- GET /fact             : Mengambil 1 fakta kucing acak (alternatif)

Struktur Response API:
{
  "current_page": 1,
  "data": [
    {
      "fact": "Kucing memiliki 32 otot di setiap telinganya.",
      "length": 42
    },
    {
      "fact": "Kucing tidur rata-rata 16 jam per hari.",
      "length": 38
    }
  ],
  "last_page": 34,
  "total": 332
}


FITUR UTAMA
===========

1. HOME PAGE
   - Menampilkan 10 fakta kucing dari Cat Facts API
   - Form tambah fakta buatan user sendiri
   - Edit fakta yang sudah ditambahkan user
   - Hapus fakta dari daftar lokal
   - Indikator visual: badge "Buatan Kamu" untuk fakta dari user
   - Tombol Refresh API untuk memuat ulang data

2. FILTER PAGE
   - Filter berdasarkan panjang karakter:
     * Pendek  : < 30 karakter
     * Sedang  : 30-60 karakter
     * Panjang : > 60 karakter
   - Pencarian kata kunci (case insensitive)
   - Kombinasi filter (misal: Pendek + keyword "kucing")
   - Statistik jumlah fakta per kategori

3. DETAIL PAGE
   - Menampilkan fakta lengkap
   - Menampilkan panjang karakter
   - Menampilkan kategori (pendek/sedang/panjang)
   - Menampilkan sumber (API atau Buatan Kamu)
   - Tombol kembali ke Home

4. CRUD LOKAL
   - Create : Form input dengan validasi
   - Read   : Fakta user ditampilkan di halaman Home bersama fakta API
   - Update : Edit fakta yang sudah ditambahkan
   - Delete : Hapus fakta dengan konfirmasi

5. VALIDASI FORM
   - Input tidak boleh kosong
   - Input minimal 5 karakter
   - Input maksimal 200 karakter
   - Pesan error ditampilkan dalam Alert Bootstrap
   - Penghitung karakter real-time

6. RESPONSIF
   - Menggunakan Bootstrap 5 Grid System
   - Tampilan optimal di mobile, tablet, dan desktop
   - Navbar dengan hamburger menu di layar kecil


STRUKTUR HALAMAN DAN ROUTING
=============================

Halaman  | Path            | Komponen         | Deskripsi
---------|-----------------|------------------|---------------------------
Home     | /               | HomePage.jsx     | Daftar fakta + form CRUD
Filter   | /filter         | FilterPage.jsx   | Filter panjang + pencarian
Detail   | /detail/:id     | DetailPage.jsx   | Detail satu fakta


STRUKTUR FOLDER PROYEK
======================

cat-facts-uas/
  public/
  src/
    components/
      FactCard.jsx          : Komponen kartu fakta
      FactForm.jsx          : Form tambah/edit fakta + validasi
      Navbar.jsx            : Navigasi responsif
    pages/
      HomePage.jsx          : Halaman utama + CRUD
      FilterPage.jsx        : Halaman filter & pencarian
      DetailPage.jsx        : Halaman detail fakta
    hooks/
      useCatFacts.js        : Custom hook untuk fetching API
    App.jsx                 : Routing utama
    App.css                 : Custom CSS
    main.jsx                : Entry point
  index.html
  package.json
  vite.config.js
  netlify.toml              : Konfigurasi deploy Netlify
  README.md


TEKNOLOGI YANG DIGUNAKAN
========================

Teknologi         | Versi      | Kegunaan
------------------|------------|------------------------
React             | 18.3.1     | Library UI
React DOM         | 18.3.1     | Render React ke DOM
Vite              | 5.3.4      | Build tool
React Router DOM  | 6.23.1     | Routing SPA
Axios             | 1.7.2      | HTTP client
Bootstrap         | 5.3.3      | Framework CSS responsif


CARA MENJALANKAN SECARA LOKAL
==============================

Prasyarat:
- Node.js versi 16 atau lebih baru
- npm versi 8 atau lebih baru

Langkah-langkah:

1. Clone repository
   git clone [https://github.com/MhdDimasNaufal/cat-facts.git](https://github.com/mhddimasnaufal/cat-facts.git)
   cd cat-facts

2. Install semua dependensi
   npm install

3. Jalankan development server
   npm run dev

4. Buka browser
   http://localhost:5173


BUILD UNTUK PRODUCTION
======================

npm run build

Hasil build akan berada di folder dist/. Folder inilah yang akan di-deploy.


DEPLOY KE NETLIFY VIA CLI
=========================

Prasyarat:
- Akun Netlify (daftar gratis di netlify.com)
- Node.js terinstall

Langkah-langkah:

1. Install Netlify CLI secara global
   npm install -g netlify-cli

2. Login ke akun Netlify
   netlify login

3. Inisialisasi proyek (dari root folder proyek)
   netlify init

   Akan muncul pertanyaan:
   - "What would you like to do?" -> Pilih "Create & configure a new site"
   - "Team" -> Pilih team kamu
   - "Site name (optional)" -> Isi nama situs, misal: cat-facts-uas-dimas
   - "Build command" -> npm run build
   - "Publish directory" -> dist

4. Deploy ke production
   netlify deploy --prod

   - "Publish directory" -> dist

Setelah deploy berhasil, Netlify akan memberikan URL live demo.


KONFIGURASI netlify.toml
========================

File netlify.toml di root proyek berisi:

[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

Bagian redirects memastikan React Router tetap berfungsi saat halaman 
di-refresh atau diakses langsung.


STATE MANAGEMENT
================

State         | Tipe Data | Lokasi            | Deskripsi
--------------|-----------|-------------------|--------------------------
apiFacts      | Array     | useCatFacts.js    | Data fakta dari API
localFacts    | Array     | HomePage.jsx      | Data fakta buatan user
loading       | Boolean   | useCatFacts.js    | Status loading API
error         | String    | useCatFacts.js    | Pesan error API
filterType    | String    | FilterPage.jsx    | Jenis filter aktif
searchTerm    | String    | FilterPage.jsx    | Kata kunci pencarian
editingFact   | Object    | HomePage.jsx      | Fakta yang sedang diedit


CATATAN
=======

- Fakta dari API tidak bisa diedit/dihapus (hanya fakta buatan user)
- Fakta buatan user disimpan di state lokal (useState), bukan di database
- Data akan hilang saat browser di-refresh
- API Cat Facts bersifat public, tidak memerlukan API key


IDENTITAS
=========

Nama           : Mhd Dimas Naufal
NIM            : 2405010018
Mata Kuliah    : Kerangka Kerja Pengembangan Antarmuka Website (KKPAW)
Tugas          : UAS Semester Genap
Program Studi  : Teknologi Rekayasa Perangkat Lunak
Universitas    : Politeknik Wilmar Bisnis Indonesia


LISENSI
=======

Proyek ini dibuat untuk keperluan akademik UAS KKPAW.

(C) 2026 - Mhd Dimas Naufal
