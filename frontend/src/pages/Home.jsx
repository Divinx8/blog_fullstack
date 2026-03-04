import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('posts/')
      .then(res => { setPosts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>📝 MonBlog</h1>
        <p style={styles.heroSub}>Découvrez les derniers articles</p>
      </div>

      {loading ? (
        <p style={styles.loading}>Chargement...</p>
      ) : posts.length === 0 ? (
        <p style={styles.empty}>Aucun article pour l'instant. Sois le premier à écrire !</p>
      ) : (
        <div style={styles.grid}>
          {posts.map(post => (
            <div key={post.id} style={styles.card}>
              <div style={styles.cardMeta}>
                ✍️ {post.author.username} · {new Date(post.created_at).toLocaleDateString('fr-FR')}
              </div>
              <h2 style={styles.cardTitle}>{post.title}</h2>
              <p style={styles.cardContent}>
                {post.content.substring(0, 120)}...
              </p>
              <Link to={`/post/${post.id}`} style={styles.cardLink}>
                Lire la suite →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem' },
  hero: { textAlign: 'center', padding: '3rem 0 2rem', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' },
  heroTitle: { fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem' },
  heroSub: { color: '#64748b', fontSize: '1.1rem' },
  loading: { textAlign: 'center', color: '#64748b', marginTop: '3rem' },
  empty: { textAlign: 'center', color: '#64748b', marginTop: '3rem', fontSize: '1.1rem' },
  grid: { display: 'grid', gap: '1.5rem' },
  card: { background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px',
    padding: '1.5rem', transition: 'box-shadow 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  cardMeta: { color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' },
  cardTitle: { fontSize: '1.3rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.75rem' },
  cardContent: { color: '#64748b', lineHeight: '1.7', marginBottom: '1rem' },
  cardLink: { color: '#3b82f6', textDecoration: 'none', fontWeight: '600' },
};