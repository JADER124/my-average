import React from "react";
import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer className="w-full align-bottom bg-gray-200 p-4 mt-4">
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2024 MyAverage Desarrollado por: <br />
        <a rel="noreferrer" target="_blank" href="https://github.com/JuanManuel0909" className="hover:text-blue-500 underline">Juan Gonzalez</a> y{" "}
        <a rel="noreferrer" target="_blank" href="https://github.com/JADER124" className="hover:text-green-400 underline">Jader Lopez</a>
      </Typography>
    </footer>
  );
}

export default Footer;
