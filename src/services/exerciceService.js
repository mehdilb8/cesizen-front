const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/cesizen-backend/public/api';

export const getExercices = async () => {
  const response = await fetch(`${API_URL}/exercices`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!response.ok) throw new Error('Erreur lors du chargement des exercices');
  return response.json();
};

export const getExercice = async (id) => {
  const response = await fetch(`${API_URL}/exercices/${id}`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!response.ok) throw new Error('Erreur lors du chargement de l\'exercice');
  return response.json();
}; 