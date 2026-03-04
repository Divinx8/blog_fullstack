import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>✦</span>
          <span>Mon<span style={styles.logoAccent}>Blog</span></span>
        </Link>

        <div style={styles.links}>
          <Link to="/" style={{...styles.link, ...(isActive('/') ? styles.linkActive : {})}}>
            Accueil
          </Link>
          {user && (
            <Link to="/dashboard" style={{...styles.link, ...(isActive('/dashboard') ? styles.linkActive : {})}}>
              Dashboard
            </Link>
          )}
        </div>

        <div style={styles.actions}>
          {user ? (
            <>
              <div style={styles.avatar}>
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span style={styles.username}>{user.username}</span>
              <button onClick={handleLogout} style={styles.btnLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.btnLogin}>Connexion</Link>
              <Link to="/register" style={styles.btnRegister}>S'inscrire →</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    padding: '0 2rem', position: 'sticky', top: 0, zIndex: 1000,
    boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
  },
  inner: {
    maxWidth: '1100px', margin: '0 auto', height: '70px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    color: 'white', textDecoration: 'none',
    fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em',
  },
  logoIcon: { color: '#a78bfa', fontSize: '1.2rem' },
  logoAccent: { color: '#a78bfa' },
  links: { display: 'flex', gap: '0.5rem' },
  link: {
    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
    padding: '0.5rem 1rem', borderRadius: '8px',
    fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.2s',
  },
  linkActive: {
    color: 'white', background: 'rgba(167,139,250,0.2)',
  },
  actions: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  avatar: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #a78bfa, #6d28d9)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'white', fontWeight: '700', fontSize: '0.9rem',
  },
  username: { color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' },
  btnLogout: {
    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
    color: 'white', padding: '0.45rem 1rem', borderRadius: '8px',
    cursor: 'pointer', fontSize: '0.85rem',
  },
  btnLogin: {
    color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
    padding: '0.45rem 1rem', fontSize: '0.9rem',
  },
  btnRegister: {
    background: 'linear-gradient(135deg, #a78bfa, #6d28d9)',
    color: 'white', textDecoration: 'none',
    padding: '0.45rem 1.2rem', borderRadius: '8px',
    fontSize: '0.9rem', fontWeight: '600',
  },
};