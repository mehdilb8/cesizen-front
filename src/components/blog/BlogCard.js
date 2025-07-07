import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ article }) => (
  <div style={{
    background: '#fff',
    borderRadius: 24,
    boxShadow: '0 4px 24px #e0e0e0',
    maxWidth: 340,
    minWidth: 220,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 0,
    overflow: 'hidden',
    margin: '0 auto'
  }}>
    <img
      src={article.image}
      alt={article.titre}
      style={{
        width: '100%',
        height: 180,
        objectFit: 'cover'
      }}
    />
    <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ color: '#388e3c', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{article.titre}</h3>
      <p style={{ color: '#444', fontSize: 15, marginBottom: 18 }}>{article.extrait || article.contenu.replace(/<[^>]+>/g, '').slice(0, 100) + '...'}</p>
      <Link to={`/blog/${article.id_contenu}`} style={{
        background: '#e8f5e9',
        color: '#388e3c',
        fontWeight: 700,
        borderRadius: 16,
        padding: '10px 22px',
        textDecoration: 'none',
        alignSelf: 'flex-start',
        marginTop: 'auto',
        boxShadow: '0 2px 8px #c8e6c9'
      }}>
        Lire l'article →
      </Link>
    </div>
  </div>
);

export default BlogCard;