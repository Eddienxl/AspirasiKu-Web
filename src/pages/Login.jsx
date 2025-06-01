import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveToken } from '../utils/auth';
import { login } from '../services/api';
import PasswordInput from '../components/PasswordInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [kata_sandi, setKataSandi] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send login request to API and get response
      const response = await login(email, kata_sandi);

      if (response.token && response.user) {
        // Save token in localStorage
        saveToken(response.token);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.user));

        toast.success('Login berhasil! Selamat datang!');

        // Redirect based on user role
        if (response.user.peran === 'peninjau') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        throw new Error('No token or user data received from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(`Login gagal: ${error.message}`);
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Masuk ke AspirasiKu</h1>
          <p className="text-gray-600">Silakan masuk untuk melanjutkan</p>
        </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Email atau Username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50"
                placeholder="Masukkan email atau username Anda"
                required
              />
            </div>
            <PasswordInput
              value={kata_sandi}
              onChange={(e) => setKataSandi(e.target.value)}
              placeholder="Masukkan kata sandi Anda"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Belum punya akun? <Link to="/register" className="text-green-600 hover:text-green-700 font-medium hover:underline">Daftar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;