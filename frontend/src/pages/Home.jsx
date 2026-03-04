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
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroBadge}>✦ Bienvenue sur MonBlog</div>
        <h1 style={styles.heroTitle}>
          Des idées qui<br />
          <span style={styles.heroGradient}>inspirent le monde</span>
        </h1>
        <p style={styles.heroDesc}>
          Découvrez des articles passionnants sur le développement web, la tech et bien plus encore.
        </p>
        <Link to="/register" style={styles.heroCta}>
          Rejoindre la communauté →
        </Link>
      </div>

      {/* Articles */}
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Derniers articles</h2>
          <div style={styles.sectionLine} />
        </div>

        {loading ? (
          <div style={styles.loaderWrap}>
            <div style={styles.loader} />
            <p style={styles.loaderText}>Chargement...</p>
          </div>
        ) : posts.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>📭</div>
            <p>Aucun article pour l'instant.</p>
            <Link to="/register" style={styles.emptyLink}>Sois le premier à écrire !</Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {posts.map((post, i) => (
              <div key={post.id} style={{
                ...styles.card,
                animationDelay: `${i * 0.1}s`
              }}>
                <div style={{
                  ...styles.cardAccent,
                  background: getGradient(i),
                }} />
                <div style={styles.cardBody}>
                  <div style={styles.cardMeta}>
                    <div style={styles.authorAvatar}>
                      {post.author.username.charAt(0).toUpperCase()}
                    </div>
                    <span style={styles.authorName}>{post.author.username}</span>
                    <span style={styles.cardDate}>
                      {new Date(post.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 style={styles.cardTitle}>{post.title}</h2>
                  <p style={styles.cardContent}>
                    {post.content.substring(0, 150)}...
                  </p>
                  <Link to={`/post/${post.id}`} style={styles.cardLink}>
                    Lire l'article
                    <span style={styles.cardLinkArrow}>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const gradients = [
  'linear-gradient(135deg, #a78bfa, #6d28d9)',
  'linear-gradient(135deg, #34d399, #059669)',
  'linear-gradient(135deg, #60a5fa, #2563eb)',
  'linear-gradient(135deg, #f472b6, #db2777)',
  'linear-gradient(135deg, #fbbf24, #d97706)',
];
const getGradient = (i) => gradients[i % gradients.length];

const styles = {
  page: { background: '#f8f7ff', minHeight: '100vh' },
  hero: {
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    padding: '6rem 2rem', textAlign: 'center', color: 'white',
  },
  heroBadge: {
    display: 'inline-block', background: 'rgba(167,139,250,0.2)',
    border: '1px solid rgba(167,139,250,0.4)',
    color: '#a78bfa', padding: '0.4rem 1.2rem', borderRadius: '100px',
    fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem',
    letterSpacing: '0.05em',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800',
    lineHeight: '1.15', marginBottom: '1.2rem',
  },
  heroGradient: {
    background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDesc: {
    color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem',
    maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.7',
  },
  heroCta: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #a78bfa, #6d28d9)',
    color: 'white', textDecoration: 'none',
    padding: '0.85rem 2rem', borderRadius: '10px',
    fontWeight: '700', fontSize: '1rem',
  },
  container: { maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' },
  sectionTitle: { fontSize: '1.5rem', fontWeight: '800', color: '#1e1b4b', whiteSpace: 'nowrap' },
  sectionLine: { flex: 1, height: '2px', background: 'linear-gradient(to right, #a78bfa, transparent)' },
  loaderWrap: { textAlign: 'center', padding: '4rem' },
  loader: {
    width: '40px', height: '40px', border: '3px solid #e9d5ff',
    borderTop: '3px solid #7c3aed', borderRadius: '50%',
    margin: '0 auto 1rem', animation: 'spin 1s linear infinite',
  },
  loaderText: { color: '#7c3aed' },
  empty: { textAlign: 'center', padding: '4rem', color: '#6b7280' },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem' },
  emptyLink: { color: '#7c3aed', textDecoration: 'none', fontWeight: '600' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  card: {
    background: 'white', borderRadius: '16px', overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardAccent: { height: '5px' },
  cardBody: { padding: '1.5rem' },
  cardMeta: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' },
  authorAvatar: {
    width: '28px', height: '28px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #a78bfa, #6d28d9)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'white', fontSize: '0.75rem', fontWeight: '700',
  },
  authorName: { color: '#374151', fontSize: '0.85rem', fontWeight: '600' },
  cardDate: { color: '#9ca3af', fontSize: '0.8rem', marginLeft: 'auto' },
  cardTitle: { fontSize: '1.15rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '0.75rem', lineHeight: '1.4' },
  cardContent: { color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.2rem' },
  cardLink: {
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    color: '#7c3aed', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem',
  },
  cardLinkArrow: { transition: 'transform 0.2s' },
};