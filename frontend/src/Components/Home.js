import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 600, margin: '60px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', textAlign: 'center' }}>
      <h2>Welcome{user && user.name ? `, ${user.name}` : ''}!</h2>
      <p>This is your home page.</p>
      <button onClick={handleLogout} style={{ marginTop: 24, padding: 10, background: '#2e7d32', color: '#fff', border: 'none', borderRadius: 4 }}>Logout</button>
    </div>
  );
};

export default Home; 