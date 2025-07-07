import React from 'react';
import './Home.css'; // Import du fichier CSS

// Exemple de données de posts (à remplacer par API ou contexte si besoin)
const posts = [
  {
    id: 1,
    titre: "Gérer son stress au quotidien",
    image: "/images/meditation.webp",
    extrait: "Découvrez des techniques simples pour réduire le stress et améliorer votre bien-être mental chaque jour."
  },
  {
    id: 2,
    titre: "La cohérence cardiaque expliquée",
    image: "/images/maladeresp.webp",
    extrait: "Comprenez les bienfaits de la cohérence cardiaque et comment l'intégrer facilement dans votre routine."
  },
  {
    id: 3,
    titre: "Respirer pour mieux vivre",
    image: "/images/medititation women.webp",
    extrait: "Apprenez à utiliser la respiration consciente pour retrouver calme et sérénité en toutes circonstances."
  }
];

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section avec image et texte */}
      <section className="hero-section">
        <img
          src="/images/meditationpro.webp"
          alt="Santé mentale et bien-être"
          className="hero-image"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Votre Bien-être Mental
          </h1>
          <p className="hero-subtitle">
            Découvrez nos conseils et techniques pour une vie plus sereine et équilibrée
          </p>
        </div>
      </section>

      {/* Section posts récents */}
      <section className="blog-section">
        <h2 className="section-title">
          Derniers articles du blog
        </h2>
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <img
                src={post.image}
                alt={post.titre}
                className="post-image"
              />
              <div className="post-content">
                <h3 className="post-title">{post.titre}</h3>
                <p className="post-excerpt">{post.extrait}</p>
                <a
                  href={`/blog/${post.id}`}
                  className="post-link"
                >
                  Lire l'article →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Espace en bas */}
      <div className="bottom-spacer"></div>
    </div>
  );
};

export default Home;