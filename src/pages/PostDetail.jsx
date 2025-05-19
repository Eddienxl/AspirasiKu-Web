import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { toast } from 'react-toastify';
import { dummyPosts, dummyComments, dummyCategories } from '../data/dummy';
import { FaThumbsUp, FaFlag, FaBookmark } from 'react-icons/fa';

const PostDetail = () => {
  const { id } = useParams();
  const post = dummyPosts.find(p => p.id === parseInt(id));
  const [comments, setComments] = useState(dummyComments.filter(c => c.id_postingan === parseInt(id)));
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newId = comments.length + 1;
    setComments([...comments, {
      id: newId,
      id_postingan: parseInt(id),
      id_penulis: "user1",
      konten: newComment,
      anonim: false,
      dibuat_pada: new Date().toISOString(),
    }]);
    setNewComment('');
    toast.success('Komentar berhasil ditambahkan');
  };

  const handleInteraction = (tipe) => {
    toast.success(`${tipe.charAt(0).toUpperCase() + tipe.slice(1)} berhasil`);
  };

  if (!post) return <div className="text-center p-4 text-gray-600">Postingan tidak ditemukan</div>;

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{post?.judul}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm bg-primary text-white px-3 py-1 rounded-full">
              {dummyCategories.find(cat => cat.id === post?.id_kategori)?.nama}
            </span>
            <p className="text-gray-600 text-sm">
              Oleh: {post?.anonim ? 'Anonim' : post?.id_penulis} | {new Date(post?.dibuat_pada).toLocaleString()}
            </p>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">{post?.konten}</p>
          <div className="flex space-x-6 mb-6">
            <button
              onClick={() => handleInteraction('suka')}
              className="flex items-center space-x-1 text-accent hover:text-yellow-600 transition-colors duration-200"
            >
              <FaThumbsUp /> <span>Suka</span>
            </button>
            <button
              onClick={() => handleInteraction('lapor')}
              className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <FaFlag /> <span>Lapor</span>
            </button>
            <button
              onClick={() => handleInteraction('simpan')}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <FaBookmark /> <span>Simpan</span>
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Komentar</h2>
        {comments.length === 0 ? (
          <p className="text-gray-600 text-lg">Belum ada komentar</p>
        ) : (
          comments.map(comment => (
            <div key={comment?.id} className="bg-gray-50 p-6 rounded-xl mb-4 shadow-sm">
              <p className="text-gray-700 mb-2">{comment?.konten}</p>
              <p className="text-gray-500 text-sm">
                Oleh: {comment?.anonim ? 'Anonim' : comment?.id_penulis} |{' '}
                {new Date(comment?.dibuat_pada).toLocaleString()}
              </p>
            </div>
          ))
        )}
        <form onSubmit={handleCommentSubmit} className="mt-8 bg-white p-6 rounded-2xl shadow-xl">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            rows="4"
            placeholder="Tulis komentar..."
            required
          />
          <button
            type="submit"
            className="mt-4 bg-primary text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Kirim Komentar
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;