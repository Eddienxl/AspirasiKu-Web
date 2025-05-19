// src/pages/Home.jsx
import { useState, useEffect } from 'react'

const dummyPosts = [
  {
    id: 1,
    user: { username: 'ahmadf', name: 'Ahmad Fadli' },
    content: 'Saya berharap kampus bisa menyediakan ruang baca yang nyaman untuk mahasiswa.',
    createdAt: '2025-05-15T10:00:00Z',
  },
  {
    id: 2,
    user: { username: 'syukri', name: 'Syukri Ihsan' },
    content: 'Perlu adanya fasilitas olahraga yang lebih lengkap di lingkungan kampus.',
    createdAt: '2025-05-16T08:30:00Z',
  },
]

function formatDate(isoString) {
  const date = new Date(isoString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Simulasi fetch data, nanti diganti fetch dari backend
    setTimeout(() => {
      setPosts(dummyPosts)
    }, 500)
  }, [])

  return (
    <div className="container mt-4">
      <h1 className="mb-4">AspirasiKu - Home</h1>
      {posts.length === 0 ? (
        <p className="text-center text-muted">Memuat aspirasi...</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="mb-4 p-3 bg-white rounded shadow-sm border"
            style={{ cursor: 'pointer', transition: 'box-shadow 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div className="d-flex align-items-center mb-2">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                style={{ width: 40, height: 40, fontWeight: 'bold', fontSize: '1.25rem' }}
              >
                {post.user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="mb-0 fw-semibold">{post.user.name}</p>
                <small className="text-muted">{formatDate(post.createdAt)}</small>
              </div>
            </div>
            <p className="mb-0">{post.content}</p>
          </div>
        ))
      )}
    </div>
  )
}
