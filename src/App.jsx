import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/layout/Layout';
import { ToastProvider } from './components/common/Toast';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy loaded pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ListPessoas = React.lazy(() => import('./pages/ListPessoas'));
const AddPessoa = React.lazy(() => import('./pages/AddPessoa'));
const EditPessoa = React.lazy(() => import('./pages/EditPessoa'));
const HealthCheck = React.lazy(() => import('./pages/HealthCheck'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pessoas" element={<ListPessoas />} />
                <Route path="/pessoas/novo" element={<AddPessoa />} />
                <Route path="/pessoas/:id/editar" element={<EditPessoa />} />
                <Route path="/health" element={<HealthCheck />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
