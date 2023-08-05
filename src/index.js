import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { GlobalFonts, GlobalStyle } from './styles';
import Header from './components/Header';
import Footer from './components/Footer';
import App from './App';
import Admin from './pages/Admin';
import { FourOhFour } from './pages/FourOhFour';
import { Gallery } from './pages/Gallery';
import { Travel } from './pages/Travel'
import { WeddingRegistry } from './pages/WeddingRegistry'
import { Rsvp } from './pages/Rsvp'
import ProtectedRoute from './components/ProtectedRoute'
import reportWebVitals from './reportWebVitals';
import AdminDashboard from './pages/AdminDashboard';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/dashboard`
      }}
    >
      <GlobalStyle />
      <GlobalFonts />
      <Router>
        <Header/>
          <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/admin' element={<Admin/>} />
            <Route path='/dashboard' element={
              <ProtectedRoute>
                <AdminDashboard/>
              </ProtectedRoute>
            } />
            <Route path='/gallery' element={<Gallery/>} />
            <Route path='/travel' element={<Travel/>} />
            <Route path='/registry' element={<WeddingRegistry/>} />
            <Route path='/rsvp' element={<Rsvp/>} />
            <Route path='*' element={<FourOhFour />} />
          </Routes>
        <Footer />
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
