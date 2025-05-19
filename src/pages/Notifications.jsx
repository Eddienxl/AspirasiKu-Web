import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { dummyNotifications } from '../data/dummy';

const Notifications = () => {
  const [notifications] = useState(dummyNotifications);

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Notifikasi</h1>
        {notifications.length === 0 ? (
          <p className="text-gray-600 text-lg">Tidak ada notifikasi</p>
        ) : (
          notifications.map(notif => (
            <div key={notif?.id} className="bg-white p-6 rounded-xl shadow-md mb-4 hover:bg-gray-50 transition-colors duration-200">
              <p className="text-gray-700 mb-2">{notif?.pesan}</p>
              <p className="text-gray-500 text-sm">
                {new Date(notif?.dibuat_pada).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;