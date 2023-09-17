import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ApiProvider from './providers/ApiProvider';
import { GlobalFonts, GlobalStyle } from './styles';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import App from './App';
import Admin from './pages/Admin';
import { FourOhFour } from './pages/FourOhFour';
import { Gallery } from './pages/Gallery';
import { Travel } from './pages/Travel';
import { WeddingRegistry } from './pages/WeddingRegistry';
import { Rsvp } from './pages/Rsvp';
import ProtectedRoute from './components/ProtectedRoute';
import reportWebVitals from './reportWebVitals';
import AdminDashboard from './pages/AdminDashboard';

import styled from 'styled-components';

if (process.env.REACT_APP_ENV === 'production') {
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = "https://www.googletagmanager.com/gtag/js?id=G-W8YD1SX85Y";
  document.body.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-W8YD1SX85Y');
  `;
  document.body.appendChild(script2);
}

const Container = styled.div`
  width: 100%;

  @media (max-width: 1024px) {
    // For viewports smaller than 1024px, the max-width will be the full viewport width
    max-width: 100%;
  }

  @media (min-width: 1025px) {
    // For viewports larger than 1024px, the max-width will be 80% of the viewport width
    max-width: calc(80vw);
  }

  margin: 0 auto;  // centers the container on larger screens
`;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
          <Header />
          <Container>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/dashboard' element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/travel' element={<Travel />} />
            <Route path='/registry' element={<WeddingRegistry />} />
            <Route path='/rsvp' element={
              <ApiProvider>
                <Rsvp />
              </ApiProvider>
            } />
            <Route path='*' element={<FourOhFour />} />
          </Routes>
          </Container>
          <Footer />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </Auth0Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
