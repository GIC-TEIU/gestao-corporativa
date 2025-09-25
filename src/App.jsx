import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Importando as páginas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import Dashboard from "./pages/dashboard/Dashboard";
import RequestReset from "./pages/password-recovery/RequestReset";
import ResetPassword from "./pages/password-recovery/ResetPassword";
import Password from "./pages/password-recovery/Password";
import View from "./pages/view/View"; 
import Funcionario from "./pages/Funcionario/Funcionario";
import Envelope from "./pages/Envelope/Envelope";
import Profile from './pages/Profile/Profile';
import { EnvelopeProvider } from './context/EnvelopeContext';
import Destinatario from './pages/Envelope/Destinatario';

function App() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota da Homepage */}
        <Route path="/" element={<Home />} />

        {/* Rotas de Autenticação */}
        <Route path="/login" element={!currentUser ? <Login /> : <Dashboard />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Dashboard />} />

        {/* Rotas de Recuperação de Senha */}
        <Route path="/forgot-password" element={<RequestReset />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/password" element={<Password />} />

        {/* --- Rotas Protegidas Simplificadas --- */}

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        
        <Route path="/view" element={
          <ProtectedRoute>
            <EnvelopeProvider>
              <View />
            </EnvelopeProvider>
          </ProtectedRoute>
        }/> 
          
        <Route path="/funcionario" element={
          <ProtectedRoute>
            <Funcionario />
          </ProtectedRoute>
        }/>
        
        <Route path="/envelope" element={
          <ProtectedRoute>
            <Envelope />
          </ProtectedRoute>
        }/>
        <Route path="/envelope/destinatario" element={
          <ProtectedRoute>
            <EnvelopeProvider>
              <Destinatario />
            </EnvelopeProvider>
          </ProtectedRoute>
        }/>
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

