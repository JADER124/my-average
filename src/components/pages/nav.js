import React, { useState } from "react";
import { Navbar, Typography, Button, Avatar } from "@material-tailwind/react";
import icon from "../../imgs/calcular.png";
import { Link } from "react-router-dom";
import { MdInfoOutline } from "react-icons/md";
import { DialogDefault } from "./cardMaterias";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const navList = (
    <ul className="mt-0 mb-0 flex flex-row gap-6 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" font-normal"
      >
        <button onClick={handleOpen} className="flex items-center">
          <MdInfoOutline className="text-3xl" />
        </button>
      </Typography>
    </ul>
  );

  return (
    <>
      <DialogDefault open={open} setOpen={setOpen} handleOpen={handleOpen} />
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
              <div className="">{navList}</div>
              <div className="flex items-center gap-x-1">
                <Link to="/login">
                  <Button variant="text" size="sm" className="lg:inline-block">
                    <span>Log In</span>
                  </Button>
                </Link>
                <Link to="/signIn">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="lg:inline-block"
                  >
                    <span>Sign in</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Navbar>
        <div className="mx-auto max-w-screen-md py-12">
          {/*Espacio entre el nav y el contenido principal*/}
        </div>
      </div>
    </>
  );
};

export default Nav;
