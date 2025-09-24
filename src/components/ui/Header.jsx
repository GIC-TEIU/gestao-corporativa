import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, UserCircle2 } from "lucide-react";

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="pe-4 ps-4 bg-[#2A454E] flex justify-between items-center">
      {/* Logo → Dashboard */}
      <Link to="/dashboard">
        <img
          src="/imgs/logo-marinho-white.png"
          alt="Logo"
          className="p-2 w-[150px] transition-all hover:opacity-80 cursor-pointer"
        />
      </Link>

      {/* Infos do usuário */}
      <div className="flex flex-col items-end gap-1">
        {/* Nome + Perfil */}
        <div className="flex flex-row justify-between gap-2 items-center">
          <p className="text-white h-8 font-poppins flex items-center">
            {currentUser?.nome || "Usuário"}
          </p>

          <Link to="/profile">
            {/* 3. A imagem de perfil foi substituída pelo ícone UserCircle2 */}
            <UserCircle2 className="w-8 h-8 text-white transition-all duration-200 hover:opacity-80 cursor-pointer" />
          </Link>
        </div>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="flex flex-row gap-2 items-center cursor-pointer group"
        >
          {/* 4. A imagem de sair foi substituída pelo ícone LogOut */}
          <LogOut className="w-5 h-5 text-white transition group-hover:opacity-80" />
          <span className="text-white font-poppins text-sm group-hover:underline">
            Sair
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
