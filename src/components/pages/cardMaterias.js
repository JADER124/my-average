import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";

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
                <span className="text-platziButton">Nota {index + 1} : </span><span className="text-white">{nota.nota}</span>{" "}
                <span className="text-platziButton">% : </span><span className="text-white">{nota.porcentaje}</span>
              </h1>
            );
          })}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex gap-4 ml-16">
        <Button className="bg-platziButton text-platziBG  ">Editar</Button>
        <Button className="bg-platziBG border-2 border-platziButton text-platziButton shadow-md shadow-platziBG hover:shadow-platziButton">Eliminar</Button>
      </CardFooter>
    </Card>
  );
}

export function CustomSpinner() {
  return <Spinner className="h-16 w-16 text-gray-900/50" color="purple" />;
}
