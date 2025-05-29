import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import PostCard from '../components/PostCard.jsx';
import { getUserProfile, getUserPosts, getCurrentUser, getCurrentUserPosts } from '../services/api';
import ErrorBoundary from '../components/ErrorBoundary';

const Profile = () => {
  const { username, userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        if (username === 'me') {
          // For /profil/me, get current user data
          const [userData, userPosts] = await Promise.all([
            getCurrentUser(),
            getCurrentUserPosts()
          ]);
          setUser(userData);
          setPosts(Array.isArray(userPosts) ? userPosts : []);
        } else if (userId) {
          // For /profil/user/{userId}, get specific user data by ID
          const [userData, userPosts] = await Promise.all([
            getUserProfile(userId),
            getUserPosts(userId)
          ]);
          setUser(userData);
          setPosts(Array.isArray(userPosts) ? userPosts : []);
        } else {
          // Legacy support for username (though backend expects ID)
          setError('Format URL tidak didukung. Gunakan /profil/me atau /profil/user/{userId}');
          setLoading(false);
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Gagal memuat data pengguna');
        setLoading(false);
      }
    };

    if (username || userId) {
      fetchUserData();
    }
  }, [username, userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 lg:ml-72">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
              <p className="text-gray-600 font-medium">Memuat profil...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 lg:ml-72">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto text-center">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <p className="text-red-600 font-medium">{error || 'Pengguna tidak ditemukan'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 flex">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 lg:ml-72">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8 border border-primary-200">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.nama?.[0] || 'U'}
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold mb-2 text-gray-800">{user?.nama || 'User'}</h1>
                  <div className="space-y-1">
                    <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                      <span className="font-medium">📧 Email:</span>
                      <span className="ml-2">{user?.email || 'Tidak tersedia'}</span>
                    </p>
                    <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                      <span className="font-medium">🎓 NIM:</span>
                      <span className="ml-2">{user?.nim || 'Tidak tersedia'}</span>
                    </p>
                    <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                      <span className="font-medium">📅 Bergabung:</span>
                      <span className="ml-2">
                        {user?.dibuat_pada ? new Date(user.dibuat_pada).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Tidak tersedia'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary-200 p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">📝</span>
                </div>
                Riwayat Postingan
              </h2>

              {!Array.isArray(posts) || posts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
                    <div className="text-gray-400 text-4xl mb-4">📝</div>
                    <p className="text-gray-600 font-medium">Belum ada postingan</p>
                    <p className="text-gray-500 text-sm mt-2">Postingan akan muncul di sini</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {posts.map(post => (
                    <ErrorBoundary key={post?.id}>
                      <PostCard post={post} />
                    </ErrorBoundary>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;