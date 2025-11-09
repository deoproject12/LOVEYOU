# Kisah Cinta Abdullah & Nayla

Website romantis yang menampilkan kenangan cinta Abdullah & Nayla, dengan dashboard admin, galeri, kisah perjalanan, dan sistem keamanan khusus agar tidak sembarang orang bisa masuk.

## Fitur Utama

- **Verifikasi Unik**: Pengunjung harus menjawab "Siapa cowo terganteng?" dengan jawaban "Abdullah"
- **Halaman Romantis**: Tampilan utama dengan kutipan cinta dan kenangan terpilih
- **Timeline "Kisah Kami"**: Menampilkan perjalanan cinta dalam bentuk timeline
- **Galeri Kenangan**: Koleksi foto dengan caption
- **Dashboard Admin**: Kelola konten website (memories, gallery, quotes)
- **API Terproteksi**: Semua endpoint admin dilindungi dengan JWT
- **Desain Romantis**: Warna pink/putih/gold lembut dengan animasi

## Teknologi yang Digunakan

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **UI Components**: shadcn/ui dengan Radix UI
- **Backend**: Next.js API Routes
- **Database**: Drizzle ORM + PostgreSQL
- **Authentication**: JWT untuk admin
- **Gambar**: Placeholder dari Unsplash

## Instalasi & Penggunaan

1. **Clone dan instal dependensi**:
   ```bash
   npm install
   ```

2. **Atur database** (pastikan Docker tersedia):
   ```bash
   npm run db:dev  # Menjalankan PostgreSQL via Docker
   npm run db:generate  # Membuat migrasi
   npm run db:push  # Menerapkan skema ke database
   ```

3. **Atur variabel lingkungan**:
   Buat file `.env` berdasarkan `.env.example` dan isi dengan konfigurasi database dan JWT secret

4. **Jalankan aplikasi**:
   ```bash
   npm run dev
   ```

5. **Akses aplikasi**:
   - Buka `http://localhost:3000`
   - Akan diarahkan ke halaman verifikasi
   - Masukkan "Abdullah" untuk melanjutkan

## Struktur Proyek

```
├── app/                    # Halaman utama Next.js
│   ├── api/               # API Routes
│   │   ├── admin/         # Endpoint admin (memories, gallery, quotes, etc.)
│   │   └── public/        # Endpoint publik
│   ├── dashboard/         # Halaman admin dashboard
│   ├── gallery/           # Halaman galeri
│   ├── timeline/          # Halaman timeline
│   ├── verify/            # Halaman verifikasi
│   └── ...                # Halaman lainnya
├── components/            # Komponen UI
├── db/                    # Schema dan konfigurasi database
│   └── schema/            # Definisi tabel
├── lib/                   # Fungsi utilitas
└── public/                # File statis
```

## API Endpoint

### Publik
- `GET /api/public/featured-content` - Ambil konten unggulan untuk homepage

### Admin (perlukan JWT token)
- `POST /api/admin/login` - Login admin
- `POST /api/admin/register` - Registrasi admin (hanya untuk setup awal)
- `GET /api/admin/memories` - Ambil semua kenangan
- `POST /api/admin/memories` - Tambah kenangan
- `GET /api/admin/memories/[id]` - Ambil kenangan spesifik
- `PUT /api/admin/memories/[id]` - Update kenangan
- `DELETE /api/admin/memories/[id]` - Hapus kenangan
- `GET /api/admin/gallery` - Ambil semua galeri
- `POST /api/admin/gallery` - Tambah galeri
- `GET /api/admin/gallery/[id]` - Ambil galeri spesifik
- `PUT /api/admin/gallery/[id]` - Update galeri
- `DELETE /api/admin/gallery/[id]` - Hapus galeri
- `GET /api/admin/quotes` - Ambil semua quotes
- `POST /api/admin/quotes` - Tambah quote
- `GET /api/admin/quotes/[id]` - Ambil quote spesifik
- `PUT /api/admin/quotes/[id]` - Update quote
- `DELETE /api/admin/quotes/[id]` - Hapus quote
- `POST /api/admin/ai/generate-caption` - Generate caption AI
- `GET /api/admin/visitors` - Ambil data pengunjung

## Desain Romantis

- Warna utama: Pink (#ec4899), Rose (#f43f5e), Putih, Emas muda
- Gradasi lembut untuk latar belakang
- Animasi halus dengan Framer Motion
- Elemen love seperti ikon hati dan bentuk organik
- Tipografi yang lembut dan mudah dibaca

## Konfigurasi Admin

Untuk pertama kali, Anda harus mendaftarkan admin menggunakan endpoint ini:

```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_secure_password",
    "name": "Admin Name"
  }'
```

## Kontribusi

Proyek ini dibuat sebagai hadiah romantis untuk Abdullah dan Nayla. Setiap kontribusi yang membuat pengalaman lebih indah dan bermakna akan sangat dihargai.

## Lisensi

Proyek ini dibuat untuk tujuan pribadi dan hadiah romantis. Silakan gunakan sebagai inspirasi untuk proyek serupa.