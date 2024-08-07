import React, { useState, useEffect } from "react";
import NavUser from "./navUser";
import { Input } from "@material-tailwind/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { SlCalculator } from "react-icons/sl";
import UserRef from "../Query/userRef";

function HomeUser() {
  const [filter, setfilter] = useState(0);
  const [finalgrade, setFinalGrade] = useState("...");

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
  const calcular = () => {
    let arrayProm = [];
    let suma = 0;
    let final = 0;
    let porcen = 0;
    let empty = false;

    prom.forEach((i) => {
      if (i.nota === "" || i.porcentaje === "") {
        if (!empty) {
          alert("¡Debes llenar todos los campos!");
        }

        empty = true;
      } else {
        arrayProm.push(parseFloat(i.nota * i.porcentaje));
        porcen += parseFloat(i.porcentaje);
      }
    });
    if (!empty) {
      arrayProm.forEach((p) => {
        suma += p;
      });
      final = suma / porcen;
      final = final.toFixed(2);

      if (final !== "NaN") {
        setFinalGrade(final);
      } else {
        setFinalGrade("...");
      }
    }
  };
  return (
    <>
      <div>
        <NavUser />
        <div className="overflow-x-auto">
          <div>
            <UserRef />
          </div>
          <table className=" table-auto text-center mx-auto divide-y divide-gray-500">
            <thead>
              <tr className="">
                <th className="py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nota
                </th>
                <th className="py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Porcentaje
                </th>
                <th className="py-2 text-xs font-medium  text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {prom.map((p, index) => {
                return (
                  <tr key={p.id} className="">
                    <td>
                      <div className="px-1 py-4 sm:px-4 md:px-6 lg:px-10 text-gray-500">
                        {index + 1}
                      </div>
                    </td>
                    <td>
                      <div className="px-1 sm:px-4 md:px-6 lg:px-20 py-4">
                        <Input
                          label="Nota"
                          placeholder="3.0"
                          type="text"
                          maxLength={3}
                          color="purple"
                          pattern={/^[0-9.]*$/}
                          onChange={(e) => {
                            let str = e.target.value;
                            let x = "";
                            if (!/^[0-9.]*$/.test(e.target.value)) {
                              x = str.slice(0, -1);
                              e.target.value = x;
                            } else {
                              prom[index].nota = e.target.value;
                            }
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="px-1 sm:px-4 md:px-6 lg:px-20 py-4">
                        <Input
                          label="%"
                          maxLength={2}
                          type="text"
                          placeholder="%"
                          color="purple"
                          onChange={(e) => {
                            let str = e.target.value;
                            let x = "";
                            if (!/^[0-9]*$/.test(e.target.value)) {
                              x = str.slice(0, -1);
                              e.target.value = x;
                            } else {
                              prom[index].porcentaje = e.target.value;
                            }
                          }}
                        />
                      </div>
                    </td>

                    <td>
                      <div className="flex gap-2 px-1 sm:px-4 md:px-8 lg:px-10 py-4">
                        <button
                          onClick={() => addRow()}
                          className=" px-4 py-2 text-2xl text-white bg-green-800 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-red transition duration-150 ease-in-out"
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={() => {
                            if (prom.length === 1) {
                              alert("No se puede borrar el ultimo elemento");
                            } else {
                              setProm(prom.filter((i) => i.id !== p.id));
                              if (!prom[index + 1] == null) {
                                prom[index].nota = prom[index + 1].nota;
                                prom[index].porcentaje =
                                  prom[index + 1].porcentaje;
                              }
                            }
                          }}
                          className=" px-4 py-2 text-2xl text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                        >
                          <RiDeleteBin5Fill />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <div className="mx-auto pr-28 w-max mb-5">
              <button
                onClick={() => calcular()}
                className="flex align-middle text-center font-bold gap-4 py-1.5 px-4 text-2xl text-white bg-cyan-500 rounded-md hover:bg-teal-300 focus:outline-none focus:shadow-outline-red transition duration-150 ease-in-out"
              >
                Calcular <SlCalculator className="text-3xl" />
              </button>
            </div>
            <div className="mx-auto pr-28 w-max mb-5">
              <h1 className="text-4xl font-bold">Resultado: {finalgrade}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeUser;
