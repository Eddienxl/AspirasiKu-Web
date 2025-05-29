import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaThumbsUp, FaFlag, FaThumbsDown } from 'react-icons/fa';
import { createPostInteraction } from '../services/api';

const PostCard = ({ post, onInteraction }) => {

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

      // Refresh data jika callback tersedia
      if (onInteraction) {
        onInteraction();
      }
    } catch (err) {
      toast.error(`Gagal: ${err.message}`);
    }
  };



  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200 hover:border-green-300 group animate-fade-in">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-green-700 transition-colors duration-200">
          {post?.judul}
        </h3>
      </div>

      {/* Meta Info */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {post?.anonim ? 'A' : (post?.penulis?.nama?.[0] || 'U')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 truncate">
            {post?.anonim ? 'Anonim' : (post?.penulis?.nama || 'Unknown')}
          </p>
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
            className="flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 group/btn text-xs sm:text-sm"
          >
            <FaThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform duration-200" />
            <span className="font-medium">{post?.upvote_count || 0}</span>
          </button>
          <button
            onClick={() => handleInteraction('downvote')}
            className="flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 group/btn text-xs sm:text-sm"
          >
            <FaThumbsDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform duration-200" />
            <span className="font-medium">{post?.downvote_count || 0}</span>
          </button>
          <button
            onClick={() => handleInteraction('lapor')}
            className="flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 text-xs sm:text-sm"
          >
            <FaFlag className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium hidden xs:inline">Lapor</span>
          </button>
        </div>

        {/* Read Button */}
        <Link
          to={`/post/${post?.id}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm whitespace-nowrap"
        >
          📖 Baca
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
