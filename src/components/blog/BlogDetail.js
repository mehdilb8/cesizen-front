import React from 'react';

const BlogDetail = ({ article }) => {
  if (!article) return <p>Chargement...</p>;
  return (
    <article className="blog-detail">
      <h1 className="blog-detail-title">{article.titre}</h1>
      <p className="blog-detail-meta">
        {article.date_creation ? new Date(article.date_creation).toLocaleDateString() : ''}
      </p>
      <div
        className="blog-detail-content"
        dangerouslySetInnerHTML={{ __html: article.contenu }}
      />
    </article>
  );
};

export default BlogDetail; 