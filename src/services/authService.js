const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/cesizen-backend/public/api';

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: credentials.email,
      mot_de_passe: credentials.password
    })
  });
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      mot_de_passe: userData.password,
      mot_de_passe_confirmation: userData.passwordConfirm
    })
  });
  return response.json();
};

export const fetchProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) throw new Error('Non authentifié');
  return response.json();
}; 