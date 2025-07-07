import React from 'react';
import { Link } from 'react-router-dom';

const ExerciceCard = ({ exercice }) => {
  return (
    <div className="exercice-card" style={{
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(60, 120, 80, 0.08)',
      margin: '12px 0',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }}>
      <h2 style={{ fontSize: 20, color: '#388e3c', margin: 0 }}>{exercice.nom_exercice}</h2>
      <p style={{ color: '#666', fontSize: 15, margin: 0 }}>{exercice.description.slice(0, 80)}...</p>
      <div style={{ display: 'flex', gap: 16, fontSize: 14, margin: '8px 0' }}>
        <span>Inspiration : {exercice.duree_inspiration}s</span>
        <span>Apnée : {exercice.duree_apnee}s</span>
        <span>Expiration : {exercice.duree_expiration}s</span>
      </div>
      <span style={{ fontSize: 13, color: '#81c784', fontWeight: 600 }}>Niveau : {exercice.niveau_difficulte}</span>
      <Link to={`/exercices/${exercice.id_exercice}`} style={{
        marginTop: 8,
        alignSelf: 'flex-start',
        background: '#388e3c',
        color: '#fff',
        borderRadius: 6,
        padding: '6px 18px',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: 15
      }}>
        Détail
      </Link>
    </div>
  );
};

export default ExerciceCard; 