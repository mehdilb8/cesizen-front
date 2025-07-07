import React from 'react';
import ExerciceCard from './ExerciceCard';

const ExerciceList = ({ exercices }) => {
  if (!exercices || exercices.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: 32 }}>Aucun exercice pour le moment.</p>;
  }
  return (
    <div className="exercice-list" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
      gap: 20,
      margin: '0 auto',
      maxWidth: 1000,
      padding: '0 8px'
    }}>
      {exercices.map(exercice => (
        <ExerciceCard key={exercice.id_exercice} exercice={exercice} />
      ))}
    </div>
  );
};

export default ExerciceList; 