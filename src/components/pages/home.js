import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { SlCalculator } from "react-icons/sl";

const Home = () => {
  const [filter, setfilter] = useState(0);
  

  const [prom, setProm] = useState([
    {
      id:
        Math.random() *
          (1 - 9999999999999999999999999999999999999999999999999) +
        1,
      nota: "",
      porcentaje: "",
    },
  ]);
  useEffect(() => {
    setfilter(
      Math.random() * (1 - 9999999999999999999999999999999999999999999999999) +
        1
    );
    console.log(prom);
  }, [prom]);
  const addRow = () => {
    setProm([
      ...prom,
      {
        id: filter,
        nota: "",
        porcentaje: "",
      },
    ]);
  };
  const calcular =()=>{
    console.log("Hola")
  }

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
              <tr key={index.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="px-40">
                    {index+1}
                    <Input
                      placeholder="3.0"
                      type="number"
                      color="purple"
                      onChange={(e) => {
                        prom[index].nota = e.target.value;
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="px-40">
                    <Input
                      maxLength={"2"}
                      type="text"
                      placeholder="%"
                      color="purple"
                      onChange={(e) => {
                        prom[index].porcentaje = e.target.value;
                      }}
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      if (prom.length === 1) {
                        alert("No se puede borrar el ultimo elemento");
                      } else {
                        setProm(prom.filter((i) => i.id !== p.id));
                        if (!prom[index + 1] == null) {
                          prom[index].nota = prom[index + 1].nota;
                          prom[index].porcentaje = prom[index + 1].porcentaje;
                        }
                      }
                    }}
                    className="ml-2 px-4 py-2 text-2xl text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
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
          onClick={() => addRow()}
          className=" ml-2 px-4 py-2 text-2xl text-white bg-green-800 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-red transition duration-150 ease-in-out"
        >
          <FaPlus />
        </button>

      </div>
      <div>
      <button
          onClick={() => calcular()}
          className=" ml-2 px-4 py-2 text-4xl text-white bg-cyan-500 rounded-md hover:bg-teal-300 focus:outline-none focus:shadow-outline-red transition duration-150 ease-in-out"
        >
          <SlCalculator />
        </button>
      </div>
    </div>
  );
};
export default Home;
