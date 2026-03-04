import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>📝 MonBlog</Link>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.username}>👋 {user.username}</span>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.btn}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Connexion</Link>
            <Link to="/register" style={styles.btnLink}>S'inscrire</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'1rem 2rem', background:'#1e293b', color:'white' },
  logo: { color:'white', textDecoration:'none', fontSize:'1.3rem', fontWeight:'bold' },
  links: { display:'flex', alignItems:'center', gap:'1.5rem' },
  link: { color:'#94a3b8', textDecoration:'none' },
  btnLink: { background:'#3b82f6', color:'white', padding:'0.5rem 1rem',
    borderRadius:'6px', textDecoration:'none' },
  btn: { background:'transparent', border:'1px solid #94a3b8', color:'#94a3b8',
    padding:'0.5rem 1rem', borderRadius:'6px', cursor:'pointer' },
  username: { color:'#60a5fa' },
};