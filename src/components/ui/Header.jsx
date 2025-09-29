import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, UserCircle2, Bell } from "lucide-react";
import NotificationsModal from "./NotificationsModal";

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getFirstName = (name) => {
    if (!name) return "Usuário";
    return name.split(" ")[0];
  };

  // Buscar apenas a contagem de não lidas
  const fetchUnreadCount = async () => {
    try {
      // Exemplo - substitua pela sua API
      const count = 3; // Mock - substitua por: await notificationService.getUnreadCount(currentUser.id);
      setUnreadCount(count);
    } catch (error) {
      console.error("Erro ao buscar contagem:", error);
    }
  };

  const handleOpenNotifications = () => {
    setShowNotificationsModal(true);
  };

  const handleCloseNotifications = () => {
    setShowNotificationsModal(false);
  };

  // Atualizar contador quando modal fechar (para refletir mudanças)
  const handleNotificationsUpdate = () => {
    fetchUnreadCount();
  };

  useEffect(() => {
    fetchUnreadCount();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const firstName = getFirstName(currentUser?.nome);

  return (
    <>
      <div className="px-2 sm:px-4 bg-[#0D6578] flex justify-between items-center">
        <Link to="/dashboard">
          <img
            src="/imgs/logo-marinho-white.png"
            alt="Logo"
            className="p-2 w-[120px] sm:w-[150px] transition-all hover:opacity-80 cursor-pointer"
          />
        </Link>
        
        <div className="hidden md:flex flex justify-center gap-12 text-white font-poppins font-light text-sm">
          <Link to="/dashboard" className="hover:opacity-80">Inicio</Link>
          <Link to="/envelope" className="hover:opacity-80">Novo Envelope</Link>
          <Link to="/funcionario" className="hover:opacity-80">Funcionários</Link>
          <Link to="/view" className="hover:opacity-80">Consulta Envelopes</Link>
          <Link to="/hr-panel" className="hover:opacity-80">Painel RH</Link>
        </div>
        
        {/* Botão de Notificações */}
        <div className="flex justify-left ml-4">
          <div className="relative">
            <Bell 
              className="w-6 h-6 text-white transition-all duration-200 hover:opacity-80 cursor-pointer"
              onClick={handleOpenNotifications}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1 py-2">
          <div className="flex flex-row justify-between gap-2 items-center">
            <p className="text-white h-8 font-poppins flex items-center text-sm sm:text-base">
              {firstName}
            </p>

            <Link to="/profile">
              <UserCircle2 className="w-8 h-8 text-white transition-all duration-200 hover:opacity-80 cursor-pointer" />
            </Link>
          </div>

          <div
            onClick={handleLogout}
            className="flex flex-row gap-2 items-center cursor-pointer group"
          >
            <LogOut className="w-5 h-5 text-white transition group-hover:opacity-80" />
            <span className="hidden sm:inline text-white font-poppins text-sm group-hover:underline">
              Sair
            </span>
          </div>
        </div>
      </div>

      {/* Modal de Notificações */}
      <NotificationsModal 
        isOpen={showNotificationsModal}
        onClose={handleCloseNotifications}
        onNotificationsUpdate={handleNotificationsUpdate}
      />
    </>
  );
}

export default Header;