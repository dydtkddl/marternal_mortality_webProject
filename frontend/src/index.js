import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ThankYou from './ThankYou';
import Admin from './Admin';
import Result from './Result';
import './index.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);