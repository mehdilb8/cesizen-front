import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => (
  <div className="auth-page">
    <RegisterForm />
    <p style={{ marginTop: 16 }}>
      Déjà un compte ? <Link to="/login">Connectez-vous</Link>
    </p>
  </div>
);

export default Register; 