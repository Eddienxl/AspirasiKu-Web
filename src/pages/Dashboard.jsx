import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { getAllPosts } from '../services/api';
import ErrorBoundary from '../components/ErrorBoundary';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('terbaru');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts('semua', sort);
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sort]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 lg:ml-72">
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Dashboard Aspirasi</h1>
            <p className="text-gray-600">Jelajahi dan berikan suara untuk aspirasi terbaru</p>
          </div>

          {/* Filter Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-green-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Urutkan berdasarkan:</span>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50 text-gray-700 font-medium min-w-[150px]"
              >
                <option value="terbaru">🕒 Terbaru</option>
                <option value="populer">🔥 Populer</option>
              </select>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
              <p className="text-gray-600 font-medium">Memuat postingan...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-gray-400 text-4xl mb-4">📝</div>
                <p className="text-gray-600 font-medium">Belum ada postingan</p>
                <p className="text-gray-500 text-sm mt-2">Jadilah yang pertama untuk berbagi aspirasi!</p>
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
  );
};

export default Dashboard;
