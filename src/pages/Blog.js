import React, { useEffect, useState } from 'react';
import { getContenus } from '../services/blogService';
import BlogList from '../components/blog/BlogList';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getContenus();
        setArticles(data);
      } catch (err) {
        setError('Erreur lors du chargement des articles.');
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 32 }}>Chargement...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>{error}</p>;

  return (
    <div className="blog-page">
      <h1 className="blog-page-title">Le Blog CESIZen</h1>
      <BlogList articles={articles} />
    </div>
  );
};

export default Blog; 