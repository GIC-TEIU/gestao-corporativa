// src/App.jsx

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Importando as páginas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from "./components/layout/header";
import Home from './pages/home/Home';
import Dashboard from "./pages/dashboard/Dashboard";
import RequestReset from "./pages/password-recovery/RequestReset"
import ResetPassword from "./pages/password-recovery/ResetPassword"
import Password from "./pages/password-recovery/Password"
import View from "./pages/view/view"

;



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
        <Route path="/password" element={<Password />} />

        <Route path="/dashboard" element={<> <Header /> <Dashboard /> </> }/>
         <Route path="/view" element={<>  <Header /> <View /> </> }/> 

        {/* -> CRIE NOVAS ROTAS AQUI!!*/}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;