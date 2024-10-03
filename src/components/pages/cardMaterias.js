import {
  Button,
  Spinner,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { db } from "../../firebase/config";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayRemove, getDoc } from "firebase/firestore";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import ejemplo from "../../imgs/ejemplo.webp"

//CARD PARA PINTAR CADA UNA DE LAS MATERIAS Y SU INFO
export function SimpleCard({ materia, setViewMateria, handleButtonClick }) {
  const { setUpdateMateria, userLoged, setFbMaterias } =
    useContext(UserContext);
  const navigate = useNavigate();
  let uid = userLoged.user.uid;
  const deleteMateria = async (materia) => {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      materias: arrayRemove(materia),
    });

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFbMaterias(docSnap.data().materias);
    }
  };

  return (
    <div className="mt-6 p-1 sm:p-0 sm:flex bg-platziBG shadow-lg shadow-gray-600 rounded-lg gap-6">
      <div className="font-semibold text-xl my-4 sm:my-8 sm:ml-4 text-white sm:p-3">
        {materia.NombreMateria}
      </div>
      <div className="sm:my-9 my-4 flex justify-center gap-2 sm:ml-auto sm:mr-4">
        <button
          className="bg-platziBG border-2 px-4 py-2 sm:px-6 rounded-lg font-semibold text-base border-yellow-800 text-yellow-800 shadow-md shadow-platziBG hover:shadow-yellow-800"
          onClick={() => {
            setUpdateMateria(materia);
            navigate("/homeuser");
          }}
        >
          <MdEdit className="text-xl" />
        </button>
        <button
          onClick={() => {
            if (
              window.confirm(
                "¿Estas seguro que deseas eliminar : " +
                  materia.NombreMateria +
                  "? "
              ) === true
            ) {
              deleteMateria(materia);
            }
          }}
          className="bg-platziBG border-2  px-4 py-2 sm:px-6 rounded-lg font-semibold text-base border-red-800 text-red-800 shadow-md shadow-platziBG hover:shadow-red-800"
        >
          <RiDeleteBinFill className="text-xl" />
        </button>
        <button
          className="bg-platziBG border-2  px-4 py-2 sm:px-6 rounded-lg font-semibold text-base border-cyan-600 text-cyan-600 shadow-md shadow-platziBG hover:shadow-cyan-600"
          onClick={() => {
            setViewMateria(materia);
            handleButtonClick()
          }}
        >
          <FaEye className="text-xl" />
        </button>
      </div>
    </div>
  );
}

//CARGAR SPINNER HASTA QUE TERMINE LA CONSULTA DE MIS MATERIAS
export function CustomSpinner() {
  return <Spinner className="h-16 w-16 text-gray-900/50" color="purple" />;
}

//SELECT # DE MATERIAS DESEADAS
export function SelectDefault({ SetnumNotas, numNotas }) {
  return (
    <div className="w-64">
      <Select
        label="Numero de notas"
        index="number"
        value={String(numNotas)}
        onChange={(value) => {
          SetnumNotas(value);
        }}
      >
        <Option value="1">1</Option>
        <Option value="2">2</Option>
        <Option value="3">3</Option>
        <Option value="4">4</Option>
        <Option value="5">5</Option>
        <Option value="6">6</Option>
        <Option value="7">7</Option>
        <Option value="8">8</Option>
        <Option value="9">9</Option>
        <Option value="10">10</Option>
      </Select>
    </div>
  );
}

//MODAL INFORMACION
export function DialogDefault({ open, handleOpen }) {
  return (
    <div >
      <Dialog open={open} handler={handleOpen} >
        <DialogHeader>My Average</DialogHeader>
        <DialogBody className="h-[25rem] overflow-scroll">
          ¡Bienvenidos a My Average!<br/>
          Estas son las instrucciones para calcular tu promedio ponderado:
          <p>1:Encontrarás 2 campos , uno llamado <span className="
          font-bold">nota</span> y el otro <span className="font-bold">porcentaje</span>, ademas de un boton para añadir una nueva nota y otro para eliminar las notas no deseadas
          <br/>
          2: Debes llenar el campo <span className="font-bold">nota</span> con un numero (ejm: 4.5 / 4 / 4.55), recuerda usar "." para especificar tu nota con decimal.
          <br/>
          3: Debes llenar el campo <span className="font-bold">porcentaje</span> con un numero (ejm: 100 / 50 / 20), recuerda usar el porcentaje correspondiente a cada nota.
          <br/>
          4: Una vez tengas todas tus notas con sus repectivos porcentajes, selecciona el boton calcular el cual generará la nota promedio en el campo resultado.
          <p >Al completar todos los pasos se deberia visulaizar de una manera similar al siguiente ejemplo:
            <img className="p-3 mx-auto" src={ejemplo} alt="ejemplo"></img>
          </p>
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
