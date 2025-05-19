import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { toast } from 'react-toastify';
import { dummyInteractions } from '../data/dummy';

const AdminPanel = () => {
  const [reports, setReports] = useState(dummyInteractions.filter(inter => inter.tipe === 'lapor'));

  const handleUpdateStatus = (postId, status) => {
    toast.success('Status updated');
    setReports(reports.filter(report => report?.id_postingan !== postId));
  };

  const handleDeleteComment = (commentId) => {
    toast.success('Comment deleted');
    setReports(reports.filter(report => report?.id_komentar !== commentId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Panel Admin</h1>
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
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;