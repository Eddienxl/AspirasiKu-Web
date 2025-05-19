// src/pages/Profile.jsx
import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Contoh userId statis, nanti bisa diganti sesuai autentikasi
  const userId = 1;

  useEffect(() => {
    fetch(`http://localhost:5000/api/pengguna/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal fetch data pengguna:', err);
        setLoading(false);
      });
  }, [userId]);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="text-center">Memuat profil...</div>
      </div>
    );

  if (!user)
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center" role="alert">
          Pengguna tidak ditemukan.
        </div>
      </div>
    );

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title mb-4">Profil Pengguna</h1>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Nama:</strong> {user.nama}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="list-group-item">
              <strong>Username:</strong> {user.username}
            </li>
            {/* Tambahkan field lain sesuai data pengguna */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
