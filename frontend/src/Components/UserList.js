import React, { useEffect, useState } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/users?adminEmail=admin@gmail.com`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to fetch users');
        setUsers([]);
        return;
      }
      setUsers(data.filter(u => u.email !== 'admin@gmail.com'));
    } catch (err) {
      setError('Network error');
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`${API_BASE_URL}/users/${id}?adminEmail=admin@gmail.com`, { method: 'DELETE' });
        const data = await res.json();
        if (!res.ok) {
          alert(data.message || 'Delete failed');
          return;
        }
        fetchUsers();
      } catch (err) {
        alert('Network error');
      }
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h2>User Management</h2>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr><td colSpan="3" style={{ textAlign: 'center', padding: 16 }}>No users found.</td></tr>
          )}
          {users.map(user => (
            <tr key={user._id}>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>{user.name}</td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>
                <button onClick={() => alert(`Name: ${user.name}\nEmail: ${user.email}`)} style={{ marginRight: 8 }}>View</button>
                <button onClick={() => window.location.href = `/edit-user/${user.email}`} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={{ background: '#d32f2f', color: '#fff' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList; 