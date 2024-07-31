import React, { useContext } from "react";
import { auth } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Navbar, Typography, Avatar } from "@material-tailwind/react";
import icon from "../../imgs/calcular.png";
import { BiCabinet } from "react-icons/bi";
import { FaFolderPlus } from "react-icons/fa6";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const NavUser = () => {
  const { userLoged,setUserLoged } = useContext(UserContext);
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      //const uid = user;
      
      // ...
    } else {
      //const user2 = user

      setUserLoged(null)
    }
    
  })
  const handleClickSignOut = async () => {
    console.log("ejecutado");
    await signOut(auth);
  };
  const navList = (
    <ul className="mt-0 mb-0 flex flex-row gap-6 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div className="flex">
        <div className="pt-1 text-xl">
          <BiCabinet />
        </div>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="/" className="flex items-center">
            Mis materias
          </a>
        </Typography>
      </div>
      <div className="flex">
        <div className="pt-1 text-xl">
          <FaFolderPlus />
        </div>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="/" className="flex items-center">
            Agregar materias
          </a>
        </Typography>
      </div>
    </ul>
  );

  return (
    <div className=" max-h-[768px]">
      <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 sm:px-4 sm:py-4 md:px-6 md:py-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex">
            <Avatar src={icon} alt="avatar" variant="rounded" />

            <Typography
              as="a"
              href="/"
              variant="h4"
              className="mr-4 cursor-pointer p-1.5 font-medium "
            >
              MyAverage
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4">{navList}</div>
            <div className="flex items-center gap-x-2">
              <div>{userLoged ? userLoged.user.email:navigate("/")}</div>
              <button onClick={handleClickSignOut}>cerrar sesion</button>
              <a href="/">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                />
              </a>
            </div>
          </div>
        </div>
      </Navbar>
      <div className="mx-auto max-w-screen-md py-12">
        {/*Espacio entre el nav y el contenido principal*/}
      </div>
    </div>
  );
};

export default NavUser;
