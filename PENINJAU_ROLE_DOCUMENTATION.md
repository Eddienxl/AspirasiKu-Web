# 📋 Dokumentasi Role Peninjau (Reviewer) - AspirasiKu

## 🎯 **Gambaran Umum**

Role **Peninjau** adalah role administratif dalam sistem AspirasiKu yang memberikan akses khusus untuk mengelola konten dan moderasi platform. Peninjau memiliki kemampuan lebih luas dibandingkan pengguna biasa untuk memastikan kualitas dan keamanan platform.

---

## 👥 **Perbedaan Role Pengguna vs Peninjau**

### **👤 Pengguna Biasa (pengguna)**
- ✅ Membuat postingan aspirasi/pertanyaan
- ✅ Memberikan komentar pada postingan
- ✅ Melakukan upvote/downvote
- ✅ Melaporkan konten yang tidak pantas
- ✅ Mengelola profil pribadi
- ✅ Melihat notifikasi
- ❌ Tidak dapat mengakses admin panel
- ❌ Tidak dapat mengelola konten pengguna lain

### **👨‍💼 Peninjau (peninjau)**
- ✅ **Semua kemampuan pengguna biasa**
- ✅ **Akses Admin Panel** untuk moderasi
- ✅ **Mengelola Laporan** dari pengguna
- ✅ **Moderasi Postingan** (arsip/aktifkan)
- ✅ **Moderasi Komentar** (hapus yang tidak pantas)
- ✅ **Melihat Statistik** platform
- ✅ **Mengelola Kategori** postingan

---

## 🔐 **Cara Mendapatkan Akses Peninjau**

### **Registrasi Akun Peninjau:**
1. **Buka halaman registrasi**: `/register`
2. **Isi data lengkap**: NIM, Username, Email, Password
3. **Pilih role**: "👨‍💼 Peninjau" dari dropdown
4. **Masukkan kode rahasia**: `"tanya developer yaa"` (tanpa petik)
5. **Submit form**: Akan redirect ke login jika berhasil

### **Login sebagai Peninjau:**
1. **Gunakan halaman login biasa**: `/login`
2. **Masukkan credentials**: Email dan password yang sudah didaftarkan
3. **Otomatis redirect**: Sistem akan mendeteksi role dan memberikan akses sesuai

---

## 🎛️ **Fitur Admin Panel**

### **Akses Admin Panel:**
- **URL**: `/admin` (otomatis redirect setelah login)
- **Navigasi**: Melalui sidebar atau direct URL
- **Requirement**: Harus login dengan role "peninjau"

### **Tab-tab dalam Admin Panel:**

#### **📊 1. Laporan (Reports)**
- **Fungsi**: Melihat semua laporan dari pengguna
- **Kemampuan**:
  - Melihat detail laporan
  - Melihat konten yang dilaporkan
  - Mengambil tindakan berdasarkan laporan

#### **📝 2. Postingan (Posts)**
- **Fungsi**: Moderasi semua postingan di platform
- **Kemampuan**:
  - Melihat semua postingan (aktif dan terarsip)
  - **Arsipkan postingan**: Menyembunyikan postingan yang tidak pantas
  - **Aktifkan postingan**: Mengembalikan postingan yang terarsip
  - Melihat detail lengkap postingan

#### **📂 3. Kategori (Categories)**
- **Fungsi**: Melihat dan mengelola kategori postingan
- **Kemampuan**:
  - Melihat semua kategori yang tersedia
  - Melihat statistik penggunaan kategori

---

## 🛡️ **Permissions dan Akses**

### **Backend Permissions:**
```javascript
// Route yang dapat diakses peninjau:
- POST /api/postingan (membuat postingan)
- PUT /api/postingan/:id (edit postingan)
- DELETE /api/postingan/:id (hapus postingan)
- GET /api/interaksi (melihat semua interaksi/laporan)
- PUT /api/postingan/:id/status (mengubah status postingan)
```

### **Frontend Access Control:**
- **ProtectedRoute**: Menggunakan middleware untuk validasi role
- **Admin Panel**: Hanya dapat diakses dengan role "peninjau"
- **Navigation**: Menu admin hanya muncul untuk peninjau

---

## 🔧 **Fitur Khusus Peninjau**

### **1. Content Moderation:**
- **Arsip Postingan**: Menyembunyikan konten yang tidak pantas
- **Hapus Komentar**: Menghapus komentar yang melanggar aturan
- **Review Laporan**: Menindaklanjuti laporan dari pengguna

### **2. Dashboard Analytics:**
- **Statistik Postingan**: Jumlah postingan per kategori
- **Laporan Aktif**: Jumlah laporan yang perlu ditindaklanjuti
- **User Activity**: Aktivitas pengguna di platform

### **3. Category Management:**
- **View Categories**: Melihat semua kategori dengan emoji
- **Category Stats**: Statistik penggunaan setiap kategori

---

## 🚀 **Workflow Peninjau**

### **Daily Tasks:**
1. **Login ke sistem** dengan credentials peninjau
2. **Buka Admin Panel** (`/admin`)
3. **Review Laporan** di tab "Laporan"
4. **Moderasi Konten** di tab "Postingan"
5. **Monitor Kategori** di tab "Kategori"

### **Content Moderation Process:**
1. **Terima laporan** dari pengguna
2. **Review konten** yang dilaporkan
3. **Ambil tindakan**:
   - Arsipkan jika melanggar aturan
   - Biarkan aktif jika sesuai aturan
   - Hapus komentar yang tidak pantas

---

## 📞 **Support dan Bantuan**

### **Technical Issues:**
- **Frontend Error**: Cek console browser untuk error details
- **Backend Error**: Cek server logs untuk debugging
- **Access Issues**: Pastikan role "peninjau" sudah benar di database

### **Contact Information:**
- **Developer**: Tim AspirasiKu
- **Email**: support@aspirasiku.com
- **Documentation**: Lihat file README.md untuk setup

---

## 🔄 **Updates dan Maintenance**

### **Regular Updates:**
- **Security Patches**: Update berkala untuk keamanan
- **Feature Enhancements**: Penambahan fitur moderasi baru
- **Bug Fixes**: Perbaikan bug yang ditemukan

### **Backup dan Recovery:**
- **Database Backup**: Backup otomatis setiap hari
- **Content Recovery**: Kemampuan restore konten yang terhapus
- **User Data Protection**: Enkripsi data sensitif pengguna

---

**Dokumentasi ini akan diupdate seiring dengan pengembangan fitur baru untuk role peninjau.**
