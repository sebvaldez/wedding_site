import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import ApiProvider from './providers/ApiProvider';
import { GlobalFonts, GlobalStyle } from './styles';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import App from './App';
import Admin from './pages/Admin';
import { FourOhFour } from './pages/FourOhFour';
import { Gallery } from './pages/Gallery';
import { Travel } from './pages/Travel';
import { WeddingRegistry } from './pages/WeddingRegistry';
// import { Rsvp } from './pages/Rsvp';
import ProtectedRoute from './components/ProtectedRoute';
import reportWebVitals from './reportWebVitals';
import AdminDashboard from './pages/AdminDashboard';

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
            {/* <Route path='/rsvp' element={
              <ApiProvider>
                <Rsvp />
              </ApiProvider>
            } /> */}
            <Route path='*' element={<FourOhFour />} />
          </Routes>
          <Footer />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </Auth0Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
