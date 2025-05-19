// src/services/api.js
import { getToken, removeToken } from '../utils/auth';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const login = async (email, kata_sandi) =>
  apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, kata_sandi }),
  });

export const register = async (nim, nama, email, kata_sandi) =>
  apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nim, nama, email, kata_sandi }),
  });

export const getAllPosts = async (filter = 'semua', sort = 'terbaru') =>
  apiFetch(`/api/postingan?filter=${filter}&sort=${sort}`);

export const getPostById = async (id) => apiFetch(`/api/postingan/${id}`);

export const createPost = async (post) =>
  apiFetch('/api/postingan', {
    method: 'POST',
    body: JSON.stringify(post),
  });

export const getCategories = async () => apiFetch('/api/kategori');

export const createComment = async (comment) =>
  apiFetch('/api/komentar', {
    method: 'POST',
    body: JSON.stringify(comment),
  });

export const getCommentsByPost = async (postId) =>
  apiFetch(`/api/komentar?postId=${postId}`);

export const createInteraction = async (interaction) =>
  apiFetch('/api/interaksi', {
    method: 'POST',
    body: JSON.stringify(interaction),
  });

export const getUserProfile = async (username) =>
  apiFetch(`/api/pengguna/${username}`);

export const getUserPosts = async (username) =>
  apiFetch(`/api/postingan?penulis=${username}`);

export const getNotifications = async () => apiFetch('/api/notifikasi');

export const getAllReports = async () => apiFetch('/api/interaksi?tipe=lapor');

export const updatePostStatus = async (id, status) =>
  apiFetch(`/api/postingan/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

export const deleteComment = async (id) =>
  apiFetch(`/api/komentar/${id}`, {
    method: 'DELETE',
  });

export const getCurrentUser = async () => apiFetch('/api/pengguna/me');