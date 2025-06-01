import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar.jsx';
import { createPost } from '../services/api';

const AddPost = () => {
  const [judul, setJudul] = useState('');
  const [konten, setKonten] = useState('');
  const [id_kategori, setIdKategori] = useState('');
  const [anonim, setAnonim] = useState(false);
  // Kategori yang sudah ditentukan dengan emoticon (10 kategori standar)
  const categories = [
    { id: 1, nama: '🏫 Fasilitas Kampus' },
    { id: 2, nama: '📚 Akademik' },
    { id: 3, nama: '💝 Kesejahteraan Mahasiswa' },
    { id: 4, nama: '🎭 Kegiatan Kemahasiswaan' },
    { id: 5, nama: '💻 Sarana dan Prasarana Digital' },
    { id: 6, nama: '🛡️ Keamanan dan Ketertiban' },
    { id: 7, nama: '🌱 Lingkungan dan Kebersihan' },
    { id: 8, nama: '🚌 Transportasi dan Akses' },
    { id: 9, nama: '📋 Kebijakan dan Administrasi' },
    { id: 10, nama: '💡 Saran dan Inovasi' }
  ];

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        judul,
        konten,
        id_kategori: parseInt(id_kategori),
        anonim
      };

      await createPost(postData);
      toast.success('Postingan berhasil dibuat!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(`Gagal membuat postingan: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-campus flex">
      <div className="bg-campus-overlay min-h-screen w-full flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 lg:ml-72">
          <main className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-screen">
            <div className="max-w-lg w-full card-glass-dark p-8 rounded-2xl animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">✍️</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Ajukan Aspirasi</h1>
              <p className="text-gray-600">Sampaikan aspirasi atau pertanyaan Anda</p>
            </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Judul</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50"
                placeholder="Masukkan judul aspirasi Anda"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Kategori</label>
              <select
                value={id_kategori}
                onChange={(e) => setIdKategori(e.target.value)}
                className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50"
                required
              >
                <option value="" disabled>📂 Pilih Kategori</option>
                {categories.map(kategori => (
                  <option key={kategori?.id} value={kategori?.id}>
                    {kategori?.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Konten</label>
              <textarea
                value={konten}
                onChange={(e) => setKonten(e.target.value)}
                className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50 resize-none"
                rows="5"
                placeholder="Jelaskan aspirasi atau pertanyaan Anda secara detail..."
                required
              />
            </div>
            <div className="mb-6">
              <label className="flex items-center p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200">
                <input
                  type="checkbox"
                  checked={anonim}
                  onChange={(e) => setAnonim(e.target.checked)}
                  className="mr-3 h-5 w-5 text-primary-500 focus:ring-primary-500 rounded"
                />
                <span className="text-gray-700 font-medium">Posting sebagai Anonim🕶️</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-emerald-500 text-white p-4 rounded-xl font-semibold hover:from-primary-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? '📤 Mengirim...' : '🚀 Kirim Aspirasi'}
            </button>
          </form>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
};

export default AddPost;