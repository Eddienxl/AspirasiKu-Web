export const dummyCategories = [
  { id: 1, nama: "Akademik" },
  { id: 2, nama: "Fasilitas" },
  { id: 3, nama: "Kegiatan" },
];

export const dummyPosts = [
  {
    id: 1,
    judul: "Perbaikan Jadwal Kuliah",
    konten: "Jadwal kuliah sering bentrok, tolong diperbaiki agar lebih teratur.",
    id_kategori: 1,
    id_penulis: "user1",
    anonim: false,
    tipe: "aspirasi",
    status: "aktif",
    dibuat_pada: "2025-05-18T10:00:00Z",
  },
  {
    id: 2,
    judul: "Tambah Jam Operasional Perpustakaan",
    konten: "Perpustakaan tutup terlalu cepat, bisa diperpanjang jam operasionalnya?",
    id_kategori: 2,
    id_penulis: "user2",
    anonim: true,
    tipe: "pertanyaan",
    status: "aktif",
    dibuat_pada: "2025-05-17T15:30:00Z",
  },
];

export const dummyComments = [
  {
    id: 1,
    id_postingan: 1,
    id_penulis: "user2",
    konten: "Saya setuju, ini sering jadi masalah tiap semester.",
    anonim: false,
    dibuat_pada: "2025-05-18T11:00:00Z",
  },
];

export const dummyUsers = {
  "user1": { nim: "123456", nama: "Adi", email: "adi@uin.ac.id", peran: "pengguna" },
  "user2": { nim: "654321", nama: "Budi", email: "budi@uin.ac.id", peran: "pengguna" },
  "admin": { nim: "111111", nama: "Admin", email: "admin@uin.ac.id", peran: "pengelola" },
};

export const dummyInteractions = [
  { id: 1, id_postingan: 1, tipe: "suka", id_pengguna: "user2" },
  { id: 2, id_postingan: 1, tipe: "lapor", id_pengguna: "user1" },
];

export const dummyNotifications = [
  {
    id: 1,
    id_pengguna: "user1",
    tipe: "komentar",
    id_postingan: 1,
    pesan: "Komentar baru pada postingan Anda: 'Perbaikan Jadwal Kuliah'",
    dibuat_pada: "2025-05-18T11:00:00Z",
  },
];