import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import PostCard from '../components/PostCard.jsx';
import { dummyUsers, dummyPosts } from '../data/dummy';

const Profile = () => {
  const { username } = useParams();
  const user = dummyUsers[username] || dummyUsers["user1"];
  const [posts] = useState(dummyPosts.filter(post => post.id_penulis === username));

  if (!user) return <div className="text-center p-4 text-gray-600">Pengguna tidak ditemukan</div>;

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 flex items-center space-x-6">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.nama[0]}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{user?.nama}</h1>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">NIM: {user?.nim}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Riwayat Postingan</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600 text-lg">Belum ada postingan</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post?.id} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;