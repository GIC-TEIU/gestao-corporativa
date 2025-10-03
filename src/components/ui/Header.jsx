import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Ajuste o caminho conforme necessário
import { LogOut, UserCircle2, Bell, Menu, X } from "lucide-react";
import NotificationsModal from "./NotificationsModal"; // Ajuste o caminho conforme necessário

function Header({ showLinks = true, showNotifications = true }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  // menu hamburguer
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getFirstName = (name) => {
    if (!name) return "Usuário";
    return name.split(" ")[0];
  };

  const fetchUnreadCount = async () => {
    try {
      const count = 3; // mock — depois troca pela API
      setUnreadCount(count);
    } catch (error) {
      console.error("Erro ao buscar contagem:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [currentUser]);
    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const firstName = getFirstName(currentUser?.nome);

  const NavLinks = ({ onClick }) => (
    <>
      <Link to="/dashboard" className="hover:opacity-80" onClick={onClick}>Inicio</Link>
      <Link to="/envelope" className="hover:opacity-80" onClick={onClick}>Novo Envelope</Link>
      <Link to="/funcionario" className="hover:opacity-80" onClick={onClick}>Funcionários</Link>
      <Link to="/view" className="hover:opacity-80" onClick={onClick}>Consulta Envelopes</Link>
      <Link to="/hr-panel" className="hover:opacity-80" onClick={onClick}>Painel RH</Link>
    </>
  );

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 bg-[#0D6578] flex justify-between items-center w-full shadow-lg">
        {/* Logo */}
        <Link to="/dashboard">
          <img
            src="/imgs/logo-marinho-white.png"
            alt="Logo"
            className="p-2 w-[120px] md:w-[150px] transition-all hover:opacity-80 cursor-pointer"
          />
        </Link>

        {/* 1. Menu Hamburguer*/}
        {showLinks && (
          <button
            className="md:hidden text-white ml-auto mr-4" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}

        {showLinks && (
          <div className="hidden md:flex justify-center gap-4 lg:gap-8 text-white font-poppins font-light text-sm">
            <NavLinks />
          </div>
        )}

        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Sininho (Notificações) */}
          {showNotifications && (
            <div className="relative">
              <Bell
                fill="white"
                className="w-6 h-6 text-white transition-all duration-200 hover:opacity-80 cursor-pointer"
                onClick={() => setShowNotificationsModal(true)}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
          )}

          {/* Perfil e Logout */}
          <div className="flex flex-col items-end py-2">
            <div className="flex flex-row gap-2 items-center">
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
      </div>

      {/* menu lateral */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)} 
        >
          {/* Menu Lateral */}
          <div 
            className={`w-64 bg-[#0D6578] h-full shadow-2xl p-6 flex flex-col space-y-4 absolute left-0 top-0 transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="self-end text-white hover:opacity-80"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
            <NavLinks onClick={() => setIsMenuOpen(false)} className="text-white text-lg hover:text-brand-cyan" />
          </div>
          
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      )}

      <NotificationsModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        onNotificationsUpdate={fetchUnreadCount}
      />
    </>
  );
}

export default Header;