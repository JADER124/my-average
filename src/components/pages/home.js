import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

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
    console.log(prom)
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
                    <Input color="purple" onChange={(e)=>{
                      prom[index].nota = e.target.value
                      console.log(prom)
                    }} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="px-40">
                    <Input color="purple" onChange={(e)=>{
                      prom[index].porcentaje = e.target.value
                      console.log(prom)
                    }}/>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="ml-2 px-4 py-2 text-2xl text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                   <RiDeleteBin5Fill />
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
            className=" ml-2 px-4 py-2 text-2xl text-white bg-green-800 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-red transition duration-150 ease-in-out"
          >
            <FaPlus/>
          </button>
        </div>
    </div>
  );
};
export default Home;
