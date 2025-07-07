import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../services/adminService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    id_role: 1,
    statut: 'actif'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser.id_utilisateur, formData);
      } else {
        await createUser(formData);
      }
      setShowForm(false);
      setEditingUser(null);
      setFormData({ nom: '', prenom: '', email: '', mot_de_passe: '', id_role: 1, statut: 'actif' });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      mot_de_passe: '',
      id_role: user.id_role,
      statut: user.statut
    });
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div style={{ padding: 24 }}>Chargement...</div>;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#388e3c', margin: 0 }}>Gestion des utilisateurs</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: '#388e3c',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          + Nouvel utilisateur
        </button>
      </div>

      {error && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: 12, borderRadius: 6, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* Formulaire d'ajout/modification */}
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            padding: 24,
            borderRadius: 12,
            maxWidth: 400,
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3>{editingUser ? 'Modifier' : 'Créer'} un utilisateur</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label>Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, marginTop: 4 }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, marginTop: 4 }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, marginTop: 4 }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Mot de passe {editingUser && '(laisser vide pour ne pas changer)'}</label>
                <input
                  type="password"
                  name="mot_de_passe"
                  value={formData.mot_de_passe}
                  onChange={handleInputChange}
                  required={!editingUser}
                  style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, marginTop: 4 }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Rôle</label>
                <select
                  name="id_role"
                  value={formData.id_role}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, marginTop: 4 }}
                >
                  <option value={1}>Utilisateur</option>
                  <option value={2}>Administrateur</option>
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Statut</label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4, marginTop: 4 }}
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUser(null);
                    setFormData({ nom: '', prenom: '', email: '', mot_de_passe: '', id_role: 1, statut: 'actif' });
                  }}
                  style={{
                    background: '#ccc',
                    color: '#333',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 16px',
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#388e3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 16px',
                    cursor: 'pointer'
                  }}
                >
                  {editingUser ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Liste des utilisateurs */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Nom</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Prénom</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Rôle</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Statut</th>
              <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id_utilisateur}>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{user.id_utilisateur}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{user.nom}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{user.prenom}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{user.email}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                  <span style={{
                    background: user.id_role === 2 ? '#ffecb3' : '#e8f5e9',
                    color: user.id_role === 2 ? '#f57c00' : '#388e3c',
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 12
                  }}>
                    {user.id_role === 2 ? 'Admin' : 'Utilisateur'}
                  </span>
                </td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                  <span style={{
                    background: user.statut === 'actif' ? '#e8f5e9' : '#ffebee',
                    color: user.statut === 'actif' ? '#388e3c' : '#c62828',
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 12
                  }}>
                    {user.statut}
                  </span>
                </td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{
                      background: '#2196f3',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '4px 8px',
                      marginRight: 8,
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user.id_utilisateur)}
                    style={{
                      background: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 