import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PermissionProvider } from './context/PermissionContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { EnvelopeProvider } from './context/EnvelopeContext';
import { AppProvider } from './context/Appcontext';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PasswordSuccess from './pages/PasswordSuccess';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import EnvelopeSearch from './pages/EnvelopeSearch';
import EmailSignatures from './pages/EmailSignatures';
import RequestForm from './pages/RequestForm';
import RecipientFlow from './pages/RecipientFlow';
import DirectDocument from './components/request-form/DirectDocumentForm';
import RecipientSuccess from './components/envelope-search/RecipientFlowSuccess';
import HRPanel from './pages/HRPanel';
import UserManagement from './pages/UserManagement';
import PdfPreviewForSignature from './pages/PdfPreviewForSignature';
import Profile from './pages/Profile';

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona / para Home ou login */}
        <Route path="/" element={<Navigate to={currentUser ? "/Home" : "/login"} replace />} />

        {/* Rotas Públicas */}
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/Home" replace />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/Home" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />

        {/* Rotas Protegidas */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/envelope-search" element={
          <ProtectedRoute>
            <EnvelopeProvider>
              <EnvelopeSearch />
            </EnvelopeProvider>
          </ProtectedRoute>
        } />

        <Route path="/envelope-search/pdf-preview-for-signature" element={
          <ProtectedRoute>
            <EnvelopeProvider>
              <PdfPreviewForSignature />
            </EnvelopeProvider>
          </ProtectedRoute>
        } />

        <Route path="/email-signatures" element={
          <ProtectedRoute>
            <EmailSignatures />
          </ProtectedRoute>
        } />

        <Route path="/request-form" element={
          <ProtectedRoute>
            <RequestForm />
          </ProtectedRoute>
        } />

        <Route path="/envelope/recipient-flow" element={
          <ProtectedRoute>
            <EnvelopeProvider>
              <RecipientFlow />
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
