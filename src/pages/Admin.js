import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UserManagement from '../components/admin/UserManagement';
import { getAdminStats } from '../services/adminService';

// Tableau de bord admin avec vraies statistiques
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    utilisateurs: { total: 0, actifs: 0, admins: 0, nouveaux_cette_semaine: 0 },
    articles: { total: 0, publies: 0, brouillons: 0, nouveaux_cette_semaine: 0 },
    exercices: { total: 0, actifs: 0 },
    sessions: { total: 0, cette_semaine: 0, ce_mois: 0, duree_moyenne: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Chargement des statistiques...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: '#388e3c', marginBottom: 16 }}>Tableau de bord administrateur</h2>
      
      {error && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: 12, borderRadius: 6, marginBottom: 16 }}>
          {error}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 24 }}>
        {/* Carte Utilisateurs */}
        <div style={{ background: '#e8f5e9', padding: 20, borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#2e7d32' }}>👥 Utilisateurs</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold', color: '#388e3c', margin: '0 0 8px 0' }}>
            {stats.utilisateurs.total}
          </p>
          <div style={{ fontSize: 14, color: '#4caf50' }}>
            <div>✅ Actifs: {stats.utilisateurs.actifs}</div>
            <div>👑 Admins: {stats.utilisateurs.admins}</div>
            <div>🆕 Cette semaine: {stats.utilisateurs.nouveaux_cette_semaine}</div>
          </div>
        </div>

        {/* Carte Articles */}
        <div style={{ background: '#fff3e0', padding: 20, borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#ef6c00' }}>📝 Articles</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold', color: '#f57c00', margin: '0 0 8px 0' }}>
            {stats.articles.total}
          </p>
          <div style={{ fontSize: 14, color: '#ff9800' }}>
            <div>📄 Publiés: {stats.articles.publies}</div>
            <div>✏️ Brouillons: {stats.articles.brouillons}</div>
            <div>🆕 Cette semaine: {stats.articles.nouveaux_cette_semaine}</div>
          </div>
        </div>

        {/* Carte Exercices */}
        <div style={{ background: '#f3e5f5', padding: 20, borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#6a1b9a' }}>🧘‍♂️ Exercices</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold', color: '#7b1fa2', margin: '0 0 8px 0' }}>
            {stats.exercices.total}
          </p>
          <div style={{ fontSize: 14, color: '#9c27b0' }}>
            <div>✅ Actifs: {stats.exercices.actifs}</div>
            <div>📋 Disponibles</div>
          </div>
        </div>

        {/* Carte Sessions */}
        <div style={{ background: '#e3f2fd', padding: 20, borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#1565c0' }}>⏱️ Sessions</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold', color: '#1976d2', margin: '0 0 8px 0' }}>
            {stats.sessions.total}
          </p>
          <div style={{ fontSize: 14, color: '#2196f3' }}>
            <div>📅 Cette semaine: {stats.sessions.cette_semaine}</div>
            <div>📆 Ce mois: {stats.sessions.ce_mois}</div>
            <div>⏰ Durée moy: {Math.round(stats.sessions.duree_moyenne)}min</div>
          </div>
        </div>
      </div>

      {/* Section des actions rapides */}
      <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginTop: 16 }}>
        <h3 style={{ color: '#388e3c', marginBottom: 16 }}>Actions rapides</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button style={{
            background: '#388e3c',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 14
          }}>
            📊 Voir rapports détaillés
          </button>
          <button style={{
            background: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 14
          }}>
            📧 Envoyer newsletter
          </button>
          <button style={{
            background: '#ff9800',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 14
          }}>
            🛠️ Maintenance système
          </button>
        </div>
      </div>
    </div>
  );
};

// Composants d'administration (à créer)
const ContentManagement = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ color: '#388e3c', marginBottom: 16 }}>Gestion des contenus</h2>
    <p>Module de gestion des contenus en cours de développement...</p>
  </div>
);

const ExerciceManagement = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ color: '#388e3c', marginBottom: 16 }}>Gestion des exercices</h2>
    <p>Module de gestion des exercices en cours de développement...</p>
  </div>
);

const Admin = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Vérification des droits admin
  if (loading) return <div>Chargement...</div>;
  if (!user || user.id_role !== 2) {
    return <Navigate to="/" replace />;
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'users': return <UserManagement />;
      case 'content': return <ContentManagement />;
      case 'exercices': return <ExerciceManagement />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      {/* Navigation admin */}
      <div style={{
        width: 250,
        background: '#f5f5f5',
        padding: 16,
        borderRight: '1px solid #e0e0e0'
      }}>
        <h3 style={{ color: '#388e3c', marginBottom: 24 }}>Administration</h3>
        <nav>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              display: 'block',
              width: '100%',
              padding: 12,
              marginBottom: 8,
              border: 'none',
              borderRadius: 6,
              background: activeTab === 'dashboard' ? '#388e3c' : 'transparent',
              color: activeTab === 'dashboard' ? '#fff' : '#388e3c',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            📊 Tableau de bord
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              display: 'block',
              width: '100%',
              padding: 12,
              marginBottom: 8,
              border: 'none',
              borderRadius: 6,
              background: activeTab === 'users' ? '#388e3c' : 'transparent',
              color: activeTab === 'users' ? '#fff' : '#388e3c',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            👥 Utilisateurs
          </button>
          <button
            onClick={() => setActiveTab('content')}
            style={{
              display: 'block',
              width: '100%',
              padding: 12,
              marginBottom: 8,
              border: 'none',
              borderRadius: 6,
              background: activeTab === 'content' ? '#388e3c' : 'transparent',
              color: activeTab === 'content' ? '#fff' : '#388e3c',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            📝 Contenus
          </button>
          <button
            onClick={() => setActiveTab('exercices')}
            style={{
              display: 'block',
              width: '100%',
              padding: 12,
              marginBottom: 8,
              border: 'none',
              borderRadius: 6,
              background: activeTab === 'exercices' ? '#388e3c' : 'transparent',
              color: activeTab === 'exercices' ? '#fff' : '#388e3c',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            🧘‍♂️ Exercices
          </button>
        </nav>
      </div>

      {/* Contenu principal */}
      <div style={{ flex: 1, background: '#fff' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin; 