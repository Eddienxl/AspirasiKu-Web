import { getToken, removeToken } from '../utils/auth';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-platform.up.railway.app';

const apiFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      window.location.href = '/login';
    }

    // Parse error message from response
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // If can't parse JSON, use default message
    }

    throw new Error(errorMessage);
  }

  return response.json();
};

export const login = async (email, kata_sandi) =>
  apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, kata_sandi }),
  });

export const register = async (nim, nama, email, kata_sandi, peran = 'pengguna', kodeRahasia = '') =>
  apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nim, nama, email, kata_sandi, peran, kodeRahasia }),
  });

export const getAllPosts = async (filter = 'semua', sort = 'populer') =>
  apiFetch(`/api/postingan?filter=${filter}&sort=${sort}`);

export const getPostById = async (id) => apiFetch(`/api/postingan/${id}`);

export const createPost = async (post) => {
  // Backend now properly handles id_kategori, so no need for workarounds
  return apiFetch('/api/postingan', {
    method: 'POST',
    body: JSON.stringify(post),
  });
};

export const getCategories = async () => apiFetch('/api/kategori');

export const createComment = async (comment) =>
  apiFetch('/api/komentar', {
    method: 'POST',
    body: JSON.stringify(comment),
  });

// Comments - Backend expects different endpoint structure
export const getCommentsByPost = async (postId) => {
  // Backend doesn't have this specific endpoint, get all comments and filter
  const allComments = await apiFetch('/api/komentar');
  return allComments.filter(comment => comment.id_postingan === parseInt(postId));
};

// Interactions - Backend has specific endpoints for postingan and komentar
export const createPostInteraction = async (interaction) =>
  apiFetch('/api/interaksi/postingan', {
    method: 'POST',
    body: JSON.stringify(interaction),
  });

export const createCommentInteraction = async (interaction) =>
  apiFetch('/api/interaksi/komentar', {
    method: 'POST',
    body: JSON.stringify(interaction),
  });

// User Profile - Backend expects user ID, not username
export const getUserProfile = async (userId) =>
  apiFetch(`/api/pengguna/${userId}`);

// User Posts - Use backend's specific endpoint
export const getUserPosts = async (userId) =>
  apiFetch(`/api/pengguna/${userId}/postingan`);

export const getCurrentUserPosts = async () => {
  const token = getToken();
  if (!token) {
    throw new Error('No token found');
  }

  try {
    // Decode JWT token to get user ID
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;

    if (!userId) {
      throw new Error('Invalid token: no user ID found');
    }

    // Use backend's specific endpoint for user posts
    return await apiFetch(`/api/pengguna/${userId}/postingan`);
  } catch (error) {
    console.error('Error getting current user posts:', error);
    throw new Error('Failed to get current user posts');
  }
};

export const getNotifications = async () => apiFetch('/api/notifikasi');

// Reports - Get all interactions and filter for reports with detailed information
export const getAllReports = async () => {
  const allInteractions = await apiFetch('/api/interaksi', {
    headers: {
      'x-admin-request': 'true'
    }
  });
  return allInteractions.filter(interaction => interaction.tipe === 'lapor');
};

// Update report status (ignore, resolve, etc.)
export const updateReportStatus = async (reportId, status) =>
  apiFetch(`/api/interaksi/${reportId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

// Post management
export const updatePostStatus = async (id, status) =>
  apiFetch(`/api/postingan/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

export const deletePost = async (id) =>
  apiFetch(`/api/postingan/${id}`, {
    method: 'DELETE',
  });

export const updatePost = async (id, postData) =>
  apiFetch(`/api/postingan/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  });

// Admin-specific API calls (includes archived posts)
export const getAllPostsAdmin = async () =>
  apiFetch('/api/postingan', {
    headers: {
      'x-admin-request': 'true'
    }
  });

// Comment management
export const deleteComment = async (id) =>
  apiFetch(`/api/komentar/${id}`, {
    method: 'DELETE',
  });

export const updateComment = async (id, commentData) =>
  apiFetch(`/api/komentar/${id}`, {
    method: 'PUT',
    body: JSON.stringify(commentData),
  });

export const getCurrentUser = async () => {
  const token = getToken();
  if (!token) {
    throw new Error('No token found');
  }

  try {
    // Use backend's profile endpoint
    return await apiFetch('/api/auth/profile');
  } catch (error) {
    console.error('Error getting current user:', error);
    throw new Error('Failed to get current user');
  }
};

// Additional API functions to match backend capabilities
export const changePassword = async (oldPassword, newPassword) =>
  apiFetch('/api/auth/ubah-kata-sandi', {
    method: 'PUT',
    body: JSON.stringify({
      kata_sandi_lama: oldPassword,
      kata_sandi_baru: newPassword
    }),
  });

export const updateProfile = async (profileData) =>
  apiFetch('/api/auth/ubah-profil', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });

// Notification management
export const markNotificationAsRead = async (id) =>
  apiFetch(`/api/notifikasi/${id}/read`, {
    method: 'PUT',
  });

export const markAllNotificationsAsRead = async () =>
  apiFetch('/api/notifikasi/read-all', {
    method: 'PUT',
  });

// Profile picture upload
export const uploadProfilePicture = async (profilePictureBase64) =>
  apiFetch('/api/auth/upload-profile-picture', {
    method: 'PUT',
    body: JSON.stringify({ profile_picture: profilePictureBase64 }),
  });

// Category management
export const updateCategory = async (categoryId, categoryData) =>
  apiFetch(`/api/kategori/${categoryId}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  });
