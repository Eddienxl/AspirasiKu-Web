import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaThumbsUp, FaFlag, FaThumbsDown } from 'react-icons/fa';
import { createPostInteraction } from '../services/api';
import Avatar from './Avatar';

// Helper function to get category emoji
const getCategoryEmoji = (categoryName) => {
  const emojiMap = {
    'Fasilitas Kampus': '🏫',
    'Akademik': '📚',
    'Kesejahteraan Mahasiswa': '💝',
    'Kegiatan Kemahasiswaan': '🎭',
    'Sarana dan Prasarana Digital': '💻',
    'Keamanan dan Ketertiban': '🛡️',
    'Lingkungan dan Kebersihan': '🌱',
    'Transportasi dan Akses': '🚌',
    'Kebijakan dan Administrasi': '📋',
    'Saran dan Inovasi': '💡'
  };
  return emojiMap[categoryName] || '📝';
};

const PostCard = ({ post, onInteraction }) => {
  const navigate = useNavigate();

  const handleInteraction = async (tipe) => {
    try {
      const response = await createPostInteraction({
        id_postingan: post.id,
        tipe: tipe
      });

      // Handle toggle response
      if (response.action === 'removed') {
        const messages = {
          'upvote': 'Upvote dihapus',
          'downvote': 'Downvote dihapus'
        };
        toast.info(messages[tipe] || 'Interaksi dihapus');
      } else {
        const messages = {
          'upvote': 'Upvote berhasil',
          'downvote': 'Downvote berhasil'
        };
        toast.success(messages[tipe] || 'Interaksi berhasil');
      }

      // Refresh data jika callback tersedia
      if (onInteraction) {
        onInteraction();
      }
    } catch (err) {
      toast.error(`Gagal: ${err.message}`);
    }
  };

  const handleReportClick = () => {
    // Redirect to PostDetail page for reporting
    navigate(`/post/${post.id}?action=report`);
  };



  return (
    <div className="card-glass p-6 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:border-primary-300 group animate-fade-in transform hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-primary-700 transition-colors duration-300 mb-3">
            {post?.judul}
          </h3>

          {/* Category Badge */}
          {post?.kategori && (
            <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-primary-100 to-emerald-100 text-primary-700 rounded-full text-sm font-medium border border-primary-200 shadow-sm">
              <span className="mr-1">{getCategoryEmoji(post.kategori.nama)}</span>
              <span>{post.kategori.nama}</span>
            </div>
          )}
        </div>

      {/* Meta Info */}
      <div className="flex items-center space-x-2 mb-3">
        {post?.anonim ? (
          <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
            <span className="text-white text-xs font-bold">A</span>
          </div>
        ) : (
          <Avatar user={post?.penulis} size="sm" className="ring-2 ring-white" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-700 truncate">
              {post?.anonim ? 'Anonim' : (post?.penulis?.nama || 'Unknown')}
            </p>
            {/* Peninjau Badge */}
            {!post?.anonim && post?.penulis?.peran === 'peninjau' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 shadow-sm">
                <span className="mr-1">🛡️</span>
                <span>Peninjau</span>
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {new Date(post?.dibuat_pada).toLocaleString('id-ID', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{post?.konten}</p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Vote and Report Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleInteraction('upvote')}
            className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 hover:from-green-100 hover:to-emerald-100 hover:text-green-700 transition-all duration-300 group/btn text-xs sm:text-sm border border-green-200 hover:border-green-300 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            <FaThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform duration-300" />
            <span className="font-semibold">{post?.upvote_count || 0}</span>
          </button>
          <button
            onClick={() => handleInteraction('downvote')}
            className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 text-red-500 hover:from-red-100 hover:to-pink-100 hover:text-red-600 transition-all duration-300 group/btn text-xs sm:text-sm border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            <FaThumbsDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform duration-300" />
            <span className="font-semibold">{post?.downvote_count || 0}</span>
          </button>
          <button
            onClick={handleReportClick}
            className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-500 hover:from-orange-100 hover:to-yellow-100 hover:text-orange-600 transition-all duration-300 text-xs sm:text-sm border border-orange-200 hover:border-orange-300 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            <FaFlag className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium hidden xs:inline">Lapor</span>
          </button>
        </div>

        {/* Read Button */}
        <Link
          to={`/post/${post?.id}`}
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm whitespace-nowrap group/read relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/read:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center space-x-2">
            <span>📖</span>
            <span>Baca</span>
          </span>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
