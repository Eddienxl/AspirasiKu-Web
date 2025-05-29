import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import { toast } from 'react-toastify';
import {
  getAllReports,
  updatePostStatus,
  deleteComment,
  getAllPosts,
  getCategories
} from '../services/api';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [reports, setReports] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (activeTab === 'reports') {
          const data = await getAllReports();
          setReports(data);
        } else if (activeTab === 'posts') {
          const data = await getAllPosts();
          setPosts(data);
        } else if (activeTab === 'categories') {
          const data = await getCategories();
          setCategories(data);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Gagal memuat data');
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleUpdateStatus = async (postId, status) => {
    try {
      await updatePostStatus(postId, status);
      toast.success('Status berhasil diperbarui');
      setReports(reports.filter(report => report?.id_postingan !== postId));
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(`Gagal memperbarui status: ${error.message}`);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      toast.success('Komentar berhasil dihapus');
      setReports(reports.filter(report => report?.id_komentar !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error(`Gagal menghapus komentar: ${error.message}`);
    }
  };



  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      );
    }

    if (error) {
      return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    switch (activeTab) {
      case 'reports':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Laporan</h2>
            {reports.length === 0 ? (
              <p className="text-gray-600 text-lg">Tidak ada laporan</p>
            ) : (
              reports.map(report => (
                <div key={report?.id} className="bg-white p-6 rounded-xl shadow-md mb-4">
                  <p className="text-gray-700 mb-2">
                    {report?.id_postingan ? `Postingan ID: ${report?.id_postingan}` : `Komentar ID: ${report?.id_komentar}`}
                  </p>
                  <p className="text-gray-600 mb-4">Tipe: {report?.tipe}</p>
                  {report?.id_postingan && (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleUpdateStatus(report?.id_postingan, 'terarsip')}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                      >
                        Arsipkan
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(report?.id_postingan, 'aktif')}
                        className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all duration-300"
                      >
                        Aktifkan
                      </button>
                    </div>
                  )}
                  {report?.id_komentar && (
                    <button
                      onClick={() => handleDeleteComment(report?.id_komentar)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                      Hapus Komentar
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        );



      case 'posts':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Kelola Postingan</h2>
            {posts.length === 0 ? (
              <p className="text-gray-600 text-lg">Tidak ada postingan</p>
            ) : (
              <div className="grid gap-4">
                {posts.map(post => (
                  <div key={post.id} className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{post.judul}</h3>
                        <p className="text-gray-600 mb-2">{post.konten?.substring(0, 100)}...</p>
                        <p className="text-sm text-gray-500">
                          Kategori: {post.kategori?.nama} | Status: {post.status || 'aktif'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateStatus(post.id, post.status === 'aktif' ? 'terarsip' : 'aktif')}
                          className="bg-accent text-primary px-3 py-1 rounded hover:bg-yellow-500 transition-all duration-300"
                        >
                          {post.status === 'aktif' ? 'Arsipkan' : 'Aktifkan'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'categories':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Kelola Kategori</h2>
            {categories.length === 0 ? (
              <p className="text-gray-600 text-lg">Tidak ada kategori</p>
            ) : (
              <div className="grid gap-4">
                {categories.map(category => (
                  <div key={category.id} className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-semibold text-lg">{category.nama}</h3>
                    <p className="text-gray-600">ID: {category.id}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 lg:ml-72">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Panel Peninjau</h1>
            <p className="text-gray-600">Kelola konten dan pengguna platform</p>
          </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          {[
            { key: 'reports', label: 'Laporan' },
            { key: 'posts', label: 'Postingan' },
            { key: 'categories', label: 'Kategori' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;