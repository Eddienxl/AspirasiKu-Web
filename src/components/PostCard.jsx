import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaThumbsUp, FaFlag, FaBookmark } from 'react-icons/fa';
import { dummyCategories } from '../data/dummy';

const PostCard = ({ post }) => {
  const handleInteraction = (tipe) => {
    toast.success(`${tipe.charAt(0).toUpperCase() + tipe.slice(1)} berhasil`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{post?.judul}</h3>
        <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
          {dummyCategories.find(cat => cat.id === post?.id_kategori)?.nama || 'Tidak Diketahui'}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-2">
        Oleh: {post?.anonim ? 'Anonim' : post?.id_penulis} | {new Date(post?.dibuat_pada).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-4 line-clamp-2">{post?.konten}</p>
      <div className="flex space-x-4 mb-4">
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
      <Link
        to={`/post/${post?.id}`}
        className="inline-block text-accent font-medium hover:underline transition-colors duration-200"
      >
        Baca Selengkapnya
      </Link>
    </div>
  );
};

export default PostCard;