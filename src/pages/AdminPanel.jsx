import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import ReportsTab from '../components/admin/ReportsTab.jsx';
import PostsTab from '../components/admin/PostsTab.jsx';
import CategoriesTab from '../components/admin/CategoriesTab.jsx';
import {
  getAllReports,
  getAllPostsAdmin,
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
          const data = await getAllPostsAdmin();
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



  const renderTabContent = () => {
    switch (activeTab) {
      case 'reports':
        return (
          <ReportsTab
            reports={reports}
            setReports={setReports}
            loading={loading}
            error={error}
            getAllReports={getAllReports}
            getAllPostsAdmin={getAllPostsAdmin}
          />
        );

      case 'posts':
        return (
          <PostsTab
            posts={posts}
            setPosts={setPosts}
            loading={loading}
            error={error}
            getAllPostsAdmin={getAllPostsAdmin}
          />
        );

      case 'categories':
        return (
          <CategoriesTab
            categories={categories}
            setCategories={setCategories}
            loading={loading}
            error={error}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-campus flex">
      <div className="bg-campus-overlay min-h-screen w-full flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 lg:ml-72">
          <main className="p-4 sm:p-6 lg:p-8">
          <div className="card-glass rounded-2xl p-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Panel Peninjau</h1>
            <p className="text-gray-600">Kelola konten dan pengguna platform</p>
          </div>

        {/* Tab Navigation */}
        <div className="card-glass-dark rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {[
            { key: 'reports', label: 'Laporan' },
            { key: 'posts', label: 'Postingan' },
            { key: 'categories', label: 'Kategori' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === tab.key
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
          </div>
        </div>

        {/* Tab Content */}
          {renderTabContent()}
        </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;