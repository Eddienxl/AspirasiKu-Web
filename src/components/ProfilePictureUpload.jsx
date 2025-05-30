import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaCamera, FaSpinner, FaUser } from 'react-icons/fa';
import { uploadProfilePicture } from '../services/api';

const ProfilePictureUpload = ({ currentUser, onUploadSuccess }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Validate file type
    if (file.type !== 'image/jpeg') {
      toast.error('Hanya file JPG yang diperbolehkan');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }

    setSelectedImage(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Data = e.target.result;
          const response = await uploadProfilePicture(base64Data);
          
          toast.success('Foto profil berhasil diupload!');
          setSelectedImage(null);
          setPreviewUrl(null);
          
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

          // Notify parent component
          if (onUploadSuccess) {
            onUploadSuccess(response.user);
          }
        } catch (error) {
          toast.error(`Gagal upload foto: ${error.message}`);
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(selectedImage);
    } catch (error) {
      toast.error(`Gagal upload foto: ${error.message}`);
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCurrentProfilePicture = () => {
    if (previewUrl) return previewUrl;
    if (currentUser?.profile_picture) return currentUser.profile_picture;
    return null;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Picture Display */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-200 shadow-lg">
          {getCurrentProfilePicture() ? (
            <img
              src={getCurrentProfilePicture()}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center">
              <FaUser className="text-white text-4xl" />
            </div>
          )}
        </div>
        
        {/* Camera Icon Overlay */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="absolute bottom-2 right-2 bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          <FaCamera className="text-sm" />
        </button>
      </div>

      {/* File Input (Hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Controls */}
      {selectedImage && (
        <div className="flex flex-col items-center space-y-3">
          <p className="text-sm text-gray-600 text-center">
            File dipilih: {selectedImage.name}
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              {uploading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <span>Upload Foto</span>
              )}
            </button>
            
            <button
              onClick={handleCancel}
              disabled={uploading}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Klik ikon kamera untuk mengubah foto profil
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Format: JPG, Maksimal: 5MB
        </p>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
