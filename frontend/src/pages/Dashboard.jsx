import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchPosts();
  }, [user]);

  const fetchPosts = () => {
    api.get('posts/').then(res => setPosts(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      await api.post('posts/', form);
      setSuccess('✅ Article publié avec succès !');
      setForm({ title: '', content: '' });
      fetchPosts();
    } catch {
      setError('❌ Erreur lors de la publication.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    await api.delete(`posts/${id}/`);
    fetchPosts();
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🏠 Dashboard</h1>
        <p style={styles.sub}>Bienvenue {user?.username} ! Gère tes articles ici.</p>
      </div>

      {/* Formulaire nouvel article */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>✍️ Nouvel article</h2>

        {success && <div style={styles.success}>{success}</div>}
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Titre</label>
            <input style={styles.input} type="text"
              placeholder="Titre de ton article..."
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Contenu</label>
            <textarea style={styles.textarea}
              placeholder="Écris ton article ici..."
              value={form.content}
              onChange={e => setForm({...form, content: e.target.value})}
              required rows={6} />
          </div>
          <button style={loading ? styles.btnDisabled : styles.btn} disabled={loading}>
            {loading ? 'Publication...' : '🚀 Publier'}
          </button>
        </form>
      </div>

      {/* Liste des articles */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📚 Tous les articles ({posts.length})</h2>
        {posts.length === 0 ? (
          <p style={styles.empty}>Aucun article pour l'instant.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} style={styles.postItem}>
              <div style={styles.postInfo}>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postMeta}>
                  ✍️ {post.author.username} · {new Date(post.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
              {post.author.username === user?.username && (
                <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>
                  🗑️ Supprimer
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem' },
  header: { marginBottom: '2rem' },
  title: { fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' },
  sub: { color: '#64748b', marginTop: '0.25rem' },
  card: { background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px',
    padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  cardTitle: { fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1.5rem' },
  success: { background: '#f0fdf4', color: '#16a34a', padding: '0.75rem 1rem',
    borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' },
  error: { background: '#fef2f2', color: '#dc2626', padding: '0.75rem 1rem',
    borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' },
  field: { marginBottom: '1.2rem' },
  label: { display: 'block', marginBottom: '0.4rem', fontWeight: '600',
    color: '#374151', fontSize: '0.9rem' },
  input: { width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
    border: '1px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
    border: '1px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box',
    resize: 'vertical', fontFamily: 'inherit' },
  btn: { padding: '0.85rem 2rem', background: '#3b82f6', color: 'white',
    border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' },
  btnDisabled: { padding: '0.85rem 2rem', background: '#93c5fd', color: 'white',
    border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'not-allowed' },
  empty: { color: '#94a3b8', textAlign: 'center', padding: '1rem' },
  postItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem', borderBottom: '1px solid #f1f5f9' },
  postInfo: { flex: 1 },
  postTitle: { fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' },
  postMeta: { color: '#94a3b8', fontSize: '0.85rem' },
  deleteBtn: { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
    padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' },
};