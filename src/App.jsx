import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PermissionProvider } from './context/PermissionContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { EnvelopeProvider } from './context/EnvelopeContext';
import { AppProvider } from './context/Appcontext';

import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import PasswordSuccess from './pages/password-recovery/PasswordSuccess';
import ResetPassword from './pages/password-recovery/ResetPassword';
import ForgotPassword from './pages/password-recovery/ForgotPassword';
import View from './pages/view/View';
import Funcionario from './pages/Funcionario/Funcionario';
import Envelope from './pages/Envelope/Envelope';
import Destinatario from './pages/Envelope/Destinatario';
import DirectDocument from './components/envelopes/DirectDocument';
import RecipientSuccess from './components/envelopes/RecipientSuccess';
import HRPanel from './pages/HRPanel/HRPanel';
import UserManagement from './pages/user-management/UserManagement';
import EnvelopeDetail from './pages/view/EnvelopeDetail';
import Profile from './pages/Profile/Profile';

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona / para dashboard ou login */}
        <Route path="/" element={<Navigate to={currentUser ? "/dashboard" : "/login"} replace />} />

        {/* Rotas Públicas */}
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />

        {/* Rotas Protegidas */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/view" element={
          <ProtectedRoute>
            <EnvelopeProvider>
              <View />
            </EnvelopeProvider>
          </ProtectedRoute>
        } />

        <Route path="/view/envelope-detail" element={
          <ProtectedRoute>
            <EnvelopeDetail />
          </ProtectedRoute>
        } />

        <Route path="/funcionario" element={
          <ProtectedRoute>
            <Funcionario />
          </ProtectedRoute>
        } />

        <Route path="/envelope" element={
          <ProtectedRoute>
            <Envelope />
          </ProtectedRoute>
        } />

        <Route path="/envelope/destinatario" element={
          <ProtectedRoute>
            <EnvelopeProvider>
              <Destinatario />
            </EnvelopeProvider>
          </ProtectedRoute>
        } />

        <Route path="/envelope/documento-direto" element={
          <ProtectedRoute>
            <EnvelopeProvider>
              <DirectDocument />
            </EnvelopeProvider>
          </ProtectedRoute>
        } />

        <Route path="/envelope/sucesso" element={
          <ProtectedRoute>
            <RecipientSuccess />
          </ProtectedRoute>
        } />

        <Route path="/hr-panel" element={
          <ProtectedRoute>
            <EnvelopeProvider>
              <HRPanel />
            </EnvelopeProvider>
          </ProtectedRoute>
        } />

        <Route path="/user-management" element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PermissionProvider>
        <EmployeeProvider>
          <AppProvider>
            <AppContent />
          </AppProvider>
        </EmployeeProvider>
      </PermissionProvider>
    </AuthProvider>
  );
}
