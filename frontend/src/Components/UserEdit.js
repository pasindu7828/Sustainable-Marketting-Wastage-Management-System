import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UserEdit = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Find user by email
    const fetchUser = async () => {
      setError('');
      try {
        const res = await fetch(`${API_BASE_URL}/users?adminEmail=admin@gmail.com`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Failed to fetch user');
          return;
        }
        const found = data.find(u => u.email === email);
        if (found) {
          setUser(found);
          setUserId(found._id);
          setName(found.name);
          setPassword('');
        }
      } catch (err) {
        setError('Network error');
      }
    };
    fetchUser();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !password) {
      setError('Name and password are required.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Update failed');
        return;
      }
      // If current user is editing self, update currentUser
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.email === email) {
        localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, name }));
        navigate('/home');
      } else {
        navigate('/users');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  if (!user) return <div style={{ margin: '60px auto', textAlign: 'center' }}>User not found.</div>;

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Name</label><br />
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label><br />
          <input type="email" value={email} disabled style={{ width: '100%', padding: 8, background: '#eee' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 10, background: '#2e7d32', color: '#fff', border: 'none', borderRadius: 4 }}>Save</button>
      </form>
    </div>
  );
};

export default UserEdit; 