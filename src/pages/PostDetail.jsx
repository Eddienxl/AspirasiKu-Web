import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import { toast } from 'react-toastify';
import { getPostById, createComment, getCommentsByPost, createPostInteraction } from '../services/api';
import { FaThumbsUp, FaFlag, FaThumbsDown, FaUser } from 'react-icons/fa';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postData, commentsData] = await Promise.all([
          getPostById(id),
          getCommentsByPost(id)
        ]);
        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const commentData = {
        id_postingan: parseInt(id),
        konten: newComment,
        anonim: false
      };

      const response = await createComment(commentData);
      setComments([...comments, response]);
      setNewComment('');
      toast.success('Komentar berhasil ditambahkan');
    } catch (err) {
      toast.error(`Gagal menambahkan komentar: ${err.message}`);
    }
  };

  const handleInteraction = async (tipe) => {
    try {
      const response = await createPostInteraction({
        id_postingan: parseInt(id),
        tipe: tipe
      });

      // Handle toggle response
      if (response.action === 'removed') {
        const messages = {
          'upvote': 'Upvote dihapus',
          'downvote': 'Downvote dihapus',
          'lapor': 'Laporan dibatalkan'
        };
        toast.info(messages[tipe] || 'Interaksi dihapus');
      } else {
        const messages = {
          'upvote': 'Upvote berhasil',
          'downvote': 'Downvote berhasil',
          'lapor': 'Laporan berhasil dikirim'
        };
        toast.success(messages[tipe] || 'Interaksi berhasil');
      }

      // Refresh post data untuk update jumlah upvote/downvote
      const updatedPost = await getPostById(id);
      setPost(updatedPost);
    } catch (err) {
      toast.error(`Gagal: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 lg:ml-72">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
              <p className="text-gray-600 font-medium">Memuat postingan...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 lg:ml-72">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto text-center">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <p className="text-red-600 font-medium">{error || 'Postingan tidak ditemukan'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 lg:ml-72">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Post Content */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-soft border border-primary-100 mb-8 animate-fade-in">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 leading-tight">{post.judul}</h1>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {post.anonim ? 'A' : (post.penulis?.nama?.[0] || 'U')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {post.anonim ? 'Anonim' : (post.penulis?.nama || 'Unknown')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.dibuat_pada).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed text-lg">{post.konten}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-primary-100">
                <button
                  onClick={() => handleInteraction('upvote')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 group"
                >
                  <FaThumbsUp className="group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{post.upvote_count || 0}</span>
                </button>
                <button
                  onClick={() => handleInteraction('downvote')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 group"
                >
                  <FaThumbsDown className="group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{post.downvote_count || 0}</span>
                </button>
                <button
                  onClick={() => handleInteraction('lapor')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600 transition-all duration-200"
                >
                  <FaFlag />
                  <span className="font-medium">Laporkan</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-soft border border-primary-100 p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FaUser className="mr-3 text-primary-600" />
                Komentar
              </h2>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-primary-50 resize-none"
                  placeholder="Tulis komentar Anda..."
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  className="mt-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:from-primary-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  💬 Kirim Komentar
                </button>
              </form>

              {/* Comments List */}
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">💬</div>
                  <p className="text-gray-600 font-medium">Belum ada komentar</p>
                  <p className="text-gray-500 text-sm mt-2">Jadilah yang pertama untuk berkomentar!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-xl border border-primary-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white text-xs font-bold">
                            {comment.anonim ? 'A' : (comment.id_penulis?.toString()?.[0] || 'U')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-gray-800">
                              {comment.anonim ? 'Anonim' : comment.id_penulis}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(comment.dibuat_pada).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{comment.konten}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostDetail;
