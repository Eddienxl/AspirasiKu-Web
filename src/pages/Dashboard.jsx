import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import PostCard from '../components/PostCard.jsx';
import { dummyPosts } from '../data/dummy';
import ErrorBoundary from '../components/ErrorBoundary';

const Dashboard = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [filter, setFilter] = useState('semua');
  const [sort, setSort] = useState('terbaru');

  const handleFilterSort = () => {
    let filteredPosts = [...dummyPosts];
    if (filter === 'terjawab') {
      filteredPosts = filteredPosts.filter(post => dummyComments.some(comment => comment.id_postingan === post.id));
    } else if (filter === 'belum-terjawab') {
      filteredPosts = filteredPosts.filter(post => !dummyComments.some(comment => comment.id_postingan === post.id));
    } else if (filter === 'didukung') {
      filteredPosts = filteredPosts.filter(post => dummyInteractions.some(inter => inter.id_postingan === post.id && inter.tipe === 'suka'));
    }

    if (sort === 'populer') {
      filteredPosts.sort((a, b) => {
        const likesA = dummyInteractions.filter(inter => inter.id_postingan === a.id && inter.tipe === 'suka').length;
        const likesB = dummyInteractions.filter(inter => inter.id_postingan === b.id && inter.tipe === 'suka').length;
        return likesB - likesA;
      });
    } else {
      filteredPosts.sort((a, b) => new Date(b.dibuat_pada) - new Date(a.dibuat_pada));
    }

    setPosts(filteredPosts);
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Dashboard</h1>
          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => { setFilter(e.target.value); handleFilterSort(); }}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 bg-gray-50"
            >
              <option value="semua">Semua</option>
              <option value="terjawab">Terjawab</option>
              <option value="belum-terjawab">Belum Terjawab</option>
              <option value="didukung">Didukung</option>
            </select>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); handleFilterSort(); }}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 bg-gray-50"
            >
              <option value="terbaru">Terbaru</option>
              <option value="populer">Populer</option>
            </select>
          </div>
        </div>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Tidak ada postingan</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <ErrorBoundary key={post?.id}>
                <PostCard post={post} />
              </ErrorBoundary>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;