import {
  Card,
  CardBody,
  CardFooter,
  Typography,
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

//CARD PARA PINTAR CADA UNA DE LAS MATERIAS Y SU INFO
export function SimpleCard({ materia }) {
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
    <div className="mt-6 flex bg-platziBG shadow-lg shadow-gray-600 rounded-lg gap-6" >
      <div className="font-semibold text-xl my-8 ml-4 text-white p-3">
        
          {materia.NombreMateria}
        
      </div>
      <div className="my-9 flex gap-2 ml-auto mr-4">
        <button
          className="bg-platziButton text-platziBG  px-6 rounded-lg font-semibold text-base"
          onClick={() => {
            setUpdateMateria(materia);
            navigate("/homeuser");
          }}
        >
          <MdEdit className="text-xl"/>
        </button>
        <button
          onClick={() => {
            deleteMateria(materia);
          }}
          className="bg-platziBG border-2  px-6 rounded-lg font-semibold text-base border-platziButton text-platziButton shadow-md shadow-platziBG hover:shadow-platziButton"
        >
          <RiDeleteBinFill className="text-xl"/>
        </button>
        <button
          className="bg-platziBG border-2  px-6 rounded-lg font-semibold text-base border-platziButton text-platziButton shadow-md shadow-platziBG hover:shadow-platziButton"
        >
          <FaEye className="text-xl"/>
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
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>My Average</DialogHeader>
        <DialogBody>
          MyAverage: A web tool for students to quickly calculate their grade
          point average and subject averages. Simplify academic performance
          tracking in seconds.
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
