import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Avatar,
  Collapse
} from "@material-tailwind/react";
import icon from "../../imgs/calcular.png";
import { Link } from "react-router-dom";

const Nav = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          About
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className=" max-h-[768px] ">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
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
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Link to="/register">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Log In</span>
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Sign in</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button
              to="/login"
              fullWidth
              variant="gradient"
              size="sm"
              className=""
            >
              <span>Sign in</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
      <div className="mx-auto max-w-screen-md py-12">
        {/*Espacio entre el nav y el contenido principal*/}
      </div>
    </div>
  );
};

export default Nav;
