import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(form.username, form.password);
      navigate('/dashboard');
    } catch {
      setError('Identifiants incorrects. Vérifie ton nom d\'utilisateur et mot de passe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.brand}>✦ MonBlog</div>
          <h2 style={styles.leftTitle}>
            Content de te<br />revoir ! 👋
          </h2>
          <p style={styles.leftDesc}>
            Connecte-toi pour accéder à ton espace et gérer tes articles.
          </p>
          <div style={styles.features}>
            {['✍️ Publie tes articles', '📚 Gère ton contenu', '🚀 Partage tes idées'].map(f => (
              <div key={f} style={styles.feature}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <h1 style={styles.title}>Connexion</h1>
          <p style={styles.sub}>Accède à ton espace personnel</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>Nom d'utilisateur</label>
              <input style={styles.input} type="text"
                placeholder="tonusername"
                value={form.username}
                onChange={e => setForm({...form, username: e.target.value})}
                required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Mot de passe</label>
              <input style={styles.input} type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                required />
            </div>
            <button style={loading ? styles.btnDisabled : styles.btn} disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter →'}
            </button>
          </form>

          <p style={styles.footer}>
            Pas encore de compte ?{' '}
            <Link to="/register" style={styles.link}>S'inscrire gratuitement</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: '100vh' },
  left: {
    flex: 1, background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '3rem',
  },
  leftContent: { maxWidth: '380px' },
  brand: {
    color: '#a78bfa', fontSize: '1.2rem', fontWeight: '800',
    marginBottom: '2.5rem', letterSpacing: '-0.02em',
  },
  leftTitle: {
    fontSize: '2.8rem', fontWeight: '800', color: 'white',
    lineHeight: '1.15', marginBottom: '1rem',
  },
  leftDesc: {
    color: 'rgba(255,255,255,0.55)', fontSize: '1rem',
    lineHeight: '1.7', marginBottom: '2rem',
  },
  features: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  feature: {
    background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)',
    color: 'rgba(255,255,255,0.8)', padding: '0.6rem 1rem',
    borderRadius: '8px', fontSize: '0.9rem',
  },
  right: {
    flex: 1, background: '#f8f7ff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '3rem',
  },
  card: {
    background: 'white', borderRadius: '20px', padding: '2.5rem',
    width: '100%', maxWidth: '420px',
    boxShadow: '0 8px 40px rgba(109,40,217,0.1)',
  },
  title: { fontSize: '1.8rem', fontWeight: '800', color: '#1e1b4b', marginBottom: '0.25rem' },
  sub: { color: '#6b7280', marginBottom: '2rem', fontSize: '0.95rem' },
  error: {
    background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
    padding: '0.75rem 1rem', borderRadius: '10px',
    marginBottom: '1rem', fontSize: '0.9rem',
  },
  field: { marginBottom: '1.2rem' },
  label: { display: 'block', marginBottom: '0.4rem', fontWeight: '600', color: '#374151', fontSize: '0.9rem' },
  input: {
    width: '100%', padding: '0.8rem 1rem', borderRadius: '10px',
    border: '2px solid #e9d5ff', fontSize: '0.95rem',
    boxSizing: 'border-box', outline: 'none',
  },
  btn: {
    width: '100%', padding: '0.9rem',
    background: 'linear-gradient(135deg, #a78bfa, #6d28d9)',
    color: 'white', border: 'none', borderRadius: '10px',
    fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem',
  },
  btnDisabled: {
    width: '100%', padding: '0.9rem', background: '#ddd5fe',
    color: 'white', border: 'none', borderRadius: '10px',
    fontSize: '1rem', cursor: 'not-allowed', marginTop: '0.5rem',
  },
  footer: { textAlign: 'center', marginTop: '1.5rem', color: '#6b7280', fontSize: '0.9rem' },
  link: { color: '#7c3aed', textDecoration: 'none', fontWeight: '600' },
};
