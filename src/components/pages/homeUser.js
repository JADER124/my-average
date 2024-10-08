import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import NavUser from "./navUser";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Input, Button } from "@material-tailwind/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { SelectDefault } from "./cardMaterias";
import { useNavigate } from "react-router-dom";

function HomeUser() {
  const { userLoged, updateMateria, setUpdateMateria } =
    useContext(UserContext);
  let uid = userLoged.user.uid;
  const navigate = useNavigate();
  const [filter, setfilter] = useState(0);
  const [vandera, setVandera] = useState(false);
  const [vanderaEdit, setVanderaEdit] = useState(false);
  const [numNotas, SetnumNotas] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Materia, SetMateria] = useState({
    id: Date.now(),
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
        setIsSubmitting(true);
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, {
          materias: arrayUnion(Materia),
        });
        setVandera(false);
        alert("Registro exitoso!");
        SetMateria((materia) => ({
          ...materia,
          id: Date.now(),
          NombreMateria: "",
          notas: [],
        }));
        setProm([
          {
            id:
              Math.random() *
                (1 - 9999999999999999999999999999999999999999999999999) +
              1,
            nota: "",
            porcentaje: "",
          },
        ]);
        SetnumNotas(1);
        setIsSubmitting(false);
        navigate("/mismaterias");
      }
    };
    updateMaterias();
  }, [vandera, uid, Materia]);

  useEffect(() => {
    setfilter(
      Math.random() * (1 - 9999999999999999999999999999999999999999999999999) +
        1
    );
  }, [prom]);

  //CONSULTA DE LAS MATERIAS CUANDO CLICK EDITAR

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

  //USEEFFECT PARA TRAER LISTA DE MATERIAS
  useEffect(() => {
    const query = async () => {
      if (vanderaEdit !== false) {
        setIsSubmitting(true);
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let listMaterias = docSnap.data().materias;
          let indexUpdate = null;
          listMaterias.forEach((m, i) => {
            if (m.id === Materia.id) {
              indexUpdate = i;
            }
          });
          listMaterias[indexUpdate] = Materia;
          await updateDoc(docRef, {
            materias: listMaterias,
          });
          setVanderaEdit(false);
          alert("Edicion completada!");
          SetMateria((materia) => ({
            ...materia,
            id: Date.now(),
            NombreMateria: "",
            notas: [],
          }));
          setProm([
            {
              id:
                Math.random() *
                  (1 - 9999999999999999999999999999999999999999999999999) +
                1,
              nota: "",
              porcentaje: "",
            },
          ]);
          setUpdateMateria(false);
          setIsSubmitting(false);
          navigate("/mismaterias");
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };
    query();
  }, [uid, vanderaEdit]);
  //LLENAR CAMPOS DESPUES DE BOTON EDITAR
  useEffect(() => {
    if (updateMateria) {
      let materiaSeleccionada = updateMateria;
      SetMateria((materia) => ({
        ...materia,
        id: materiaSeleccionada.id,
        NombreMateria: materiaSeleccionada.NombreMateria,
      }));
      setProm(materiaSeleccionada.notas);
      //setUpdateMateria(false);
    }
  }, [updateMateria]);

  const calcular = () => {
    let empty = false;
    if (Materia.NombreMateria === "") {
      alert("Debes poner un nombre a tu materia");
      return;
    }
    prom.forEach((i) => {
      if (i.porcentaje === "") {
        if (!empty) {
          alert("¡Todas las notas deben tener un porcentaje!");
        }

        empty = true;
      }
    });
    if (!empty) {
      if (updateMateria) {
        SetMateria((materia) => ({
          ...materia, // Copiamos las propiedades anteriores
          notas: prom, // Actualizamos solo propiedad notas
        }));

        setVanderaEdit(true);
      } else {
        SetMateria((materia) => ({
          ...materia, // Copiamos las propiedades anteriores
          notas: prom, // Actualizamos solo propiedad notas
        }));
        setVandera(true);
      }
    }
  };
  return (
    <>
      <div>
        <NavUser />
        <div className="text-center mx-auto md:mx-16 lg:mx-64">
          <div className="my-7 mx-2 font-semibold italic text-left text-xl  leading-9 tracking-tight text-gray-900">
            <div>
              <p class="text-2xl font-bold text-gray-900 leading-tight mb-2 border-b-2 border-green-700 py-4">
                Agrega tus materias
              </p>
            </div>
            Nombre de Materia
            <div className="w-72">
              <Input
                className=""
                label="Materia"
                value={Materia.NombreMateria}
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
            </div>
            <div className="mt-4">
              <SelectDefault SetnumNotas={SetnumNotas} numNotas={numNotas} />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {/*TABLA PARA TAMAÑOS DE PANTALLA GRANDE */}
          <table className=" table-auto text-center mx-auto divide-y hidden sm:table divide-gray-500">
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
                          value={p.nota}
                          placeholder="3.0"
                          type="text"
                          maxLength={4}
                          color="purple"
                          pattern={/^[0-9.]*$/}
                          onChange={(e) => {
                            let str = e.target.value;
                            let x = "";
                            if (!/^[0-9.]*$/.test(e.target.value)) {
                              x = str.slice(0, -1);
                              e.target.value = x;
                            } else {
                              const newProm = [...prom];
                              newProm[index].nota = str;
                              setProm(newProm);
                            }
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="px-1 sm:px-4 md:px-6 lg:px-20 py-4">
                        <Input
                          label="%"
                          value={p.porcentaje}
                          maxLength={3}
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
                              const newProm = [...prom];
                              newProm[index].porcentaje = str;
                              setProm(newProm);
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

          <div className="sm:hidden">
            {" "}
            {/* Muestra esta versión solo en pantallas móviles */}
            {prom.map((p, index) => (
              <div
                key={p.id}
                className="border-y border-gray-500 rounded-md p-4 mb-4"
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
                      value={p.nota}
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
                          const newProm = [...prom];
                          newProm[index].nota = str;
                          setProm(newProm);
                        }
                      }}
                    />
                    <label className="block text-gray-500">Porcentaje</label>
                    <Input
                      label="%"
                      value={p.porcentaje}
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
                          const newProm = [...prom];
                          newProm[index].porcentaje = str;
                          setProm(newProm);
                        }
                      }}
                    />
                  </div>

                  {/* Columna 3: Botones */}
                  <div className="col-span-1 mx-auto mt-3">
                    <button
                      onClick={() => addRow()}
                      className="p-3 my-2 block text-xl text-white bg-green-800 rounded-md hover:bg-green-600 focus:outline-none transition duration-150 ease-in-out"
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
                            prom[index].porcentaje = prom[index + 1].porcentaje;
                          }
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
          </div>

          {/*Boton de guardado en pantallas grandes y pequeñas*/}
          <div className="">
            <div className="mx-auto pr-25 mb-5">
              {updateMateria ? (
                <Button
                  color="amber"
                  disabled={isSubmitting}
                  onClick={() => calcular()}
                >
                  {isSubmitting ? "Editing..." : "Editar"}
                </Button>
              ) : (
                <Button
                  color="amber"
                  disabled={isSubmitting}
                  onClick={() => calcular()}
                >
                  {isSubmitting ? "Saving..." : "Guardar"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeUser;
