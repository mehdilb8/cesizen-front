import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.passwordConfirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    const success = await register(form);
    if (!success) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Inscription</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label>Nom</label>
        <input
          type="text"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Prénom</label>
        <input
          type="text"
          name="prenom"
          value={form.prenom}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Confirmation du mot de passe</label>
        <input
          type="password"
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Inscription...' : "S'inscrire"}
      </button>
    </form>
  );
};

export default RegisterForm; 