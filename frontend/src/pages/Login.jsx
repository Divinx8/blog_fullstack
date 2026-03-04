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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>👋 Connexion</h1>
        <p style={styles.sub}>Content de te revoir !</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Nom d'utilisateur</label>
            <input style={styles.input} type="text" placeholder="tonusername"
              value={form.username}
              onChange={e => setForm({...form, username: e.target.value})}
              required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Mot de passe</label>
            <input style={styles.input} type="password" placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              required />
          </div>
          <button style={loading ? styles.btnDisabled : styles.btn} disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p style={styles.footer}>
          Pas encore de compte ? <Link to="/register" style={styles.link}>S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' },
  card: { background: 'white', padding: '2.5rem', borderRadius: '16px', width: '100%',
    maxWidth: '420px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  title: { fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.25rem' },
  sub: { color: '#64748b', marginBottom: '2rem' },
  error: { background: '#fef2f2', color: '#dc2626', padding: '0.75rem 1rem',
    borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' },
  field: { marginBottom: '1.2rem' },
  label: { display: 'block', marginBottom: '0.4rem', fontWeight: '600',
    color: '#374151', fontSize: '0.9rem' },
  input: { width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
    border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none',
    boxSizing: 'border-box' },
  btn: { width: '100%', padding: '0.85rem', background: '#3b82f6', color: 'white',
    border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600',
    cursor: 'pointer', marginTop: '0.5rem' },
  btnDisabled: { width: '100%', padding: '0.85rem', background: '#93c5fd', color: 'white',
    border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600',
    cursor: 'not-allowed', marginTop: '0.5rem' },
  footer: { textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' },
  link: { color: '#3b82f6', textDecoration: 'none', fontWeight: '600' },
};