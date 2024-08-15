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
    <Card className="mt-6 w-96 bg-" variant="gradient">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {materia.NombreMateria}
        </Typography>
        <Typography>
          {materia.notas.map((nota, index) => {
            return (
              <h1>
                Nota {index + 1} : {nota.nota}{" "}
                <span>% : {nota.porcentaje}</span>
              </h1>
            );
          })}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex gap-4 ml-16">
        <Button color="red">Editar</Button>
        <Button color="amber">Eliminar</Button>
      </CardFooter>
    </Card>
  );
}

export function CustomSpinner() {
  return <Spinner className="h-16 w-16 text-gray-900/50" color="purple" />;
}
