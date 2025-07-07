import React, { useEffect, useState } from 'react';
import { getExercices } from '../services/exerciceService';
import ExerciceList from '../components/exercices/ExerciceList';

import './Exercice.css';
const Exercices = () => {
  const [exercices, setExercices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExercices = async () => {
      try {
        const data = await getExercices();
        setExercices(data);
      } catch (err) {
        setError('Erreur lors du chargement des exercices.');
      }
      setLoading(false);
    };
    fetchExercices();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 32 }}>Chargement...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>{error}</p>;

  return (
    <div className="exercices-page">
      <h1 className="exercices-page-title">Exercices de Respiration</h1>
      <ExerciceList exercices={exercices} />
    </div>
  );
};

export default Exercices; 