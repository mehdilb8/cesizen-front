const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/cesizen-backend/public/api';

export const startSession = async ({ exerciceId, cycles, ressentiAvant }) => {
  const response = await fetch(`${API_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      id_exercice: exerciceId,
      nb_cycles_realises: cycles,
      ressenti_avant: ressentiAvant
    })
  });
  return response.json();
};

export const endSession = async (sessionId, { ressentiApres, commentaire }) => {
  const response = await fetch(`${API_URL}/sessions/${sessionId}/end`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      ressenti_apres: ressentiApres,
      commentaire
    })
  });
  return response.json();
};

export const getUserSessions = async () => {
  const response = await fetch(`${API_URL}/sessions`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
    }
  });
  return response.json();
};