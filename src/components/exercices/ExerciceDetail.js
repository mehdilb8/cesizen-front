import React from 'react';
import ExercicePlayer from './ExercicePlayer';

const ExerciceDetail = ({ exercice }) => {
  if (!exercice) return <p>Chargement...</p>;
  return (
    <div className="exercice-detail" style={{
      background: '#fff',
      borderRadius: 14,
      boxShadow: '0 2px 12px rgba(60, 120, 80, 0.10)',
      maxWidth: 500,
      margin: '32px auto',
      padding: 24,
      color: '#222',
      minWidth: 0
    }}>
      <h1 style={{ color: exercice.couleur_theme || '#388e3c', fontSize: 28, marginBottom: 8 }}>{exercice.nom_exercice}</h1>
      <span style={{
        display: 'inline-block',
        background: exercice.couleur_theme || '#e8f5e9',
        color: '#222',
        borderRadius: 8,
        padding: '2px 12px',
        fontSize: 14,
        marginBottom: 12
      }}>
        Niveau : {exercice.niveau_difficulte}
      </span>
      <p style={{ fontSize: 16, margin: '12px 0' }}>{exercice.description}</p>
      <div style={{ display: 'flex', gap: 18, fontSize: 15, margin: '18px 0' }}>
        <span>Inspiration : <b>{exercice.duree_inspiration}s</b></span>
        <span>Apnée : <b>{exercice.duree_apnee}s</b></span>
        <span>Expiration : <b>{exercice.duree_expiration}s</b></span>
      </div>
      <div style={{ fontSize: 14, color: '#888', marginTop: 12 }}>
        {exercice.nb_cycles_recommandes && (
          <div>Cycles recommandés : {exercice.nb_cycles_recommandes}</div>
        )}
        
      </div>
      {/* Intégration du player */}
      <div style={{ marginTop: 32 }}>
        <ExercicePlayer exercice={exercice} />
      </div>
    </div>
  );
};

export default ExerciceDetail; 