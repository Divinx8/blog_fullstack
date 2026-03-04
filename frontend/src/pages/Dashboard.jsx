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
  }, [user, navigate]);
  const fetchPosts = () => {
    api.get('posts/').then(res => setPosts(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      await api.post('posts/', form);
      setSuccess('Article publié avec succès !');
      setForm({ title: '', content: '' });
      fetchPosts();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Erreur lors de la publication.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    await api.delete(`posts/${id}/`);
    fetchPosts();
  };

  const wordCount = form.content.trim() === '' ? 0 : form.content.trim().split(/\s+/).length;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <div style={styles.headerBadge}>✦ Espace personnel</div>
            <h1 style={styles.headerTitle}>
              Bonjour, <span style={styles.headerName}>{user?.username}</span> 👋
            </h1>
            <p style={styles.headerSub}>Gère et publie tes articles depuis ici</p>
          </div>
          <div style={styles.statsRow}>
            <div style={styles.statCard}>
              <div style={styles.statNum}>{posts.length}</div>
              <div style={styles.statLabel}>Articles</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNum}>
                {posts.filter(p => p.author.username === user?.username).length}
              </div>
              <div style={styles.statLabel}>Mes articles</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Formulaire */}
          <div style={styles.formCard}>
            <div style={styles.formCardHeader}>
              <span style={styles.formCardIcon}>✍️</span>
              <h2 style={styles.formCardTitle}>Nouvel article</h2>
            </div>

            {success && (
              <div style={styles.toast}>
                ✅ {success}
              </div>
            )}
            {error && (
              <div style={styles.toastError}>
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={styles.field}>
                <label style={styles.label}>Titre de l'article</label>
                <input style={styles.input}
                  type="text" placeholder="Un titre accrocheur..."
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  required />
              </div>
              <div style={styles.field}>
                <div style={styles.labelRow}>
                  <label style={styles.label}>Contenu</label>
                  <span style={styles.wordCount}>{wordCount} mots</span>
                </div>
                <textarea style={styles.textarea}
                  placeholder="Écris ton article ici..."
                  value={form.content}
                  onChange={e => setForm({...form, content: e.target.value})}
                  required rows={8} />
              </div>
              <button style={loading ? styles.btnDisabled : styles.btn} disabled={loading}>
                {loading ? (
                  <span>Publication en cours...</span>
                ) : (
                  <span>🚀 Publier l'article</span>
                )}
              </button>
            </form>
          </div>

          {/* Liste articles */}
          <div style={styles.listCard}>
            <div style={styles.formCardHeader}>
              <span style={styles.formCardIcon}>📚</span>
              <h2 style={styles.formCardTitle}>Tous les articles ({posts.length})</h2>
            </div>

            {posts.length === 0 ? (
              <div style={styles.empty}>
                <div style={styles.emptyIcon}>📭</div>
                <p>Aucun article pour l'instant.</p>
              </div>
            ) : (
              <div style={styles.postsList}>
                {posts.map((post, i) => (
                  <div key={post.id} style={styles.postItem}>
                    <div style={{...styles.postAccent, background: getGradient(i)}} />
                    <div style={styles.postContent}>
                      <h3 style={styles.postTitle}>{post.title}</h3>
                      <div style={styles.postMeta}>
                        <span style={styles.postAuthor}>✍️ {post.author.username}</span>
                        <span style={styles.postDate}>
                          {new Date(post.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                    {post.author.username === user?.username && (
                      <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
  header: {
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    padding: '3rem 2rem', color: 'white',
  },
  headerInner: {
    maxWidth: '1000px', margin: '0 auto',
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', flexWrap: 'wrap', gap: '2rem',
  },
  headerBadge: {
    display: 'inline-block', background: 'rgba(167,139,250,0.2)',
    border: '1px solid rgba(167,139,250,0.4)',
    color: '#a78bfa', padding: '0.3rem 1rem', borderRadius: '100px',
    fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.75rem',
  },
  headerTitle: { fontSize: '2rem', fontWeight: '800', marginBottom: '0.4rem' },
  headerName: {
    background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  headerSub: { color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem' },
  statsRow: { display: 'flex', gap: '1rem' },
  statCard: {
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '12px', padding: '1rem 1.5rem', textAlign: 'center', minWidth: '90px',
  },
  statNum: { fontSize: '2rem', fontWeight: '800', color: '#a78bfa' },
  statLabel: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' },
  container: { maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 2rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  formCard: {
    background: 'white', borderRadius: '16px',
    padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  listCard: {
    background: 'white', borderRadius: '16px',
    padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  formCardHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' },
  formCardIcon: { fontSize: '1.3rem' },
  formCardTitle: { fontSize: '1.1rem', fontWeight: '700', color: '#1e1b4b' },
  toast: {
    background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0',
    padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1rem',
    fontSize: '0.9rem', fontWeight: '500',
  },
  toastError: {
    background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
    padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  field: { marginBottom: '1.2rem' },
  labelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' },
  label: { display: 'block', fontWeight: '600', color: '#374151', fontSize: '0.9rem' },
  wordCount: { fontSize: '0.78rem', color: '#a78bfa', fontWeight: '600' },
  input: {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
    border: '2px solid #e9d5ff', fontSize: '0.95rem',
    boxSizing: 'border-box', outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
    border: '2px solid #e9d5ff', fontSize: '0.95rem',
    boxSizing: 'border-box', resize: 'vertical',
    fontFamily: 'inherit', outline: 'none',
  },
  btn: {
    width: '100%', padding: '0.9rem',
    background: 'linear-gradient(135deg, #a78bfa, #6d28d9)',
    color: 'white', border: 'none', borderRadius: '10px',
    fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
    marginTop: '0.5rem',
  },
  btnDisabled: {
    width: '100%', padding: '0.9rem', background: '#ddd5fe',
    color: 'white', border: 'none', borderRadius: '10px',
    fontSize: '1rem', cursor: 'not-allowed', marginTop: '0.5rem',
  },
  empty: { textAlign: 'center', padding: '2rem', color: '#9ca3af' },
  emptyIcon: { fontSize: '2.5rem', marginBottom: '0.5rem' },
  postsList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  postItem: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '1rem', borderRadius: '10px', background: '#faf5ff',
    border: '1px solid #e9d5ff',
  },
  postAccent: { width: '4px', height: '40px', borderRadius: '4px', flexShrink: 0 },
  postContent: { flex: 1, minWidth: 0 },
  postTitle: {
    fontWeight: '600', color: '#1e1b4b', fontSize: '0.9rem',
    marginBottom: '0.3rem', whiteSpace: 'nowrap',
    overflow: 'hidden', textOverflow: 'ellipsis',
  },
  postMeta: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
  postAuthor: { color: '#7c3aed', fontSize: '0.78rem', fontWeight: '500' },
  postDate: { color: '#9ca3af', fontSize: '0.75rem' },
  deleteBtn: {
    background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
    padding: '0.4rem 0.6rem', borderRadius: '8px', cursor: 'pointer',
    fontSize: '0.9rem', flexShrink: 0,
  },
};