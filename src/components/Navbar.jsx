import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Mencari: ${searchTerm}`);
    // Nanti bisa diganti dengan navigasi ke halaman hasil pencarian
  };

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          AspirasiKu
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse${expanded ? ' show' : ''}`}
          id="navbarSupportedContent"
        >
          <form
            className="d-flex mx-auto my-2 my-md-0"
            onSubmit={handleSearchSubmit}
            style={{ maxWidth: '400px', width: '100%' }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cari aspirasi..."
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="btn btn-light" type="submit">
              Cari
            </button>
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => setExpanded(false)}
                title="Home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-link"
                onClick={() => setExpanded(false)}
                title="Profil"
              >
                Profil
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => alert('Logout belum diimplementasikan')}
                className="btn btn-link nav-link"
                title="Logout"
                style={{ cursor: 'pointer' }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
