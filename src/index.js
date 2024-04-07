import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import ApiProvider from './providers/ApiProvider';
import { GlobalFonts, GlobalStyle } from './styles';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Page from './components/layout/Page';
import App from './App';
import Admin from './pages/Admin';
import { FourOhFour } from './pages/FourOhFour';
import { Travel } from './pages/Travel';
import  ThingsToDo  from './pages/ThingsToDo';
import  WeddingDetails  from './pages/WeddingDetails';
import { WeddingRegistry } from './pages/WeddingRegistry';
import { Rsvp } from './pages/Rsvp';
import ProtectedRoute from './components/ProtectedRoute';
import reportWebVitals from './reportWebVitals';
import AdminDashboard from './pages/AdminDashboard';
import styled from 'styled-components';
import { PostHogProvider} from 'posthog-js/react'

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
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
    : (
      <Page>
        <h1 style={{fontSize: "2rem"}}>RSVP is not available yet.</h1>
        <FontAwesomeIcon style={{ marginBottom: '.3rem'}} icon={faScrewdriverWrench} size='2x' />
        <p style={{fontSize: "1.5rem"}}>Please check back soon.</p>
      </Page>
    )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}
    >
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
            <Route path='/dashboard/*' element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path='/details' element={<WeddingDetails />} />
            <Route path='/hotel-blocks' element={<Travel />} />
            <Route path='/registry' element={<WeddingRegistry />} />
            <Route path='/rsvp' element={<RsvpTimer />} />
            <Route path='/things-to-do' element={<ThingsToDo />} />

            <Route path='*' element={<FourOhFour />} />
          </Routes>
          </Container>
          <Footer />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </Auth0Provider>
    </QueryClientProvider>
    </PostHogProvider>
  </React.StrictMode>
);

reportWebVitals();
