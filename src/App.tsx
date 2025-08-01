import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PWAInstall } from './components/PWAInstall';
import { DashboardLayout } from './components/DashboardLayout';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { CreateOrganization } from './pages/CreateOrganization';
import { ChatPage } from './pages/ChatPage';
import { Organizations } from './pages/Organizations';
import { Agents } from './pages/Agents';
import { DataSources } from './pages/DataSources';
import { Learning } from './pages/Learning';

// Componente para rotas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Componente para rotas do dashboard
const DashboardRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas protegidas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <Dashboard />
            </DashboardRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizations"
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <Organizations />
            </DashboardRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-organization"
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <CreateOrganization />
            </DashboardRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/agents"
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <Agents />
            </DashboardRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/data-sources"
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <DataSources />
            </DashboardRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning"
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <Learning />
            </DashboardRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <ChatPage />
            </DashboardRoute>
          </ProtectedRoute>
        }
      />

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
                           <AppRoutes />
                 <PWAInstall />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
