import { useState, useEffect, useCallback } from 'react';
import PostCard from '../components/PostCard.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { getAllPosts } from '../services/api';
import ErrorBoundary from '../components/ErrorBoundary';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('populer');
  const [selectedCategory, setSelectedCategory] = useState('semua');

  const categories = [
    { value: 'semua', label: '🌟 Semua Kategori', icon: '🌟' },
    { value: 'fasilitas-kampus', label: '🏫 Fasilitas Kampus', icon: '🏫' },
    { value: 'akademik', label: '📚 Akademik', icon: '📚' },
    { value: 'kesejahteraan-mahasiswa', label: '💝 Kesejahteraan Mahasiswa', icon: '💝' },
    { value: 'kegiatan-kemahasiswaan', label: '🎭 Kegiatan Kemahasiswaan', icon: '🎭' },
    { value: 'sarana-prasarana-digital', label: '💻 Sarana dan Prasarana Digital', icon: '💻' },
    { value: 'keamanan-ketertiban', label: '🛡️ Keamanan dan Ketertiban', icon: '🛡️' },
    { value: 'lingkungan-kebersihan', label: '🌱 Lingkungan dan Kebersihan', icon: '🌱' },
    { value: 'transportasi-akses', label: '🚌 Transportasi dan Akses', icon: '🚌' },
    { value: 'kebijakan-administrasi', label: '📋 Kebijakan dan Administrasi', icon: '📋' },
    { value: 'saran-inovasi', label: '💡 Saran dan Inovasi', icon: '💡' }
  ];

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllPosts(selectedCategory, sort);
      setPosts(data);
      setLoading(false);
    } catch {
      setError('Failed to load posts');
      setLoading(false);
    }
  }, [selectedCategory, sort]);

  useEffect(() => {
    fetchPosts();
  }, [sort, selectedCategory, fetchPosts]);

  return (
    <div className="min-h-screen bg-campus flex">
      <div className="bg-campus-overlay min-h-screen w-full flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 lg:ml-72">
          <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 card-glass rounded-2xl p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Dashboard Aspirasi</h1>
            <p className="text-gray-600">Jelajahi dan berikan suara untuk aspirasi terbaru</p>
          </div>

          {/* Filter Section */}
          <div className="card-glass p-6 rounded-2xl mb-8">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6">
              {/* Category Filter */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Filter Kategori:</span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50 text-gray-700 font-medium"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="lg:w-64">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Urutkan:</span>
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50 text-gray-700 font-medium"
                >
                  <option value="terbaru">🕒 Terbaru</option>
                  <option value="populer">🔥 Populer</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="mt-4 pt-4 border-t border-primary-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Filter aktif:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary-100 to-emerald-100 text-primary-700 border border-primary-200">
                  {categories.find(cat => cat.value === selectedCategory)?.icon} {categories.find(cat => cat.value === selectedCategory)?.label.replace(/^[^\s]+ /, '')}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200">
                  {sort === 'terbaru' ? '🕒 Terbaru' : sort === 'populer' ? '🔥 Populer' : '🕒 Terlama'}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-20">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-primary-600 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700 font-semibold text-lg">Memuat postingan...</p>
                <p className="text-gray-500 text-sm">Sedang mengambil data terbaru untuk Anda</p>
              </div>

              {/* Loading skeleton */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-primary-200 animate-pulse">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-1"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      </div>
                      <div className="h-10 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl p-12 max-w-lg mx-auto shadow-xl">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white text-3xl">⚠️</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-xl font-bold text-red-700 mb-2">Oops! Terjadi Kesalahan</h3>
                <p className="text-red-600 font-medium mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🔄 Coba Lagi
                </button>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-primary-50 to-emerald-50 border-2 border-primary-200 rounded-3xl p-12 max-w-lg mx-auto shadow-xl">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white text-3xl">📝</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full animate-bounce"></div>
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">Belum Ada Postingan</h3>
                <p className="text-primary-600 font-medium mb-2">
                  {selectedCategory === 'semua'
                    ? 'Belum ada aspirasi yang dibagikan'
                    : `Belum ada aspirasi untuk kategori "${categories.find(cat => cat.value === selectedCategory)?.label.replace(/^[^\s]+ /, '')}"`
                  }
                </p>
                <p className="text-primary-500 text-sm mb-6">Jadilah yang pertama untuk berbagi aspirasi!</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setSelectedCategory('semua')}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🌟 Lihat Semua Kategori
                  </button>
                  <a
                    href="/ajukan"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    ✨ Buat Aspirasi
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {posts.map(post => (
                <ErrorBoundary key={post?.id}>
                  <PostCard post={post} onInteraction={fetchPosts} />
                </ErrorBoundary>
              ))}
            </div>
          )}
        </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
