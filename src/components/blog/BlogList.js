import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: 32 }}>Aucun article pour le moment.</p>;
  }
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 32,
      justifyContent: 'center',
      margin: '0 auto',
      maxWidth: 1200,
      padding: '32px 8px'
    }}>
      {articles.map(article => (
        <BlogCard key={article.id_contenu} article={article} />
      ))}
    </div>
  );
};

export default BlogList;