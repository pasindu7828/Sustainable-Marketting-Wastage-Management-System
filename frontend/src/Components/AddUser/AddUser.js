import React, { useState } from 'react';
import './AddUser.css'; // Make sure the path is correct

import Nav from '../Nav/Nav'; // Importing the navigation component
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddUser() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State to manage form inputs
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    password: '',
  });

  // Handles changes to form inputs
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to validate input fields
  const validate = () => {
    let valid = true;
    const newErrors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputs.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Phone number validation (should be exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(inputs.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
      valid = false;
    }

    // Password validation (minimum 6 characters)
    if (inputs.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors); // Updating state with validation errors
    return valid; // Returning whether the form is valid
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return; 
    }

    try {
      await sendRequest(); // Send user data to the backend
      alert('User added successfully!');

      // Navigate to the users page or any other page after successful submission
      navigate('/userdetails');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Function to send the user data to the backend
  const sendRequest = async () => {
    await axios.post('http://localhost:5000/users', {
      fullName: inputs.fullName,
      email: inputs.email,
      password: inputs.password,
      phone: inputs.phone,
      address: inputs.address,
    });
  };

  return (
    <div>
      <Nav /> {/* Navigation component */}
      <div className="container">
        <h1>Add User</h1>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" name="fullName" onChange={handleChange} value={inputs.fullName} required />

          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} value={inputs.email} required />
          {errors.email && <p className="error">{errors.email}</p>} {/* Display email validation error */}

          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} value={inputs.password} required />
          {errors.password && <p className="error">{errors.password}</p>} {/* Display password validation error */}

          <label>Phone</label>
          <input type="text" name="phone" onChange={handleChange} value={inputs.phone} required />
          {errors.phone && <p className="error">{errors.phone}</p>} {/* Display phone validation error */}

          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address} required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
