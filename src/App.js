import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthGuard from './components/auth/AuthGuard';
import Header from './components/common/Header';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Exercices from './pages/Exercices';
import ExercicePage from './pages/ExercicePage';
import Home from './pages/Home';
import Admin from './pages/Admin';

// Exemple de composant Dashboard protégé
const Dashboard = () => (
  <div style={{ padding: 32 }}>
    <h2>Tableau de bord</h2>
    <p>Bienvenue, vous êtes connecté !</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/exercices" element={<Exercices />} />
          <Route path="/exercices/:id" element={<ExercicePage />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard>
                <Admin />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
