// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando as páginas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import RequestReset from './pages/password-recovery/RequestReset';
import ResetPassword from './pages/password-recovery/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota da Homepage */}
        <Route path="/" element={<Home />} />

        {/* Rotas de Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas de Recuperação de Senha */}
        <Route path="/forgot-password" element={<RequestReset />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* -> CRIE NOVAS ROTAS AQUI!!*/}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;