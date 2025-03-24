import React from 'react';
import './App.css';
import Home from "./Components/Home/home";
import { Route, Routes } from 'react-router-dom';
import Users from "./Components/User Detail/Users";
import AddUser from "./Components/AddUser/AddUser";
import UpdateUser from './Components/Update User/UpdateUser';




function App() {
  return (
    <div>
      
      <React.Fragment>
        <Routes>
          <Route path="/" element={<AddUser />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userdetails" element={<Users />} />
          <Route path="/users/:id" element={<UpdateUser />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;