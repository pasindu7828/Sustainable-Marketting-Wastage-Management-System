import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './User.css'; // Make sure to import the existing CSS for styling

function User(props) {
  // Destructuring props to extract user details
  const { _id, fullName, email, phone, address } = props.user; // Change appointment to user
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle deleting a user
  const deleteHandler = async () => {
    try {
      // Sending a DELETE request to the backend
      await axios.delete(`http://localhost:5000/users/${_id}`);
      
      // Show success alert
      alert('Delete is successfully done!');

      // Navigating to the user dashboard (or any other page)
      navigate('/userdetails');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="user-container">
      {/* Displaying user details in a table format */}
      <table className="user-table">
        <tbody>
          <tr>
            <td><strong>ID:</strong></td>
            <td>{_id}</td>
          </tr>
          <tr>
            <td><strong>Full Name:</strong></td>
            <td>{fullName}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{email}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>{address}</td>
          </tr>
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="actions">
        <Link to={`/users/${_id}`} className="update-link">Update</Link>
        <button onClick={deleteHandler} className="delete-button">Delete</button>
      </div>
    </div>
  );
}

export default User;
