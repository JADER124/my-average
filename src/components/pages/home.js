import React, { useState, useEffect } from "react";
import { Avatar, Input } from "@material-tailwind/react";
import borrar from '../../imgs/borrar.png'

const Home = () => {
  const [prom, setProm] = useState([
    {
      nota: "",
      porcentaje: "",
    },
  ]);

  const addRow = () => {
    setProm([
      ...prom,
      {
        nota: "",
        porcentaje: "",
      },
    ]);
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nota
            </th>
            <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Porcentaje
            </th>
            <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="">
          {prom.map((p, index) => {
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="px-40">
                    <Input color="purple" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="px-40">
                    <Input color="purple" />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                  <Avatar src={borrar} alt="avatar" variant="rounded"/>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        
      </table>
      <div className="block text-right mr-10 ">
          <button
            onClick={addRow}
            className=" ml-2 px-4 py-2 font-medium text-white bg-green-800 rounded-md focus:outline-none focus:shadow-outline-red transition duration-150 ease-in-out"
          >
           Agregar
          </button>
        </div>
    </div>
  );
};
export default Home;
