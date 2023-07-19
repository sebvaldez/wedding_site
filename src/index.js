import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalFonts, GlobalStyle } from './styles';
import Header from './components/Header';
import Footer from './components/Footer';
import App from './App';
import {FourOhFour} from './pages/FourOhFour';
import {Travel} from './pages/Travel'
import {WeddingRegistry} from './pages/WeddingRegistry'
import {Rsvp} from './pages/Rsvp'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalFonts />
    <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<App/>} />
          <Route path='/travel' element={<Travel/>} />
          <Route path='/registry' element={<WeddingRegistry/>} />
          <Route path='/rsvp' element={<Rsvp/>} />
          <Route path='*' element={<FourOhFour />} />
        </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
