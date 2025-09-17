// src/components/layout/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Logo from "../../assets/10 1 (1).png";
import Out from "../../assets/mdi_logout.png";
import Perfil from "../../assets/qlementine-icons_user-16.png";

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
          src={Logo}
          alt="Logo"
          className="p-2 w-[150px] transition-all hover:opacity-80 cursor-pointer"
        />
      </Link>

      {/* Infos do usuário */}
      <div className="flex flex-col items-end gap-1">
        {/* Nome + Perfil */}
        <div className="flex flex-row justify-between gap-2 items-center">
          <p className="text-white h-8 font-poppins">
            {currentUser?.nome || "Usuário"}
          </p>

          <Link to="/profile">
            <img
              src={Perfil}
              alt="Perfil"
              className="w-8 h-8 transition-all duration-200 hover:opacity-80 cursor-pointer"
            />
          </Link>
        </div>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="flex flex-row gap-2 items-center cursor-pointer group"
        >
          <img
            src={Out}
            alt="Logout"
            className="w-5 h-5 transition group-hover:opacity-80"
          />
          <span className="text-white font-poppins group-hover:font-semibold">
            Sair
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
