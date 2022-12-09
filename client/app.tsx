import React from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Auth from './components/Auth/Auth';
import { UserContextProvider, useUser } from './context/UserContext.js';
import Header from './components/Header/Header.js';
import Muncher from './components/Muncher/Muncher';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition from 'react-speech-recognition';

const container = document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);

// tried for global but too much documentation
declare  const REACT_APP_SPEECHLY_API: string | undefined;

if (REACT_APP_SPEECHLY_API == null) {
  throw new Error('no speechly key');
}

const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(REACT_APP_SPEECHLY_API);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route>
            <Route index element={ <Landing /> } />
            <Route path='auth/:method' element={ <Auth /> } />
            <Route path='games/muncher' element={ <Muncher /> } />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  </React.StrictMode>
);
