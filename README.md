# 🎓 AspirasiKu - Platform Aspirasi Mahasiswa UIN Suska Riau

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/PostgreSQL-15.x-blue?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</div>

## 📋 **Project Overview**

**AspirasiKu** adalah platform digital yang dirancang khusus untuk mahasiswa UIN Suska Riau untuk menyampaikan aspirasi, pertanyaan, dan feedback kepada pihak universitas. Platform ini menyediakan ruang yang aman dan terstruktur bagi mahasiswa untuk berpartisipasi aktif dalam pengembangan kampus melalui sistem yang transparan dan responsif.

### 🎯 **Tujuan Platform**
- Memfasilitasi komunikasi dua arah antara mahasiswa dan pihak universitas
- Menyediakan sistem kategorisasi yang terorganisir untuk berbagai jenis aspirasi
- Memberikan tools moderasi untuk menjaga kualitas konten
- Menciptakan lingkungan yang mendukung partisipasi aktif mahasiswa

---

## ✨ **Features & Functionality**

### 🔐 **Authentication & User Management**
- **User Registration**: Sistem registrasi dengan validasi email dan NIM
- **Role-based Authentication**: Dua tipe user (Pengguna & Peninjau)
- **JWT Token Security**: Secure authentication dengan JSON Web Tokens
- **Password Visibility Toggle**: Eye icon untuk show/hide password di semua form
- **Profile Management**: Edit profil dan ubah password dengan konfirmasi

### 📝 **Content Management**
- **Post Creation**: Buat aspirasi dengan judul, konten, dan kategori
- **10 Kategori Terstruktur**:
  - 🏫 Fasilitas Kampus
  - 📚 Akademik
  - 💝 Kesejahteraan Mahasiswa
  - 🎭 Kegiatan Kemahasiswaan
  - 💻 Sarana dan Prasarana Digital
  - 🛡️ Keamanan dan Ketertiban
  - 🌱 Lingkungan dan Kebersihan
  - 🚌 Transportasi dan Akses
  - 📋 Kebijakan dan Administrasi
  - 💡 Saran dan Inovasi

### 💬 **Interactive Features**
- **Comment System**: Komentar dengan dukungan anonymous posting
- **Voting System**: Upvote/downvote untuk postingan dan komentar
- **Report System**: Laporkan konten yang tidak pantas
- **Category Filtering**: Filter postingan berdasarkan kategori
- **Sorting Options**: Urutkan berdasarkan terbaru atau popularitas

### 🎛️ **Admin Panel (Peninjau Only)**
- **Content Moderation**: Arsipkan/aktifkan postingan
- **Report Management**: Review dan tindak lanjuti laporan
- **User Analytics**: Statistik penggunaan platform
- **Category Management**: Kelola kategori postingan

### 🎨 **UI/UX Features**
- **Responsive Design**: Optimal di desktop, tablet, dan mobile
- **Modern Interface**: Instagram-quality design dengan Tailwind CSS
- **Smooth Animations**: Micro-interactions dan hover effects
- **Loading States**: Skeleton loading dan progress indicators
- **Dark/Light Theme**: Consistent green gradient color scheme

---

## 🛠️ **Technology Stack**

### **Frontend**
```
React.js 18.2.0          - UI Framework
Tailwind CSS 3.3.0       - Styling Framework
React Router 6.x          - Client-side Routing
React Icons               - Icon Library
React Toastify            - Notification System
Axios                     - HTTP Client
```

### **Backend**
```
Node.js 18.x              - Runtime Environment
Express.js 4.x            - Web Framework
Sequelize ORM 6.x         - Database ORM
JWT                       - Authentication
bcrypt                    - Password Hashing
CORS                      - Cross-Origin Resource Sharing
```

### **Database**
```
PostgreSQL 15.x           - Primary Database
```

---

## 🌐 **Deployment & Access**

### **🚀 Production Deployment**
- **Frontend**: [https://aspirasiku.netlify.app](https://aspirasiku.netlify.app) (Auto-deploy from GitHub)
- **Backend API**: [https://backend-platform.up.railway.app/api](https://backend-platform.up.railway.app/api) (Auto-deploy from GitHub)
- **Admin Panel**: [https://aspirasiku.netlify.app/admin](https://aspirasiku.netlify.app/admin) (Peninjau only)

### **💻 Local Development**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:5173/admin (Peninjau only)

### **Environment Variables for Netlify**
```bash
VITE_API_URL=https://backend-platform.up.railway.app
```

### **Deployment Commands**
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 👥 **User Roles & Permissions**

### **👤 Pengguna (Regular User)**
```
✅ Create and edit own posts
✅ Comment on posts (public/anonymous)
✅ Vote on posts and comments
✅ Report inappropriate content
✅ Manage personal profile
✅ View notifications
✅ Filter posts by category
❌ Access admin panel
❌ Moderate other users' content
```

### **👨‍💼 Peninjau (Reviewer/Admin)**
```
✅ All regular user capabilities
✅ Access admin panel (/admin)
✅ Moderate posts (archive/activate)
✅ Delete inappropriate comments
✅ Review and manage reports
✅ View platform analytics
✅ Manage post categories
✅ Monitor user activities
```

---

## 🔌 **API Documentation**

### **Authentication Endpoints**
```
POST /api/auth/register     - User registration
POST /api/auth/login        - User login
GET  /api/auth/profile      - Get current user profile
PUT  /api/auth/ubah-profil  - Update user profile
PUT  /api/auth/ubah-kata-sandi - Change password
```

### **Post Management**
```
GET    /api/postingan       - Get all posts (with filtering)
POST   /api/postingan       - Create new post
GET    /api/postingan/:id   - Get specific post
PUT    /api/postingan/:id   - Update post
DELETE /api/postingan/:id   - Delete post
```

### **Comment System**
```
GET    /api/komentar        - Get all comments
POST   /api/komentar        - Create new comment
PUT    /api/komentar/:id    - Update comment
DELETE /api/komentar/:id    - Delete comment
```

### **Interaction System**
```
POST /api/interaksi/postingan  - Vote/report on posts
POST /api/interaksi/komentar   - Vote/report on comments
GET  /api/interaksi            - Get all interactions (admin)
```

### **Category Management**
```
GET /api/kategori           - Get all categories
```

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Contributors**

This project exists thanks to all the people who contributed:

<table>
  <tr>
    <td align="center">
      <strong>Ahmad Fadli Pratama</strong><br>
      <sub>Project Manager, Frontend Developer, UI/UX Designer</sub><br>
      <sub>Project management, user interface, responsive design</sub>
    </td>
    <td align="center">
      <strong>Wahyu Hidayat</strong><br>
      <sub>Backend Developer, Database Architect</sub><br>
      <sub>API development, database design</sub>
    </td>
    <td align="center">
      <strong>Syukri Ihsan</strong><br>
      <sub>Backend Developer, Database Architect</sub><br>
      <sub>API development, database design</sub>
    </td>
    <td align="center">
      <strong>Wan Muhammad Faaruq</strong><br>
      <sub>UI/UX Designer</sub><br>
      <sub>User interface design, user experience optimization</sub>
    </td>
  </tr>
</table>

---

<div align="center">
  <p><strong>Made with ❤️ for UIN Suska Riau Students</strong></p>
  <p>© 2024 AspirasiKu Platform. All rights reserved.</p>
  <p><em>Developed by Ahmad Fadli Pratama, Wan Muhammad Faaruq, Wahyu Hidayat, and Syukri Ihsan</em></p>
</div>
