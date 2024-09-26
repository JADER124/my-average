import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { MdCalculate } from "react-icons/md";

function View({ viewMateria }) {
  const [promActual, setPromActual] = useState()
  const [promAcumulado, setPromAcumulado] = useState()
  useEffect(()=>{
    let notas = viewMateria.notas
    let sum = 0
    let cont = 0
    notas.forEach(n=> {
      if(n.nota !== ''){
        sum += Number(n.nota)
        cont +=1
      }

    });
    setPromActual((sum/cont).toFixed(2))
    setPromAcumulado((sum/notas.length).toFixed(2))
  },[viewMateria])
  return (
    <div >
      <div>
        <p className="font-semibold text-2xl my-8 ml-4 text-white p-3">
          {viewMateria.NombreMateria}
        </p>

        <table className="w-5/6 mx-auto min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-t border-l text-center border-blue-gray-100 bg-cyan-800 p-4">
                <Typography
                  variant="small"
                  color="black"
                  className="font-bold leading-none opacity-70"
                >
                  #
                </Typography>
              </th>
              <th className="border-t text-center border-blue-gray-100 bg-cyan-800 p-4">
                <Typography
                  variant="small"
                  color="black"
                  className="font-bold leading-none opacity-70"
                >
                  Notas
                </Typography>
              </th>
              <th className="border-t border-r  text-center border-blue-gray-100 bg-cyan-800 p-4">
                <Typography
                  variant="small"
                  color="black"
                  className="font-bold leading-none opacity-70"
                >
                  Porcentaje
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {viewMateria.notas.map((nota, index) => {
              return (
                <tr key={index}>
                  <td className="p-4 border border-blue-gray-300">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal text-center"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="p-4 border border-blue-gray-300">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal text-center"
                    >
                      {nota.nota ? nota.nota : "---"}
                    </Typography>
                  </td>
                  <td className="p-4 border border-blue-gray-300">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal text-center"
                    >
                      {nota.porcentaje}{" "}
                      <span className="font-normal text-center text-cyan-600">
                        {" "}
                        %
                      </span>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t-2 border-cyan-600 my-6 w-5/6 mx-auto">
        <p className="font-semibold text-2xl my-2 ml-4 text-white p-3">
          Informacion Materia
        </p>
        <p className="font-semibold flex text-2xl my-2 align-middle ml-4 border-2 rounded-lg text-white p-3 text-left">
          <MdCalculate className="text-4xl align-middle text-red-700"/> Promedio Actual:&nbsp; <span className="text-cyan-600">{promActual}</span>
        </p>
        <p className="font-semibold flex text-2xl my-2 align-middle ml-4 border-2 rounded-lg text-white p-3 text-left">
          <MdCalculate className="text-4xl align-middle text-yellow-600"/> Promedio Acumulado: &nbsp; <span className="text-cyan-600">{promAcumulado}</span>
        </p>

        
      </div>
    </div>
  );
}

export default View;
