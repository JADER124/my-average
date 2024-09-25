import React, { useContext, useState } from "react";
import {Typography, Avatar } from "@material-tailwind/react";
import icon from "../../imgs/calcular.webp";
import { BiCabinet } from "react-icons/bi";
import { FaFolderPlus } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi"; // Icono de hamburguesa
import { UserContext } from "../../context/userContext";
import AvatarWithUserDropdown from "./avatarDropDown";

const NavUser = () => {
  const { userLoged } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  //
  const navList = (
    <ul className="mt-0 mb-0 flex flex-row gap-6 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div className="flex">
        <div className="pt-1 text-xl my-auto sm:my-auto">
          <BiCabinet />
        </div>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal my-auto sm:my-auto"
        >
          <a href="/mismaterias" className="flex items-center">
            Mis materias
          </a>
        </Typography>
      </div>
      <div className="flex">
        <div className="pt-1 text-xl my-auto sm:my-auto">
          <FaFolderPlus />
        </div>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal my-auto sm:my-auto"
        >
          <a href="/homeuser" className="flex items-center">
            Agregar materias
          </a>
        </Typography>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="hidden sm:flex">
          {userLoged ? userLoged.user.email : ""}
        </div>
        <AvatarWithUserDropdown />
      </div>
    </ul>
  );

  return (
    <div className="max-h-[768px]">
      <nav className="fixed top-0 z-10 w-full rounded-none px-4 py-2 sm:px-4 sm:py-4 md:px-6 md:py-4 lg:px-8 lg:py-4 bg-white shadow">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center">
            <Avatar src={icon} alt="avatar" variant="rounded" />
            <h2
                className="mr-4 cursor-pointer p-1.5 font-medium text-2xl "
              >
                <a href="/">MyAverage</a>
              </h2>
          </div>

          {/* Icono de menú hamburguesa en pantallas pequeñas */}
          <div className="block sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <FiMenu className="text-4xl mt-2" />
            </button>
          </div>

          {/* Menú completo para pantallas más grandes */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="mr-4">{navList}</div>
          </div>
        </div>

        {/* Menú desplegable en pantallas pequeñas */}
        {isMenuOpen && (
          <div className="sm:hidden mt-1 space-y-2">
            {navList} {/* Aquí renderizas el mismo navList */}
          </div>
        )}
      </nav>

      <div className="mx-auto max-w-screen-md py-12"></div>
    </div>
  );
};

export default NavUser;
