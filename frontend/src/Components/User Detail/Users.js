import React, { useState, useEffect } from 'react'; 
import Nav from "../Nav/Nav"; 
import axios from "axios"; // Importing axios for making HTTP requests
import User from '../User/User'; // Import the User component (renamed from Appointment)

const URL = "http://localhost:5000/users"; // API endpoint to fetch user data

// Function to fetch user data from the backend
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data); // Sending GET request and returning the response data
};

function Users() {
  // State hook to store the fetched users
  const [users, setUsers] = useState(); 

  // Using useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users)); 
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <Nav /> {/* Navigation component */}
      <div>
        {/* Conditional rendering: check if users are available, then map through them */}
        {users && users.map((user, i) => ( 
          <div key={i}> 
            {/* Rendering User component and passing the user data as props */}
            <User user={user} /> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
