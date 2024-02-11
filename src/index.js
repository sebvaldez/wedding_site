import React, { useEffect, useState } from 'react';
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

// initialize GA here = also only initialize when react env is prod

const queryClient = new QueryClient();

const RsvpTimer = () => {
  const [isTimeForRsvp, setIsTimeForRsvp] = useState(false);

  useEffect(() => {
    console.log('REACT ENV:',process.env.REACT_APP_ENV)
    const checkTime = () => {
      if (process.env.REACT_APP_ENV === 'development') {
        setIsTimeForRsvp(true);
      } else {
        // const targetDateTime = new Date('2023-11-21T13:20:00-08:00'); // 1:20 PM PST on 11/21/2023
        const targetDateTime = new Date('2024-03-01T13:00:00').toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
        const currentDateTime = new Date();

        setIsTimeForRsvp(currentDateTime >= targetDateTime);
      }
    };

    // Check immediately and then set an interval
    checkTime();
    const intervalId = setInterval(checkTime, 60000); // Check every minute

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return isTimeForRsvp
    ? <ApiProvider><Rsvp /></ApiProvider>
    : <div>RSVP is not available yet.</div>;
};

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
            <Route path='/travel' element={<Travel />} />
            <Route path='/registry' element={<WeddingRegistry />} />
            <Route path='/rsvp' element={<RsvpTimer />} />

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
