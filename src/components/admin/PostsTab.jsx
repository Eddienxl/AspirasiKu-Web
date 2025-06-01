import { toast } from 'react-toastify';
import { updatePostStatus, deletePost } from '../../services/api';

const PostsTab = ({ 
  posts, 
  setPosts, 
  loading, 
  error,
  getAllPostsAdmin 
}) => {
  const handleUpdateStatus = async (postId, status) => {
    try {
      console.log('Updating post status:', postId, 'to:', status);
      await updatePostStatus(postId, status);
      toast.success(`Status berhasil diubah menjadi ${status}`);

      // Refresh posts data
      const updatedPosts = await getAllPostsAdmin();
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(`Gagal memperbarui status: ${error.message}`);
    }
  };

  const handleDeletePost = async (postId, postTitle) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus postingan "${postTitle}"?\n\nTindakan ini tidak dapat dibatalkan dan akan menghapus postingan secara permanen dari database.`
    );

    if (!confirmed) return;

    try {
      console.log('Deleting post:', postId);
      await deletePost(postId);
      toast.success('Postingan berhasil dihapus');

      // Refresh posts data
      const updatedPosts = await getAllPostsAdmin();
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(`Gagal menghapus postingan: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-white">Kelola Postingan</h2>
      {posts.length === 0 ? (
        <p className="text-white text-lg">Tidak ada postingan</p>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              {/* Post Header */}
              <div className="flex items-start space-x-4 mb-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  {post.penulis?.profile_picture ? (
                    <img
                      src={post.penulis.profile_picture}
                      alt={post.penulis.nama}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-lg">
                      {post.anonim ? '?' : (post.penulis?.nama?.charAt(0)?.toUpperCase() || 'U')}
                    </div>
                  )}
                </div>

                {/* Post Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-gray-800">
                      {post.anonim ? 'Anonim' : (post.penulis?.nama || 'Unknown')}
                    </p>
                    {/* Peninjau Badge */}
                    {!post.anonim && post.penulis?.peran === 'peninjau' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 shadow-sm">
                        <span className="mr-1">🛡️</span>
                        <span>Peninjau</span>
                      </span>
                    )}
                    {/* Category Badge */}
                    {post.kategori && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {post.kategori.nama}
                      </span>
                    )}
                    {/* Status Badge */}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'aktif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {post.status === 'aktif' ? 'Aktif' : 'Terarsip'}
                    </span>
                  </div>
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

              {/* Post Content */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{post.judul}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.konten?.length > 200 
                    ? `${post.konten.substring(0, 200)}...` 
                    : post.konten
                  }
                </p>
              </div>

              {/* Post Stats */}
              <div className="flex items-center space-x-6 mb-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span>👍</span>
                  <span>{post.upvote_count || 0} upvotes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>👎</span>
                  <span>{post.downvote_count || 0} downvotes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>💬</span>
                  <span>{post.comment_count || 0} komentar</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 justify-end">
                <button
                  onClick={() => handleUpdateStatus(post.id, post.status === 'aktif' ? 'terarsip' : 'aktif')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                    post.status === 'aktif'
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {post.status === 'aktif' ? 'Arsipkan' : 'Aktifkan'}
                </button>
                <button
                  onClick={() => handleDeletePost(post.id, post.judul)}
                  className="px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm bg-red-600 text-white hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsTab;
