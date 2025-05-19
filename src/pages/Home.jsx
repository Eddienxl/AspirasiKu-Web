import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import PostCard from '../components/PostCard.jsx';
import { dummyPosts } from '../data/dummy';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
  const [posts] = useState(dummyPosts.slice(0, 6));

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <section className="relative bg-primary text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-800 opacity-90"></div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-5xl font-bold mb-4 animate-fadeIn">Selamat Datang di AspirasiKu</h1>
            <p className="text-lg mb-8 opacity-90">Sampaikan aspirasi dan pertanyaan Anda untuk UIN Suska Riau</p>
            <Link
              to="/dashboard"
              className="inline-block bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
            >
              Lihat Aspirasi
            </Link>
          </div>
        </section>
        <section className="container mx-auto py-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Postingan Terbaru</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <ErrorBoundary key={post?.id}>
                <PostCard post={post} />
              </ErrorBoundary>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;