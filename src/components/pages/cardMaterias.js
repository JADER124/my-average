import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
  Select,
  Option,
} from "@material-tailwind/react";
import { db } from "../../firebase/config";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayRemove, getDoc } from "firebase/firestore";

export function SimpleCard({ materia }) {
  const { setUpdateMateria,userLoged,setFbMaterias } = useContext(UserContext);
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
    <Card className="mt-6 w-96 bg-platziBG" variant="gradient">
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2">
          {materia.NombreMateria}
        </Typography>

        {materia.notas.map((nota, index) => {
          return (
            <h1 key={index}>
              <span className="text-platziButton">Nota {index + 1} : </span>
              <span className="text-white">{nota.nota}</span>{" "}
              <span className="text-platziButton">% : </span>
              <span className="text-white">{nota.porcentaje}</span>
            </h1>
          );
        })}
      </CardBody>
      <CardFooter className="pt-0 flex gap-4 ml-16">
        <Button
          className="bg-platziButton text-platziBG  "
          onClick={() => {
            setUpdateMateria(materia);
            navigate("/homeuser");
          }}
        >
          Editar
        </Button>
        <Button onClick={()=>{
          deleteMateria(materia)
        }} 
        className="bg-platziBG border-2 border-platziButton text-platziButton shadow-md shadow-platziBG hover:shadow-platziButton">
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CustomSpinner() {
  return <Spinner className="h-16 w-16 text-gray-900/50" color="purple" />;
}

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
