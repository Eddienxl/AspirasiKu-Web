import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../services/api';
import PasswordInput from '../components/PasswordInput';

const Register = () => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [kata_sandi, setKataSandi] = useState('');
  const [peran, setPeran] = useState('pengguna');
  const [kodeRahasia, setKodeRahasia] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await register(nim, nama, email, kata_sandi, peran, kodeRahasia);

      // Redirect ke login setelah registrasi berhasil
      if (response.token && response.user) {
        toast.success('Registrasi berhasil! Silakan login dengan akun Anda.');
        navigate('/login');
      } else if (response.message === 'Registrasi berhasil') {
        toast.success('Registrasi berhasil! Silakan login dengan akun Anda.');
        navigate('/login');
      } else {
        throw new Error('Registrasi gagal');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(`Registrasi gagal: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-campus relative">
      <div className="bg-campus-overlay absolute inset-0"></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full card-glass-dark p-8 rounded-2xl transform transition-all duration-500 animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-24 h-20 flex items-center justify-center mx-auto mb-4">
              <img
                src="/aspirasikulogo.png"
                alt="AspirasiKu Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg border border-green-200 hidden">
                <span className="text-green-600 font-bold text-2xl">A</span>
              </div>
            </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Daftar ke AspirasiKu</h1>
          <p className="text-gray-600">Buat akun baru untuk bergabung</p>
        </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">NIM</label>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="w-full p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50"
                placeholder="Masukkan NIM Anda"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Username</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50"
                placeholder="Masukkan username Anda"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50"
                placeholder="Masukkan email Anda"
                required
              />
            </div>
            <PasswordInput
              value={kata_sandi}
              onChange={(e) => setKataSandi(e.target.value)}
              placeholder="Masukkan kata sandi Anda"
              required
            />

            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Role</label>
              <select
                value={peran}
                onChange={(e) => setPeran(e.target.value)}
                className="w-full p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50"
              >
                <option value="pengguna">👤 Pengguna</option>
                <option value="peninjau">👨‍💼 Peninjau</option>
              </select>
            </div>

            {peran === 'peninjau' && (
              <div className="mb-6">
                <PasswordInput
                  value={kodeRahasia}
                  onChange={(e) => setKodeRahasia(e.target.value)}
                  placeholder="Masukkan kode rahasia peninjau"
                  label="Kode Rahasia Peninjau"
                  required
                />
                <p className="text-sm text-gray-600 mt-2 -mt-4">🔐 Kode rahasia diperlukan untuk membuat akun peninjau</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Sudah punya akun? <Link to="/login" className="text-green-600 hover:text-green-700 font-medium hover:underline">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;