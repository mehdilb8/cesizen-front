import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => (
  <div className="auth-page">
    <LoginForm />
    <p style={{ marginTop: 16 }}>
      Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
    </p>
  </div>
);

export default Login; 
