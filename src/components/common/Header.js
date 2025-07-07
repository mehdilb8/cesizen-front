import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false); // Fermer le menu après déconnexion
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span role="img" aria-label="zen">🧘‍♂️</span> CESIZen
        </Link>
        
        {/* Bouton menu hamburger */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={isMenuOpen ? 'active' : ''}>
          <Link to="/" onClick={closeMenu}>Accueil</Link>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/exercices" onClick={closeMenu}>Exercices</Link>
          <Link to="/dashboard" onClick={closeMenu}>Tableau de bord</Link>
          {user && user.id_role === 2 && (
            <Link to="/admin" style={{ textDecoration: 'none', color: '#d32f2f', fontWeight: 'bold' }}>Admin</Link>
          )}
        </nav>

        <div className={`user-info ${isMenuOpen ? 'active' : ''}`}>
          {user ? (
            <>
              <span>
                {user.prenom} {user.nom}
              </span>
              <button onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Connexion</Link>
              <Link to="/register" onClick={closeMenu}>Inscription</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;