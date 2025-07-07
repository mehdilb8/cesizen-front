import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExercice } from '../services/exerciceService';
import ExerciceDetail from '../components/exercices/ExerciceDetail';

const ExercicePage = () => {
  const { id } = useParams();
  const [exercice, setExercice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExercice = async () => {
      try {
        const data = await getExercice(id);
        setExercice(data);
      } catch (err) {
        setError("Erreur lors du chargement de l'exercice.");
      }
      setLoading(false);
    };
    fetchExercice();
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 32 }}>Chargement...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>{error}</p>;

  return (
    <div className="exercice-detail-page">
      <ExerciceDetail exercice={exercice} />
    </div>
  );
};

export default ExercicePage; 