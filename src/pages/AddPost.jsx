import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { dummyCategories } from '../data/dummy';

const AddPost = () => {
  const [judul, setJudul] = useState('');
  const [konten, setKonten] = useState('');
  const [id_kategori, setIdKategori] = useState('');
  const [tipe, setTipe] = useState('aspirasi');
  const [anonim, setAnonim] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Postingan berhasil dibuat');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow container mx-auto p-6 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Ajukan Aspirasi/Pertanyaan</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Judul</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Kategori</label>
              <select
                value={id_kategori}
                onChange={(e) => setIdKategori(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                required
              >
                <option value="">Pilih Kategori</option>
                {dummyCategories.map(kategori => (
                  <option key={kategori?.id} value={kategori?.id}>{kategori?.nama}</option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Tipe</label>
              <select
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              >
                <option value="aspirasi">Aspirasi</option>
                <option value="pertanyaan">Pertanyaan</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Konten</label>
              <textarea
                value={konten}
                onChange={(e) => setKonten(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                rows="5"
                required
              />
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={anonim}
                  onChange={(e) => setAnonim(e.target.checked)}
                  className="mr-2 h-5 w-5 text-primary focus:ring-primary rounded"
                />
                <span className="text-gray-700 font-medium">Posting sebagai anonim</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Kirim
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddPost;