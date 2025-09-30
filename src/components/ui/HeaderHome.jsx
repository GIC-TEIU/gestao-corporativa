import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, UserCircle2, Bell} from "lucide-react";

function HeaderHome() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const getFirstName = (name) => {
    if (!name) return "Usuário";
    return name.split(" ")[0];
  };

  const firstName = getFirstName(currentUser?.nome);

  return (
    <div className="px-2 sm:px-4 bg-[#0D6578] flex justify-between items-center">
      <Link to="/dashboard">
        <img
          src="/imgs/logo-marinho-white.png"
          alt="Logo"
          className="p-2 w-[120px] sm:w-[150px] transition-all hover:opacity-80 cursor-pointer"
        />
      </Link>
        <Bell fill="#fff" className="w-6 h-6 text-white transition-all duration-200 hover:opacity-80 cursor-pointer" />
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
  );
}

export default HeaderHome;

