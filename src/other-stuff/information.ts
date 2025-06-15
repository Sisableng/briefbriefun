export const globalMenus = [
  {
    href: "/faq",
    label: "FAQ",
  },
  {
    href: "/how-to",
    label: "Bingung?",
  },
  {
    href: "/example",
    label: "Contoh",
  },
];

export const faq = `
## ❓ FAQ — Pertanyaan yang Sering Ditanyakan

### Apa itu BriefBriefun?

**BriefBriefun** adalah web app yang menghasilkan brief proyek palsu dari klien fiktif menggunakan AI. Cocok untuk kamu yang ingin latihan, eksplor ide, atau ngisi portofolio tanpa harus nunggu klien beneran.

---

### Siapa yang cocok pakai BriefBriefun?

Desainer, developer, copywriter, illustrator, mahasiswa kreatif, freelancer, atau siapa pun yang pengen ngasah skill sambil have fun.

---

### Apakah brief-nya beneran dari klien?

Nggak. Semua brief dihasilkan oleh AI berdasarkan parameter yang kamu pilih. Tapi hasilnya dibuat seolah-olah dari klien sungguhan—kadang absurd, kadang menantang, kadang dua-duanya.

---

### Apakah BriefBriefun gratis?

Yap, 100% gratis untuk saat ini. Cuma butuh login biar kamu bisa simpan dan kelola project kamu.

---

### Apa saya bisa request tipe project tertentu?

Bisa banget! Di halaman *Create Brief*, kamu bisa pilih tipe project, industri, dan gaya komunikasi (vibe) yang kamu mau. AI akan menyesuaikan hasilnya berdasarkan pilihanmu.

---

### Bisa dipakai buat ngisi portofolio?

Tentu! Selama kamu menyatakan bahwa proyeknya fiktif dan dibuat untuk latihan, hasilnya sah-sah aja dipakai sebagai showcase skill kamu.

---

### Apakah saya bisa menghapus brief yang sudah dibuat?

Bisa. Di halaman dashboard, klik tombol hapus di project yang ingin kamu buang. Tapi hati-hati ya, sekali hapus, nggak bisa dibalikin.

---

### Kenapa saya nggak bisa bikin brief lagi?

Kemungkinan besar kamu sudah mencapai batas penggunaan sementara (rate limit) setiap harinya dibatasi 5x ya. Coba lagi besok. Klien fiktif juga butuh rehat 😴
`;

export const howTo = `
## 🚀 Cara Menggunakan BriefBriefun

Mau bikin brief dari klien fiktif? Gampang banget! Ikuti langkah-langkah di bawah ini:

---

### 1. Login dulu, bos!

Untuk mulai bikin brief, kamu perlu login dulu. Tenang aja, gratis kok.
Setelah login, kamu akan diarahkan ke dashboard kamu sendiri.

---

### 2. Klik tombol **"Tambah Brief"**

Cari tombol **"Tambah Brief"** di dashboard kamu, atau langsung masuk ke halaman: **/me/create-brief**

(*Catatan: halaman ini hanya bisa diakses kalau kamu sudah login*)

---

### 3. Pilih tipe, industri, dan vibe

Kamu bisa atur sendiri:

* **Tipe Project** → Misalnya: Desain Logo, Website, Copywriting, dll
* **Industri** → Misalnya: Fashion, Teknologi, Makanan & Minuman
* **Vibe** → Gaya komunikasi klien, dari yang fun sampe super profesional

---

### 4. Klik **"Generate"**

Setelah pilih semuanya, klik tombol **Generate Brief** dan... *voilà!*
Brief dari klien gaib langsung muncul ✨

---

### 5. Simpan atau Kerjain

Setelah brief muncul, kamu bisa pilih:

* **Kerjain Sekarang** → Menandai project sebagai "aktif dikerjakan"
* **Simpan ke Draft** → Kalau kamu mau balik lagi nanti

---

### Bonus

Brief-nya bisa kamu baca ulang, edit statusnya, atau bahkan hapus kalau udah gak relevan.

---

Kalau kamu butuh bantuan atau nemu bug, kamu bisa kirim DM ke klien fiktif terdekat (atau hubungi kami beneran 👀).

`;

export const example = `
## 🧾 Contoh Brief dari Klien Fiktif

Kamu bisa lihat seperti apa hasil brief yang dibuat oleh AI BriefBriefun. Setiap brief punya gaya bahasa, kebutuhan, dan tantangan yang berbeda tergantung tipe, industri, dan vibe yang dipilih.

---

### ✨ Contoh Brief

\`\`\`markdown
## Nama Perusahaan  
MiauTech

## Deskripsi Perusahaan  
Kami adalah startup teknologi yang membuat wearable device untuk hewan peliharaan, terutama kucing. Produk kami membantu pemilik melacak aktivitas, tidur, dan mood kucing mereka secara real-time. Target kami adalah millennial cat parents yang tech-savvy. Kami ingin terlihat fun, smart, dan sedikit quirky.

## Deskripsi Pekerjaan  
Kami ingin membuat landing page yang menjelaskan produk baru kami — kalung pintar untuk kucing bernama *MeowSync*. Halaman ini akan menjadi pusat informasi, sekaligus tempat pre-order. Kami ingin desainnya playful tapi tetap profesional, dengan warna utama ungu dan mint. Ada animasi kecil juga boleh.

## Spesifikasi Teknis  
- Desain mobile-first  
- Gunakan font sans-serif modern  
- Sertakan section: Hero, Fitur, Testimoni, CTA, dan FAQ  
- Integrasi tombol pre-order (dummy)

## Batas Waktu  
5 hari dari sekarang

## Vibe  
fun
\`\`\`

---

### 🎯 Tips
- Kamu bisa regenerate brief sebanyak yang kamu mau  
- Gunakan brief ini buat latihan desain, nulis, coding, atau sekadar ide kreatif  
- Simpan hasilmu sebagai "draft" atau tandai sebagai "sedang dikerjakan"
`;
