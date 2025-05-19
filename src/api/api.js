// src/api.js

const BASE_URL = 'http://localhost:5000/api';

export async function fetchPengguna() {
  const res = await fetch(`${BASE_URL}/pengguna`);
  if (!res.ok) throw new Error('Gagal mengambil data pengguna');
  return res.json();
}

export async function fetchPostingan() {
  const res = await fetch(`${BASE_URL}/postingan`);
  if (!res.ok) throw new Error('Gagal mengambil data postingan');
  return res.json();
}

export async function fetchInteraksi() {
  const res = await fetch(`${BASE_URL}/interaksi`);
  if (!res.ok) throw new Error('Gagal mengambil data interaksi');
  return res.json();
}

export async function fetchKategori() {
  const res = await fetch(`${BASE_URL}/kategori`);
  if (!res.ok) throw new Error('Gagal mengambil data kategori');
  return res.json();
}

export async function fetchKomentar() {
  const res = await fetch(`${BASE_URL}/komentar`);
  if (!res.ok) throw new Error('Gagal mengambil data komentar');
  return res.json();
}

export async function login(credentials) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error('Login gagal');
  return res.json(); // biasanya berisi token dan user info
}

export async function register(data) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Registrasi gagal');
  return res.json();
}
