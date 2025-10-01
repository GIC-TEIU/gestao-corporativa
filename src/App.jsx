import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import Dashboard from "./pages/dashboard/Dashboard";
import PasswordSuccess from "./pages/password-recovery/PasswordSuccess";
import ResetPassword from "./pages/password-recovery/ResetPassword";
import ForgotPassword from "./pages/password-recovery/ForgotPassword";
import View from "./pages/view/View";
import Funcionario from "./pages/Funcionario/Funcionario";
import Envelope from "./pages/Envelope/Envelope";
import Profile from './pages/Profile/Profile';
import { EnvelopeProvider } from './context/EnvelopeContext';
import Destinatario from './pages/Envelope/Destinatario';
import RecipientSuccess from './components/envelopes/RecipientSuccess';
import HRPanel from './pages/HRPanel/HRPanel';
import DirectDocument from './components/envelopes/DirectDocument';

function App() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Dashboard />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* 1: formulário para digitar o e-mail */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* 2: usuário insere nova senha */}
        <Route path="/password-success" element={<PasswordSuccess />} />
        {/* 3: confirmação de sucesso */}


        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/view" element={
          <ProtectedRoute>
            <EnvelopeProvider><View /></EnvelopeProvider>
          </ProtectedRoute>
        } />

        <Route path="/funcionario" element={<ProtectedRoute><Funcionario /></ProtectedRoute>} />

        <Route path="/envelope" element={<ProtectedRoute><Envelope /></ProtectedRoute>} />

        <Route path="/envelope/destinatario" element={
          <ProtectedRoute>
            <EnvelopeProvider><Destinatario /></EnvelopeProvider>
          </ProtectedRoute>
        } />

         <Route path="/envelope/documento-direto" element={
          <ProtectedRoute>
            <EnvelopeProvider><DirectDocument /></EnvelopeProvider>
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
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

