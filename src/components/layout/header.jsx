import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/10 1 (1).png";
import Out from "../../assets/mdi_logout.png"
import Perfil from "../../assets/qlementine-icons_user-16.png"
function Header() {
    return (

        <div className="   pe-4 ps-4 bg-[#2A454E] flex justify-between   ">

            <Link to="/dashboard">
            <img
                src={Logo}
                alt="Logo"
                className="p-2 w-[150px] transition-all duration-200 hover:opacity-80 cursor-pointer"
            />
            </Link>
            
            <div className="mt-3 mr-3 flex flex-col gap-1 h-8">
                
                
                <div className="flex flex-row justify-between gap-2 items-center">
                    <p className="text-white h-8 font-poppins">Stéfani Freire</p>

                    <Link to="/profile">
                        <img
                            src={Perfil}
                            alt="Perfil"
                            className="w-8 h-8 transition-all duration-200 hover:opacity-80 cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Sair */}
                <div className="flex flex-row gap-2 items-center">
                    <img src={Out} alt="Logout" className="w-5 h-5" />
                    <p className="text-white font-poppins">Sair</p>
                </div>
            </div>
        </div>
    );
}

export default Header;