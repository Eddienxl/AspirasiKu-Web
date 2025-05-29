import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import PostCard from '../components/PostCard.jsx';
import { getAllPosts } from '../services/api';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data.slice(0, 6)); // Get only first 6 posts for homepage
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 flex">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 lg:ml-72">
        <main className="flex-grow">
          <section className="relative bg-gradient-to-r from-primary-500 to-emerald-600 text-white py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-emerald-600 to-teal-600 opacity-95"></div>
            <div className="container mx-auto text-center relative z-10 px-4">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in text-white drop-shadow-lg">
                🎓 Selamat Datang di AspirasiKu
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-white/90 max-w-2xl mx-auto drop-shadow-md">
                Sampaikan aspirasi dan pertanyaan Anda untuk UIN Suska Riau
              </p>
              <Link
                to="/dashboard"
                className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                🚀 Lihat Aspirasi
              </Link>
            </div>
          </section>
        <section className="container mx-auto py-12 px-4 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Postingan Terbaru</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat postingan...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">Belum ada postingan</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {posts.map(post => (
                <ErrorBoundary key={post?.id}>
                  <PostCard post={post} />
                </ErrorBoundary>
              ))}
            </div>
          )}
        </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
