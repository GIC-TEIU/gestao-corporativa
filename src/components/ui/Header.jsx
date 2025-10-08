import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, UserCircle2, Bell, Menu, X } from "lucide-react";
import NotificationsModal from "./NotificationsModal";

function Header({ showLinks = true, showNotifications = true }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
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
      const count = 3; 
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const firstName = getFirstName(currentUser?.nome);

  const DesktopNavLinks = () => (
<div className="flex justify-center gap-3 text-sm text-white font-poppins font-light md:gap-4 md:text-xs lg:gap-6 lg:text-sm xl:gap-8">      <Link to="/dashboard" className="hover:opacity-80">
        Inicio
      </Link>
      <Link to="/envelope" className="hover:opacity-80">
        Novo Envelope
      </Link>
      <Link to="/funcionario" className="hover:opacity-80">
        Funcionários
      </Link>
      <Link to="/view" className="hover:opacity-80">
        Consulta Envelopes
      </Link>
      <Link to="/hr-panel" className="hover:opacity-80">
        Painel RH
      </Link>
    </div>
  );

  const MobileNavContent = ({ onClick, className }) => (
    <>
      <div className="text-xl font-bold mb-4 border-b border-white/20 pb-2 text-blue-200">
        Olá, {firstName}
      </div>
      <Link
        to="/profile"
        className={`hover:opacity-80 ${className}`}
        onClick={onClick}
      >
        <UserCircle2 className="inline mr-2 w-5 h-5" />
        Perfil
      </Link>
      <Link
        to="/dashboard"
        className={`hover:opacity-80 ${className}`}
        onClick={onClick}
      >
        Inicio
      </Link>
      <Link
        to="/envelope"
        className={`hover:opacity-80 font-regular ${className}`}
        onClick={onClick}
      >
        Novo Envelope
      </Link>
      <Link
        to="/funcionario"
        className={`hover:opacity-80 ${className}`}
        onClick={onClick}
      >
        Funcionários
      </Link>
      <Link
        to="/view"
        className={`hover:opacity-80 ${className}`}
        onClick={onClick}
      >
        Consulta Envelopes
      </Link>
      <Link
        to="/hr-panel"
        className={`hover:opacity-80 ${className}`}
        onClick={onClick}
      >
        Painel RH
      </Link>
      <div className="pt-4 mt-auto border-t border-white/20">
        <button
          onClick={() => {
            onClick();
            handleLogout();
          }}
          className={`flex items-center text-red-300 hover:text-red-100 ${className}`}
        >
          <LogOut className="inline mr-2 w-5 h-5" />
          Sair
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 bg-[#0D6578] flex justify-between items-center w-full shadow-lg">
        <Link to="/dashboard">
          <img
            src="/imgs/logo-marinho-white.png"
            alt="Logo"
            className="p-2 w-[120px] md:w-[150px] transition-all hover:opacity-80 cursor-pointer"
          />
        </Link>

        {/* Links */}
        {showLinks && (
          <div className="hidden md:flex justify-center gap-4 lg:gap-8 text-white font-poppins font-light text-sm">
            <DesktopNavLinks />
          </div>
        )}

        {/* (Notificações, Perfil, Logout) */}
        <div className="flex items-center gap-4 sm:gap-6 order-4">
          {/* Sininho */}
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

          {/*  Menu Hamburguer */}
          {showLinks && (
            <button
              className="md:hidden text-white ml-auto mr-4 order-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu de navegação"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}

          {/* Perfil e Logout */}
          <div className="hidden md:flex flex-col items-end py-2">
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
              <span className="text-white font-poppins text-sm group-hover:underline">
                Sair
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Lateral (Hamburguer) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Overlay Escuro */}
          <div className="absolute inset-0 bg-black opacity-50 z-30"></div>

          {/* Menu Lateral em si */}
          <div
            className={`w-64 bg-[#0D6578] h-full shadow-2xl p-6 flex flex-col space-y-4 absolute left-0 top-0 transition-transform duration-300 ease-in-out z-40 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end text-white hover:opacity-90"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>

            <MobileNavContent
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-lg hover:text-cyan-200"
            />
          </div>
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
