import React, { useState, useEffect } from "react";
import { Input, Alert } from "@material-tailwind/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus, FaExclamationCircle } from "react-icons/fa";
import { SlCalculator } from "react-icons/sl";
import Footer from "./footer";
import ApiCard from "./apiCard";
import Nav from "./nav";
import { opinions } from "../../data/opinions.js";

const Home = () => {
  const [data, setData] = useState([]);
  const [filter, setfilter] = useState(0);
  const [viewAlert, setViewAlert] = useState(false);
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

  function getRandomReviews(opinions, num) {
    const newOpinions = [...opinions].sort(() => 0.5 - Math.random());
    return newOpinions.slice(0, num);
  }

  useEffect(() => {
    const selectedReviews = getRandomReviews(opinions, 4);
    setData(selectedReviews);
  }, []);

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
        setViewAlert(true);
      } else {
        setFinalGrade("...");
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="overflow-x-auto mt-4">
        <div className="sm:hidden">
          {" "}
          {/* Muestra esta versión solo en pantallas móviles */}
          {prom.map((p, index) => (
            <div
              key={p.id}
              className="border-b border-gray-500 rounded-md p-4 mb-4"
            >
              <div className="grid grid-cols-[1fr,3fr,2fr] gap-2 items-center">
                {/* Columna 1: Índice */}
                <div className="col-span-1 flex justify-start mb-2 mx-auto">
                  <span className="text-xl font-bold mr-4">#{index + 1}</span>
                </div>

                {/* Columna 2: Nota y Porcentaje */}
                <div className="col-span-1 mx-auto">
                  <label className="block text-gray-500">Nota</label>
                  <Input
                    label="Nota"
                    placeholder="3.0"
                    type="text"
                    maxLength={3}
                    color="purple"
                    onChange={(e) => {
                      let str = e.target.value;
                      if (!/^[0-9.]*$/.test(e.target.value)) {
                        e.target.value = str.slice(0, -1);
                      } else {
                        prom[index].nota = e.target.value;
                      }
                    }}
                  />
                  <label className="block text-gray-500">Porcentaje</label>
                  <Input
                    label="%"
                    maxLength={2}
                    type="text"
                    placeholder="%"
                    color="purple"
                    onChange={(e) => {
                      let str = e.target.value;
                      if (!/^[0-9]*$/.test(e.target.value)) {
                        e.target.value = str.slice(0, -1);
                      } else {
                        prom[index].porcentaje = e.target.value;
                      }
                    }}
                  />
                </div>

                {/* Columna 3: Botones */}
                <div className="col-span-1 mx-auto ">
                  <button
                    onClick={() => addRow()}
                    className="p-3 my-2 block text-xl text-white bg-green-800 rounded-md hover:bg-green-600 focus:outline-none transition duration-150 ease-in-out"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => {
                      if (prom.length === 1) {
                        alert("No se puede borrar el último elemento");
                      } else {
                        setProm(prom.filter((i) => i.id !== p.id));
                      }
                    }}
                    className="p-3 block text-xl text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none transition duration-150 ease-in-out"
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="block sm:hidden">
            <div className="mx-auto pr-20 w-max mb-5">
              <button
                onClick={() => calcular()}
                className="flex align-middle text-center font-bold gap-4 py-1.5 px-4 text-2xl text-white bg-cyan-500 rounded-md hover:bg-teal-300 focus:outline-none focus:shadow-outline-red transition duration-150 ease-in-out"
              >
                Calcular <SlCalculator className="text-3xl" />
              </button>
            </div>
            <div className="mx-auto pr-20 w-max mb-5">
              <p className="text-4xl font-bold">Resultado: {finalgrade}</p>
            </div>
            <div>
              <Alert
                open={viewAlert}
                className="rounded-none justify-center  border-platziBG bg-cyan-200/50 font-medium text-platziBG"
              >
                <div className="flex justify-center text-center gap-2 my-1 ml-10">
                  <FaExclamationCircle className="text-2xl" />
                  <p className=" font-bold">
                    ¿Sabes qué nota necesitas para Ganar?{" "}
                  </p>
                </div>
                <p className="ml-11">
                  Registra tus materias y deja que nosotros hagamos los
                  cálculos.{" "}
                  <a href="/login">
                    <span className="font-bold text-green-600">
                      ¡Regístrate ya!
                    </span>
                  </a>
                </p>
              </Alert>
            </div>
          </div>
        </div>

        <div>
          {/* Tabla completa para pantallas más grandes */}
          <table className="table-auto text-center mx-auto divide-y divide-gray-500 hidden sm:table">
            <thead>
              <tr>
                <th className="py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nota
                </th>
                <th className="py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Porcentaje
                </th>
                <th className="py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {prom.map((p, index) => (
                <tr key={p.id}>
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
                        maxLength={4}
                        color="purple"
                        pattern={/^[0-9.]*$/}
                        onChange={(e) => {
                          let str = e.target.value;
                          if (!/^[0-9.]*$/.test(e.target.value)) {
                            e.target.value = str.slice(0, -1);
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
                        maxLength={3}
                        type="text"
                        placeholder="%"
                        color="purple"
                        onChange={(e) => {
                          let str = e.target.value;
                          if (!/^[0-9]*$/.test(e.target.value)) {
                            e.target.value = str.slice(0, -1);
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
                        className="px-4 py-2 text-2xl text-white bg-green-800 rounded-md hover:bg-green-600 focus:outline-none transition duration-150 ease-in-out"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => {
                          if (prom.length === 1) {
                            alert("No se puede borrar el último elemento");
                          } else {
                            setProm(prom.filter((i) => i.id !== p.id));
                          }
                        }}
                        className="px-4 py-2 text-2xl text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none transition duration-150 ease-in-out"
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="hidden sm:block">
            <div className="mx-auto pr-28 w-max mb-5">
              <button
                onClick={() => calcular()}
                className="flex align-middle text-center font-bold gap-4 py-1.5 px-4 text-2xl text-white bg-cyan-500 rounded-md hover:bg-teal-300 focus:outline-none focus:shadow-outline-red transition duration-150 ease-in-out"
              >
                Calcular <SlCalculator className="text-3xl" />
              </button>
            </div>
            <div className="mx-auto pr-28 w-max mb-5">
              <h3 className="text-4xl font-bold">Resultado: {finalgrade}</h3>
            </div>
            <div className="">
              <Alert
                open={viewAlert}
                className="rounded-none justify-center  border-platziBG bg-cyan-200/50 font-medium text-platziBG"
              >
                <div className="flex justify-center text-center gap-2 my-1">
                  <FaExclamationCircle className="text-2xl" />
                  <p className=" font-bold">
                    ¿Sabes qué nota necesitas para Ganar?{" "}
                  </p>
                </div>
                <p className="">
                  Registra tus materias y deja que nosotros hagamos los
                  cálculos.{" "}
                  <a href="/login">
                    <span className="font-bold text-green-600">
                      ¡Regístrate ya!
                    </span>
                  </a>
                </p>
              </Alert>
            </div>
          </div>
        </div>
      </div>
      <div className="block mx-10 sm:block sm:mx-20 md:flex md:mx-10 lg:flex lg:mx-10 xl:flex xl:mx-12 my-20 gap-4">
        <ApiCard data={data} />
      </div>
      <Footer />
    </>
  );
};
export default Home;
