import React from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Auth from './components/Auth/Auth';
import { UserContextProvider, useUser } from './context/UserContext.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Muncher from './components/Muncher/Muncher';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition from 'react-speech-recognition';

const container = document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);

if (process.env.REACT_APP_SPEECHLY_API == null) {
  console.log(process.env.REACT_APP_SPEECHLY_API);
  throw new Error('no speechly key');
}

const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(process.env.REACT_APP_SPEECHLY_API);
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
        <Footer />
      </Router>
    </UserContextProvider>
  </React.StrictMode>
);
