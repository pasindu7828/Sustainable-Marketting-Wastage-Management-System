import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importing axios for making HTTP requests
import { useParams, useNavigate } from 'react-router';
import './UpdateUser.css'; // Updated CSS file for the User

function UpdateUser() {
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate(); // Hook to navigate between pages
  const { id } = useParams(); // Extracting user ID from the URL

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        const data = res.data.user;

        setInputs({
          fullName: data.fullName || '',
          email: data.email || '',
          password: data.password || '',
          phone: data.phone || '',
          address: data.address || '',
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/users/${id}`, {
      fullName: String(inputs.fullName),
      email: String(inputs.email),
      password: String(inputs.password),
      phone: String(inputs.phone),
      address: String(inputs.address),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();

    // Show alert message after successful update
    alert("User update is successful");

    navigate('/userdetails'); // Redirect to user dashboard after update
  };

  return (
    <div className="update-container">
      <h1>Update User</h1>
      <form onSubmit={handleSubmit} className="update-form">

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            value={inputs.fullName || ''}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputs.email || ''}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={inputs.password || ''}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={inputs.phone || ''}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={inputs.address || ''}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
