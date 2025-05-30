import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEdit, FaTimes, FaCheck, FaCamera } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import PasswordInput from '../components/PasswordInput';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import Avatar from '../components/Avatar';
import { getCurrentUser, updateProfile, changePassword } from '../services/api';

const ProfileSettings = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Try to get fresh data from backend
        const userData = await getCurrentUser();
        setUser(userData);
        setFormData(prev => ({
          ...prev,
          nama: userData.nama || '',
          email: userData.email || ''
        }));
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Failed to load user data from backend:', error);
        // Fallback to localStorage
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
        setFormData(prev => ({
          ...prev,
          nama: userData.nama || '',
          email: userData.email || ''
        }));
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showConfirmation = (action, message) => {
    setConfirmAction({ action, message });
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    if (confirmAction?.action === 'updateUsername') {
      await handleUpdateProfile();
    } else if (confirmAction?.action === 'changePassword') {
      await handleChangePassword();
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile({
        nama: formData.nama,
        email: formData.email
      });

      // Update local user state
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));

      toast.success('Profil berhasil diperbarui');
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.message || 'Gagal memperbarui profil');
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Password baru tidak cocok');
      return;
    }

    if (!formData.currentPassword || !formData.newPassword) {
      toast.error('Semua field password harus diisi');
      return;
    }

    try {
      await changePassword(formData.currentPassword, formData.newPassword);
      toast.success('Password berhasil diubah');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(error.message || 'Gagal mengubah password');
    }
  };

  const onSubmitUsername = (e) => {
    e.preventDefault();
    showConfirmation('updateUsername', 'Apakah Anda yakin ingin mengubah username?');
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();
    showConfirmation('changePassword', 'Apakah Anda yakin ingin mengubah password?');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 flex">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 lg:ml-72">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Pengaturan Profil</h1>
              <p className="text-gray-600">Kelola informasi akun dan keamanan Anda</p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary-200 mb-6">
              <div className="border-b border-primary-200">
                <nav className="flex flex-wrap gap-2 p-4">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                      activeTab === 'profile'
                        ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                  >
                    <FaUser className="mr-2" />
                    Informasi Profil
                  </button>
                  <button
                    onClick={() => setActiveTab('photo')}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                      activeTab === 'photo'
                        ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                  >
                    <FaCamera className="mr-2" />
                    Foto Profil
                  </button>
                  <button
                    onClick={() => setActiveTab('username')}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                      activeTab === 'username'
                        ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                  >
                    <FaEdit className="mr-2" />
                    Ubah Username
                  </button>
                  <button
                    onClick={() => setActiveTab('password')}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                      activeTab === 'password'
                        ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                  >
                    <FaLock className="mr-2" />
                    Ubah Password
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="animate-fade-in">
                    <div className="flex items-center mb-6">
                      <Avatar user={user} size="xl" className="mr-4 shadow-lg" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{user?.nama || 'User'}</h2>
                        <p className="text-gray-600">Informasi Profil Anda</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-r from-primary-50 to-emerald-50 p-6 rounded-xl border border-primary-200">
                        <label className="block text-sm font-medium text-primary-700 mb-2">
                          Username
                        </label>
                        <p className="text-gray-900 font-semibold text-lg">{user?.nama || 'Tidak tersedia'}</p>
                      </div>
                      <div className="bg-gradient-to-r from-primary-50 to-emerald-50 p-6 rounded-xl border border-primary-200">
                        <label className="block text-sm font-medium text-primary-700 mb-2">
                          Email
                        </label>
                        <p className="text-gray-900 font-semibold text-lg">{user?.email || 'Tidak tersedia'}</p>
                      </div>
                      <div className="bg-gradient-to-r from-primary-50 to-emerald-50 p-6 rounded-xl border border-primary-200">
                        <label className="block text-sm font-medium text-primary-700 mb-2">
                          NIM
                        </label>
                        <p className="text-gray-900 font-semibold text-lg">{user?.nim || 'Tidak tersedia'}</p>
                      </div>
                      <div className="bg-gradient-to-r from-primary-50 to-emerald-50 p-6 rounded-xl border border-primary-200">
                        <label className="block text-sm font-medium text-primary-700 mb-2">
                          Bergabung Sejak
                        </label>
                        <p className="text-gray-900 font-semibold text-lg">
                          {user?.dibuat_pada ? new Date(user.dibuat_pada).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'Tidak tersedia'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Photo Tab */}
                {activeTab === 'photo' && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Foto Profil</h2>
                    <div className="max-w-md mx-auto">
                      <ProfilePictureUpload
                        currentUser={user}
                        onUploadSuccess={(updatedUser) => {
                          setUser(updatedUser);
                          localStorage.setItem('user', JSON.stringify(updatedUser));
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Username Tab */}
                {activeTab === 'username' && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ubah Username</h2>
                    <form onSubmit={onSubmitUsername} className="max-w-md">
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username Saat Ini
                        </label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-xl border">{user.nama}</p>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username Baru
                        </label>
                        <input
                          type="text"
                          name="nama"
                          value={formData.nama}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50"
                          placeholder="Masukkan username baru"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary-500 to-emerald-500 text-white px-6 py-4 rounded-xl font-medium hover:from-primary-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <FaEdit className="inline mr-2" />
                        💾 Simpan Perubahan
                      </button>
                    </form>
                  </div>
                )}

                {/* Password Tab */}
                {activeTab === 'password' && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ubah Password</h2>
                    <form onSubmit={onSubmitPassword} className="max-w-md space-y-2">
                      <PasswordInput
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange({ target: { name: 'currentPassword', value: e.target.value } })}
                        placeholder="Masukkan password saat ini"
                        label="Password Saat Ini"
                        className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50"
                        required
                      />
                      <PasswordInput
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange({ target: { name: 'newPassword', value: e.target.value } })}
                        placeholder="Masukkan password baru"
                        label="Password Baru"
                        className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50"
                        required
                      />
                      <PasswordInput
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange({ target: { name: 'confirmPassword', value: e.target.value } })}
                        placeholder="Konfirmasi password baru"
                        label="Konfirmasi Password Baru"
                        className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary-500 to-emerald-500 text-white px-6 py-4 rounded-xl font-medium hover:from-primary-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <FaLock className="inline mr-2" />
                        🔐 Ubah Password
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-large max-w-md w-full animate-fade-in">
                  <div className="p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-4">
                      <span className="text-white text-2xl">⚠️</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Konfirmasi Perubahan</h3>
                    <p className="text-gray-600 text-center mb-6">{confirmAction?.message}</p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowConfirmModal(false)}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
                      >
                        <FaTimes className="inline mr-2" />
                        Batal
                      </button>
                      <button
                        onClick={handleConfirm}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                      >
                        <FaCheck className="inline mr-2" />
                        ✅ Ya, Ubah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
