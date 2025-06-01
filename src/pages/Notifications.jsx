import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../services/api';
import { FaBell, FaCheck, FaCheckDouble } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await getNotifications();
        setNotifications(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        // Check if it's a 404 error (endpoint not found)
        if (err.message.includes('Cannot GET') || err.message.includes('404')) {
          setError('Fitur notifikasi belum tersedia');
          setNotifications([]); // Set empty array instead of error
        } else {
          setError('Gagal memuat notifikasi');
        }
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.map(notif =>
        notif.id === id ? { ...notif, dibaca: true } : notif
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(notifications.map(notif => ({ ...notif, dibaca: true })));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  return (
    <div className="min-h-screen bg-campus flex">
      <div className="bg-campus-overlay min-h-screen w-full flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 lg:ml-72">
          <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="card-glass rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full flex items-center justify-center">
                <FaBell className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Notifikasi</h1>
                <p className="text-gray-600">Kelola pemberitahuan Anda</p>
              </div>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:from-primary-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FaCheckDouble />
                <span>Tandai Semua Dibaca</span>
              </button>
            )}
            </div>
          </div>
          {/* Content */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
              <p className="text-gray-600 font-medium">Memuat notifikasi...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-gray-400 text-4xl mb-4">🔔</div>
                <p className="text-gray-600 font-medium">Belum ada notifikasi</p>
                <p className="text-gray-500 text-sm mt-2">Notifikasi akan muncul di sini</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map(notif => (
                <div
                  key={notif?.id}
                  className={`card-glass p-6 rounded-2xl transition-all duration-300 ${
                    !notif?.dibaca ? 'ring-2 ring-primary-200' : ''
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${notif?.dibaca ? 'bg-gray-300' : 'bg-primary-500'}`}></div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-2">{notif?.judul}</h3>
                          <p className="text-gray-700 mb-3 leading-relaxed">{notif?.pesan}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              {new Date(notif?.dibuat_pada).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {notif?.pengirim && (
                              <span className="text-primary-600 font-medium">
                                Dari: {notif.pengirim.nama}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {!notif?.dibaca && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-primary-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
                      >
                        <FaCheck />
                        <span>Tandai Dibaca</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        </div>
      </div>
    </div>
  );
};

export default Notifications;