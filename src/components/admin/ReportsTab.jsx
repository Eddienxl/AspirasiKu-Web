import { toast } from 'react-toastify';
import { updateReportStatus, updatePostStatus, deletePost, deleteComment } from '../../services/api';

const ReportsTab = ({
  reports,
  setReports,
  loading,
  error,
  getAllReports
}) => {
  const handleIgnoreReport = async (reportId) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin mengabaikan laporan ini?\n\nLaporan akan dihapus dari daftar tanpa mengambil tindakan pada konten yang dilaporkan.`
    );
    
    if (!confirmed) return;

    try {
      console.log('Ignoring report:', reportId);
      await updateReportStatus(reportId, 'diabaikan');
      toast.success('Laporan berhasil diabaikan');
      
      // Remove the report from reports list immediately
      setReports(prevReports => prevReports.filter(report => report?.id !== reportId));
    } catch (error) {
      console.error('Error ignoring report:', error);
      toast.error(`Gagal mengabaikan laporan: ${error.message}`);
    }
  };

  const handleUpdateStatus = async (postId, status) => {
    try {
      console.log('Updating post status:', postId, 'to:', status);
      await updatePostStatus(postId, status);
      toast.success(`Status berhasil diubah menjadi ${status}`);

      // Remove all reports related to this post when archived
      if (status === 'terarsip') {
        setReports(prevReports => prevReports.filter(report => report?.id_postingan !== postId));
      } else {
        // Refresh reports data for other status changes
        const updatedReports = await getAllReports();
        setReports(updatedReports);
      }
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

      // Remove all reports related to this post immediately
      setReports(prevReports => prevReports.filter(report => report?.id_postingan !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(`Gagal menghapus postingan: ${error.message}`);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      toast.success('Komentar berhasil dihapus');
      setReports(prevReports => prevReports.filter(report => report?.id_komentar !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error(`Gagal menghapus komentar: ${error.message}`);
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
      <h2 className="text-2xl font-semibold mb-6 text-white">Laporan</h2>
      {reports.length === 0 ? (
        <p className="text-white text-lg">Belum ada laporan</p>
      ) : (
        reports.map(report => (
          <div key={report?.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-4 border-l-4 border-red-500">
            {/* Report Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    📢 LAPORAN
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(report?.dibuat_pada).toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Reporter Information */}
                <div className="flex items-start space-x-3 mb-4">
                  {/* Reporter Avatar */}
                  <div className="flex-shrink-0">
                    {report?.pengguna?.profile_picture ? (
                      <img
                        src={report.pengguna.profile_picture}
                        alt={report.pengguna.nama}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                        {report?.pengguna?.nama?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>
                  
                  {/* Reporter Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-gray-800">
                        Dilaporkan oleh: {report?.pengguna?.nama || 'Pengguna Anonim'}
                      </p>
                      {report?.pengguna?.peran === 'peninjau' && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                          <span className="mr-1">🛡️</span>
                          <span>Peninjau</span>
                        </span>
                      )}
                    </div>
                    {report?.alasan_laporan && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Alasan:</span> {report.alasan_laporan}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reported Content */}
            {report?.id_postingan && report?.postingan && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    📝 POSTINGAN
                  </span>
                  {report.postingan.kategori && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {report.postingan.kategori.nama}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-gray-800 mb-3">{report.postingan.judul}</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {report.postingan.konten?.length > 200 
                    ? `${report.postingan.konten.substring(0, 200)}...` 
                    : report.postingan.konten
                  }
                </p>
                
                {/* Post Author Info */}
                <div className="flex items-center space-x-2">
                  {/* Author Avatar */}
                  {report.postingan.penulis?.profile_picture ? (
                    <img
                      src={report.postingan.penulis.profile_picture}
                      alt={report.postingan.penulis.nama}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-xs">
                      {report.postingan.anonim ? '?' : (report.postingan.penulis?.nama?.charAt(0)?.toUpperCase() || 'U')}
                    </div>
                  )}
                  
                  {/* Author Details */}
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="font-medium">
                      {report.postingan.anonim ? 'Anonim' : (report.postingan.penulis?.nama || 'Unknown')}
                    </span>
                    {!report.postingan.anonim && report.postingan.penulis?.peran === 'peninjau' && (
                      <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                        <span className="mr-1">🛡️</span>
                        <span>Peninjau</span>
                      </span>
                    )}
                    <span>•</span>
                    <span>{new Date(report.postingan.dibuat_pada).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </div>
            )}

            {report?.id_komentar && report?.komentar && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                    💬 KOMENTAR
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{report.komentar.konten}</p>
                
                {/* Comment Author Info */}
                <div className="flex items-center space-x-2">
                  {/* Author Avatar */}
                  {report.komentar.penulis?.profile_picture ? (
                    <img
                      src={report.komentar.penulis.profile_picture}
                      alt={report.komentar.penulis.nama}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-xs">
                      {report.komentar.anonim ? '?' : (report.komentar.penulis?.nama?.charAt(0)?.toUpperCase() || 'U')}
                    </div>
                  )}
                  
                  {/* Author Details */}
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="font-medium">
                      {report.komentar.anonim ? 'Anonim' : (report.komentar.penulis?.nama || 'Unknown')}
                    </span>
                    {!report.komentar.anonim && report.komentar.penulis?.peran === 'peninjau' && (
                      <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                        <span className="mr-1">🛡️</span>
                        <span>Peninjau</span>
                      </span>
                    )}
                    <span>•</span>
                    <span>{new Date(report.komentar.dibuat_pada).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Abaikan Button - Always available */}
              <button
                onClick={() => handleIgnoreReport(report?.id)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 text-sm sm:text-base font-medium"
              >
                Abaikan
              </button>

              {report?.id_postingan && (
                <>
                  <button
                    onClick={() => handleUpdateStatus(report?.id_postingan, 'terarsip')}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 text-sm sm:text-base font-medium"
                  >
                    Arsipkan Postingan
                  </button>
                  <button
                    onClick={() => handleDeletePost(report?.id_postingan, report?.postingan?.judul)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 text-sm sm:text-base font-medium"
                  >
                    Hapus Postingan
                  </button>
                </>
              )}
              {report?.id_komentar && (
                <button
                  onClick={() => handleDeleteComment(report?.id_komentar)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto font-medium"
                >
                  Hapus Komentar
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportsTab;
