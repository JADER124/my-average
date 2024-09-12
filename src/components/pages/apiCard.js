import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { IoMdStar } from "react-icons/io";

function ApiCard({ data }) {
  return (
    <>
      {data.map((object, index) => {
        return (
          <Card
            key={index}
            color="transparent"
            shadow={true}
            className="w-full max-w-[26rem] p-2 items-center"
          >
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 flex gap-4 pt-0 pb-8"
            >
              <Avatar
                size="lg"
                variant="circular"
                src={object.avatar}
                alt={object.username}
              />
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-start">
                  <Typography variant="h5" color="blue-gray">
                    {object.username}
                  </Typography>
                </div>
                <div className="flex">
                <Typography color="blue-gray">
                  Calificación: {object.rating}
                </Typography>
                <IoMdStar className="mt-1 text-yellow-600"/>
                </div>
                
              </div>
            </CardHeader>
            <CardBody className="mb-6 p-0">
              <Typography>{object.comment}</Typography>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
}

export default ApiCard;
