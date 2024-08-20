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
import React, { useState } from "react";

export function SimpleCard({ materia }) {
  return (
    <Card className="mt-6 w-96 bg-platziBG" variant="gradient">
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2">
          {materia.NombreMateria}
        </Typography>
        <Typography>
          {materia.notas.map((nota, index) => {
            return (
              <h1>
                <span className="text-platziButton">Nota {index + 1} : </span>
                <span className="text-white">{nota.nota}</span>{" "}
                <span className="text-platziButton">% : </span>
                <span className="text-white">{nota.porcentaje}</span>
              </h1>
            );
          })}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex gap-4 ml-16">
        <Button className="bg-platziButton text-platziBG  ">Editar</Button>
        <Button className="bg-platziBG border-2 border-platziButton text-platziButton shadow-md shadow-platziBG hover:shadow-platziButton">
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CustomSpinner() {
  return <Spinner className="h-16 w-16 text-gray-900/50" color="purple" />;
}

export function SelectDefault({ SetnumNotas }) {
  return (
    <div className="w-72">
      <Select
        label="Numero de notas"
        index="number"
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