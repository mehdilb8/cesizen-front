import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContenu } from '../services/blogService';
import BlogDetail from '../components/blog/BlogDetail';

const BlogPost = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getContenu(id);
        setArticle(data);
      } catch (err) {
        setError("Erreur lors du chargement de l'article.");
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 32 }}>Chargement...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>{error}</p>;

  return (
    <div className="blog-post-page">
      <BlogDetail article={article} />
    </div>
  );
};

export default BlogPost; 