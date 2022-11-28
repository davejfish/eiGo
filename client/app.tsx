import React from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Auth from './components/Auth/Auth';

const container = document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route>
          <Route index element={ <Landing /> } />
          <Route path='auth/:method' element={ <Auth /> } />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
