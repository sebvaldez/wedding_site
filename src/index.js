import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostHogProvider} from 'posthog-js/react'
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { GlobalFonts, GlobalStyle } from './styles';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import App from './App';
import { FourOhFour } from './pages/FourOhFour';
import { Travel } from './pages/Travel';
import  ThingsToDo  from './pages/ThingsToDo';
import  WeddingDetails  from './pages/WeddingDetails';
import { WeddingRegistry } from './pages/WeddingRegistry';
import { Rsvp } from './pages/Rsvp';
import {Faq} from './pages/Faq';
import ProtectedRoute from './components/ProtectedRoute';
import reportWebVitals from './reportWebVitals';


const Admin = lazy(() => import('./pages/Admin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

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
            <Route path='/admin' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Admin />
              </Suspense>
            } />
            <Route path='/dashboard/*' element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path='/faq' element={<Faq />} />
            <Route path='/details' element={<WeddingDetails />} />
            <Route path='/hotel-blocks' element={<Travel />} />
            <Route path='/registry' element={<WeddingRegistry />} />
            <Route path='/rsvp' element={<Rsvp />} />
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
