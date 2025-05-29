import { useState } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar.jsx';
import { changePassword } from '../services/api';
import { FaLock } from 'react-icons/fa';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Password baru dan konfirmasi password tidak cocok');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password baru minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      await changePassword(oldPassword, newPassword);
      toast.success('Password berhasil diubah!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(`Gagal mengubah password: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 flex">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 lg:ml-72">
        <main className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-primary-200 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLock className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Ubah Password</h1>
              <p className="text-gray-600">Perbarui kata sandi akun Anda</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Password Lama</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50"
                  placeholder="Masukkan password lama"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Password Baru</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50"
                  placeholder="Masukkan password baru"
                  required
                  minLength="6"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50"
                  placeholder="Konfirmasi password baru"
                  required
                  minLength="6"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-500 to-emerald-500 text-white p-4 rounded-xl font-semibold hover:from-primary-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Mengubah...' : 'Ubah Password'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChangePassword;
