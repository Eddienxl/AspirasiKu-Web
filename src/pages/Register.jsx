import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { saveToken } from '../utils/auth';

const Register = () => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [kata_sandi, setKataSandi] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveToken('dummy-token');
    toast.success('Registration successful');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow container mx-auto p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl transform transition-all duration-500">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Daftar ke AspirasiKu</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">NIM</label>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Nama</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Kata Sandi</label>
              <input
                type="password"
                value={kata_sandi}
                onChange={(e) => setKataSandi(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Daftar
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Sudah punya akun? <Link to="/login" className="text-accent hover:underline">Masuk</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;