import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Scale,
  DollarSign,
  Users,
  Building,
  UserCheck,
  Plus,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/", label: "Área de Trabalho", icon: Home },
    { path: "/acoes-legais", label: "Ações Legais", icon: Scale },
    { path: "/honorarios", label: "Honorários", icon: DollarSign },
    { path: "/usuarios", label: "Usuários", icon: Users },
    { path: "/condominios", label: "Condomínios", icon: Building },
    { path: "/condominos", label: "Condôminos", icon: UserCheck },
  ];

  const cadastroItems = [
    { path: "/cadastros/condominios", label: "Condomínios", icon: Building },
    { path: "/cadastros/condominos", label: "Condôminos", icon: UserCheck },
    { path: "/cadastros/acoes-legais", label: "Ações Legais", icon: Scale },
  ];

  return (
    <div
      className={`fixed md:static top-0 left-0 h-full w-64 bg-sidebar text-white flex flex-col transform transition-transform duration-300 z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-primary/20">
        <img
          src="/logo-white.png"
          alt="Logo DIAS & NUNES"
          className="w-30 h-auto"
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-accent text-primary font-medium"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={onClose} // fecha ao clicar em link
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Seção Cadastros */}
        <div className="mt-8 px-3">
          <div className="flex items-center space-x-2 px-3 py-2 text-white/60 text-sm font-medium">
            <Plus className="w-4 h-4" />
            <span>Cadastros</span>
          </div>
          <ul className="space-y-1 mt-2">
            {cadastroItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-6 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-accent text-primary font-medium"
                        : "text-white/70 hover:bg-white/10 hover:text-white/90"
                    }`}
                    onClick={onClose}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary/20 text-center text-xs text-white/50">
        © 2025 - Dias & Nunes - Advocacia e Consultoria Jurídica
      </div>
    </div>
  );
};

export default Sidebar;
