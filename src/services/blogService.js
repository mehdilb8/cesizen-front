const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/cesizen-backend/public/api';

export const getContenus = async () => {
  const response = await fetch(`${API_URL}/contenus`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!response.ok) throw new Error('Erreur lors du chargement des articles');
  return response.json();
};

export const getContenu = async (id) => {
  const response = await fetch(`${API_URL}/contenus/${id}`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!response.ok) throw new Error('Erreur lors du chargement de l\'article');
  return response.json();
}; 