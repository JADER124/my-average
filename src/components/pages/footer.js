import React from "react";
import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer className="w-full align-bottom bg-gray-200 p-8 mt-4">
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2024 MyAverage 
      </Typography>
    </footer>
  );
}

export default Footer;
