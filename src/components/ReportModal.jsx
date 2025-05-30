import { useState } from 'react';
import { FaTimes, FaFlag, FaExclamationTriangle } from 'react-icons/fa';

const ReportModal = ({ isOpen, onClose, onSubmit, type = 'post' }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportReasons = [
    {
      value: 'konten-tidak-pantas',
      label: '🚫 Konten tidak pantas/vulgar',
      description: 'Konten mengandung unsur vulgar, tidak senonoh, atau tidak pantas'
    },
    {
      value: 'spam-berulang',
      label: '📢 Spam atau konten berulang',
      description: 'Konten yang diposting berulang kali atau merupakan spam'
    },
    {
      value: 'informasi-palsu',
      label: '❌ Informasi palsu/menyesatkan',
      description: 'Konten mengandung informasi yang tidak benar atau menyesatkan'
    },
    {
      value: 'ujaran-kebencian',
      label: '💢 Ujaran kebencian/diskriminasi',
      description: 'Konten mengandung ujaran kebencian atau diskriminasi'
    },
    {
      value: 'melanggar-aturan',
      label: '⚖️ Melanggar aturan kampus',
      description: 'Konten melanggar aturan atau kebijakan kampus'
    },
    {
      value: 'lainnya',
      label: '📝 Lainnya',
      description: 'Alasan lain yang tidak tercantum di atas'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedReason) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const reasonData = reportReasons.find(r => r.value === selectedReason);
      await onSubmit(reasonData.label);
      onClose();
      setSelectedReason('');
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <FaFlag className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Laporkan {type === 'post' ? 'Postingan' : 'Komentar'}
              </h3>
              <p className="text-sm text-gray-600">Pilih alasan pelaporan</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <FaExclamationTriangle className="text-amber-500" />
              <p className="text-sm text-gray-700">
                Pilih alasan yang paling sesuai untuk melaporkan {type === 'post' ? 'postingan' : 'komentar'} ini:
              </p>
            </div>

            <div className="space-y-3">
              {reportReasons.map((reason) => (
                <label
                  key={reason.value}
                  className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-red-300 hover:bg-red-50 ${
                    selectedReason === reason.value
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason.value}
                      checked={selectedReason === reason.value}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="mt-1 text-red-500 focus:ring-red-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 mb-1">
                        {reason.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {reason.description}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!selectedReason || isSubmitting}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedReason && !isSubmitting
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transform hover:scale-105 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Melaporkan...</span>
                </div>
              ) : (
                '🚨 Kirim Laporan'
              )}
            </button>
          </div>
        </form>

        {/* Warning */}
        <div className="px-6 pb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start space-x-2">
              <FaExclamationTriangle className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Peringatan:</p>
                <p>Laporan palsu atau penyalahgunaan fitur pelaporan dapat mengakibatkan tindakan terhadap akun Anda.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
