import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Extrato from './pages/Extrato';
import Pix from './pages/Pix';
import Cartoes from './pages/Cartoes';
import Investimentos from './pages/Investimentos';

// Componente para rotas protegidas por autenticação
function PrivateRoute({ children }) {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
        Carregando sessão segura...
      </div>
    );
  }

  return signed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas Protegidas do Internet Banking */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/extrato"
            element={
              <PrivateRoute>
                <Extrato />
              </PrivateRoute>
            }
          />
          <Route
            path="/pix"
            element={
              <PrivateRoute>
                <Pix />
              </PrivateRoute>
            }
          />
          <Route
            path="/cartoes"
            element={
              <PrivateRoute>
                <Cartoes />
              </PrivateRoute>
            }
          />
          <Route
            path="/investimentos"
            element={
              <PrivateRoute>
                <Investimentos />
              </PrivateRoute>
            }
          />

          {/* Rota Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
