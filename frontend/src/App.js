import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import Users from './Components/User Detail/Users';
import AddUser from './Components/AddUser/AddUser';
import UpdateUser from './Components/Update User/UpdateUser';
import Login from './Components/Login/Login';
import AdminDashboard from './Components/Admin/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token || !user) {
    // Clear any invalid state
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token || !user || user.role !== 'admin') {
    // Clear any invalid state
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [mountKey, setMountKey] = React.useState(Date.now());

  React.useEffect(() => {
    const handleStorageChange = () => {
      setMountKey(Date.now());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="app-container">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AddUser />} />

        {/* Protected routes */}
        <Route 
          path="/mainhome" 
          element={
            <ProtectedRoute>
              <Home key={mountKey} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/adduser" 
          element={
            <ProtectedRoute>
              <AddUser key={mountKey} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/userdetails" 
          element={
            <ProtectedRoute>
              <Users key={mountKey} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users/:id" 
          element={
            <ProtectedRoute>
              <UpdateUser key={mountKey} />
            </ProtectedRoute>
          } 
        />

        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboard key={mountKey} />
            </AdminRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Navigate to="/admin" replace />
            </ProtectedRoute>
          } 
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;