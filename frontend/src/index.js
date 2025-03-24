import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Import the App component
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* Render the App component */}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
