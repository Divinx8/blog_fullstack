import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
    api.get(`posts/${id}/`)
      .then(res => { setPost(res.data); setLoading(false); })
      .catch(() => { navigate('/'); });
  }, [id, navigate]);

  if (loading) return <div style={styles.loading}>Chargement...</div>;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.back}>← Retour aux articles</Link>

      <div style={styles.card}>
        <div style={styles.meta}>
          ✍️ {post.author.username} · {new Date(post.created_at).toLocaleDateString('fr-FR')}
        </div>
        <h1 style={styles.title}>{post.title}</h1>
        <div style={styles.divider} />
        <p style={styles.content}>{post.content}</p>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '750px', margin: '0 auto', padding: '2rem' },
  loading: { textAlign: 'center', padding: '4rem', color: '#64748b' },
  back: { display: 'inline-block', color: '#3b82f6', textDecoration: 'none',
    marginBottom: '1.5rem', fontWeight: '600' },
  card: { background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px',
    padding: '2.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  meta: { color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' },
  title: { fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', lineHeight: '1.3' },
  divider: { height: '1px', background: '#e2e8f0', margin: '1.5rem 0' },
  content: { color: '#374151', lineHeight: '1.9', fontSize: '1.05rem' },
};