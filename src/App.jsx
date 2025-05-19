import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PostDetail from './pages/PostDetail.jsx';
import AddPost from './pages/AddPost.jsx';
import Profile from './pages/Profile.jsx';
import Notifications from './pages/Notifications.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/ajukan" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
        <Route path="/profil/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/notifikasi" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="pengelola"><AdminPanel /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;