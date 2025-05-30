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
(MySQL Support Available) - Alternative Database Option
```

---

## 🚀 **Installation & Setup**

### **Prerequisites**
- Node.js 18.x or higher
- PostgreSQL 15.x or MySQL 8.x
- Git
- npm or yarn package manager

### **1. Clone Repository**
```bash
git clone https://github.com/yourusername/aspirasiku.git
cd aspirasiku
```

### **2. Backend Setup**
```bash
# Navigate to backend directory
cd AspirasiKu-Backend/backend-platform

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure database connection in .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aspirasiku_db
DB_USER=your_username
DB_PASS=your_password
JWT_SECRET=your_jwt_secret_key

# Run database migrations
npx sequelize-cli db:migrate

# Seed initial data (optional)
npx sequelize-cli db:seed:all

# Start backend server
npm start
```

### **3. Frontend Setup**
```bash
# Navigate to frontend directory
cd ../../AspirasiKu

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure API endpoint
VITE_API_URL=http://localhost:5000

# Start frontend development server
npm run dev
```

### **4. Access Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5173/admin (peninjau only)

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

### **Creating Peninjau Account**
1. Register with role "Peninjau"
2. Enter secret code: `peninjau`
3. Login with created credentials
4. Access admin panel automatically

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

## 📁 **Project Structure**

### **Frontend Structure**
```
AspirasiKu/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   ├── PostCard.jsx    # Post display component
│   │   ├── CommentCard.jsx # Comment display component
│   │   └── PasswordInput.jsx # Password input with toggle
│   ├── pages/              # Page components
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── AddPost.jsx     # Create post page
│   │   ├── PostDetail.jsx  # Post detail view
│   │   ├── Profile.jsx     # User profile page
│   │   ├── ProfileSettings.jsx # Profile settings
│   │   └── AdminPanel.jsx  # Admin panel (peninjau only)
│   ├── services/           # API service functions
│   │   └── api.js          # API calls and HTTP client
│   ├── utils/              # Utility functions
│   │   └── auth.js         # Authentication helpers
│   ├── App.jsx             # Main app component
│   └── main.jsx            # App entry point
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

### **Backend Structure**
```
AspirasiKu-Backend/backend-platform/
├── config/                 # Configuration files
│   └── database.js         # Database configuration
├── controllers/            # Request handlers
│   ├── authController.js   # Authentication logic
│   ├── postinganController.js # Post management
│   ├── komentarController.js  # Comment management
│   └── interaksiController.js # Interaction handling
├── middleware/             # Custom middleware
│   ├── authentikasi.js     # JWT authentication
│   └── authorisasi.js      # Role-based authorization
├── models/                 # Database models
│   ├── Pengguna.js         # User model
│   ├── Postingan.js        # Post model
│   ├── Komentar.js         # Comment model
│   ├── Kategori.js         # Category model
│   └── Interaksi.js        # Interaction model
├── routes/                 # API routes
│   ├── authRoutes.js       # Authentication routes
│   ├── postinganRoutes.js  # Post routes
│   ├── komentarRoutes.js   # Comment routes
│   └── interaksiRoutes.js  # Interaction routes
├── utils/                  # Utility functions
├── server.js               # Server entry point
└── package.json            # Dependencies and scripts
```

---

## 🤝 **Contributing Guidelines**

### **Development Workflow**
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** and test thoroughly
4. **Commit changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open Pull Request** with detailed description

### **Code Standards**
- **Frontend**: Follow React best practices and ESLint rules
- **Backend**: Use consistent naming conventions and error handling
- **Database**: Follow Sequelize ORM patterns
- **Styling**: Use Tailwind CSS utility classes consistently
- **Comments**: Add JSDoc comments for complex functions

### **Testing Requirements**
- Test all new features before submitting PR
- Ensure responsive design works on mobile/tablet/desktop
- Verify authentication and authorization flows
- Test API endpoints with proper error handling

---

## 📸 **Screenshots**

### **Main Dashboard**
![Dashboard](screenshots/dashboard.png)
*Main dashboard with post filtering and category navigation*

### **Post Creation**
![Add Post](screenshots/add-post.png)
*Create new post with category selection and content editor*

### **Admin Panel**
![Admin Panel](screenshots/admin-panel.png)
*Admin panel for content moderation and user management*

### **Mobile Responsive**
![Mobile View](screenshots/mobile-view.png)
*Responsive design optimized for mobile devices*

---

## 📞 **Contact Information**

### **Development Team**
- **Ahmad Fadli Pratama** - Project Manager, Frontend Developer, UI/UX Designer
- **Wahyu Hidayat** - Backend Developer, Database Architect
- **Syukri Ihsan** - Backend Developer, Database Architect

### **Project Support**
- **Issues**: Report bugs via GitHub Issues
- **Feature Requests**: Submit via GitHub Discussions
- **Documentation**: Check PENINJAU_ROLE_DOCUMENTATION.md for admin guide
- **University Contact**: [university.contact@uinsuska.ac.id]

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **UIN Suska Riau** - For providing the platform requirements and support
- **React Community** - For the excellent documentation and ecosystem
- **Tailwind CSS** - For the utility-first CSS framework
- **Node.js Community** - For the robust backend ecosystem

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
  </tr>
</table>

---

<div align="center">
  <p><strong>Made with ❤️ for UIN Suska Riau Students</strong></p>
  <p>© 2024 AspirasiKu Platform. All rights reserved.</p>
  <p><em>Developed by Ahmad Fadli Pratama, Wahyu Hidayat, and Syukri Ihsan</em></p>
</div>
