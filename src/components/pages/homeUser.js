import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import NavUser from "./navUser";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Input, Button } from "@material-tailwind/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { SelectDefault } from "./cardMaterias";
import UserRef from "../Query/userRef";

function HomeUser() {
  const { userLoged } = useContext(UserContext);
  const [filter, setfilter] = useState(0);
  const [userid, Setuserid] = useState(userLoged.user.uid);
  const [vandera, setVandera] = useState(false);
  const [numNotas, SetnumNotas] = useState();
  const [Materia, SetMateria] = useState({
    id: 0,
    NombreMateria: "",
    notas: [],
  });
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
    // Obtiene la longitud actual de `prom`
    const currentLength = prom.length;

    // Si `numNotas` es mayor que la longitud actual, agrega nuevos objetos
    if (numNotas > currentLength) {
      const newItems = Array.from({ length: numNotas - currentLength }, () => ({
        id: Math.random() * (1 - 9999999999999999) + 1,
        nota: "",
        porcentaje: "",
      }));

      setProm([...prom, ...newItems]); // Mantén los existentes y añade los nuevos
    } else if (numNotas) {
      const newItems = Array.from({ length: numNotas }, () => ({
        id: Math.random() * (1 - 9999999999999999) + 1,
        nota: "",
        porcentaje: "",
      }));
      setProm(newItems);
    }
  }, [numNotas]);

  useEffect(() => {
    const updateMaterias = async () => {
      if (vandera !== false) {
        const docRef = doc(db, "users", userid);
        await updateDoc(docRef, {
          materias: arrayUnion(Materia),
        });
        setVandera(false);
      }
    };
    updateMaterias();
  }, [vandera, userid, Materia]);

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
    let empty = false;
    if (Materia.NombreMateria === "") {
      alert("Debes poner un nombre a tu materia");
      return;
    }
    prom.forEach((i) => {
      if (i.nota === "" || i.porcentaje === "") {
        if (!empty) {
          alert("¡Debes llenar todos los campos!");
        }

        empty = true;
      }
    });
    if (!empty) {
      // utilizar useEffect para el console.log()
      SetMateria((materia) => ({
        ...materia, // Copiamos las propiedades anteriores
        notas: prom, // Actualizamos solo propiedad notas
      }));
      setVandera(true);
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
          <div className="pr-96">
            <div className="my-5 mx-64 font-semibold italic text-left text-xl  leading-9 tracking-tight text-gray-900">
              Nombre de Materia
              <Input
                label="Materia"
                placeholder="Ingles.."
                type="text"
                color="purple"
                onChange={(e) => {
                  SetMateria((prevObjeto) => ({
                    ...prevObjeto, // Copiamos las propiedades anteriores
                    NombreMateria: e.target.value, // Actualizamos solo propiedad nombreMateria
                  }));
                }}
              />
              <div className="mt-4">
                <SelectDefault SetnumNotas={SetnumNotas} numNotas={numNotas} />
              </div>
            </div>
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
            <div className="mx-auto pr-25 mb-5">
              <Button color="amber" onClick={() => calcular()}>
                <span>Guardar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeUser;
