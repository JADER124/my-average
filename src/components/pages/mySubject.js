import React, { useContext, useState, useEffect,useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import NavUser from "./navUser";
import { UserContext } from "../../context/userContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { SimpleCard, CustomSpinner } from "./cardMaterias";
import View from "./view";
function MySubject() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  //funcion para enfocar la tabla en mobile
  const handleButtonClick = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open)
    navigate("/homeuser")
  };
  const [vandera, setVandera] = useState(false);
  const [viewMateria, setViewMateria] = useState();
  const { userLoged, fbMaterias, setFbMaterias } = useContext(UserContext);
  let uid = userLoged.user.uid;
  useEffect(() => {
    const x = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFbMaterias(docSnap.data().materias);
        setVandera(true);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    x();
  }, [uid]);
  useEffect(() => {
    setViewMateria(fbMaterias[0])
  }, [fbMaterias]);
  return (
    <div>
      <NavUser />
      {vandera ? fbMaterias.length == 0 ? 
      <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>My Average</DialogHeader>
        <DialogBody>
         Recuerda! Tienes que agregar mínimo una materia para poder ser visualizada
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            Agregar Materias
          </Button>
        </DialogFooter>
      </Dialog>
      </> : (
        <div className="text-center block md:flex">
          <div className="mx-4 md:flex-1 md:flex-wrap  justify-center md:overflow-y-auto md:gap-6 md:mx-auto md:px-4 md:w-3/6 md:h-[calc(100vh-150px)]">
            {fbMaterias.map((materia, index) => {
              return (
                <div className="w-full block" key={index}>
                  <SimpleCard
                    materia={materia}
                    setViewMateria={setViewMateria}
                    handleButtonClick={handleButtonClick}
                  />
                </div>
              );
            })}
          </div>
          <div ref={sectionRef} className="section py-1 my-6 sm:py-0 sm:my-0 mx-4 md:w-3/6 md:h-[calc(100vh-150px)] md:mx-6 md:mb-6 bg-platziBG rounded-lg md:overflow-y-auto">
            {viewMateria ? (
              <View viewMateria={viewMateria} sectionRef={sectionRef}/>
            ) : (
              null
            )}
          </div>
        </div>
      ) :(
        <div className="mx-auto mt-52 w-max">
          <CustomSpinner /> <h1>Cargando...</h1>
        </div>
      )}
    </div>
  );
}

export default MySubject;
