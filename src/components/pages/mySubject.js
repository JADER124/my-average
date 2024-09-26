import React, { useContext, useState, useEffect } from "react";
import NavUser from "./navUser";
import { UserContext } from "../../context/userContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { SimpleCard, CustomSpinner } from "./cardMaterias";
import View from "./view";
function MySubject() {
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
  return (
    <div>
      <NavUser />
      {vandera ? (
        <div className="text-center flex">
          <div className="flex-1 flex-wrap  justify-center overflow-y-auto gap-6 mx-auto px-4 w-3/6 h-[calc(100vh-150px)]">
            {fbMaterias.map((materia, index) => {
              return (
                <div className="w-full block" key={index}>
                  <SimpleCard
                    materia={materia}
                    setViewMateria={setViewMateria}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-3/6 h-[calc(100vh-150px)] mx-6 mb-6 bg-platziBG rounded-lg overflow-y-auto">
            {viewMateria ? (
              <View viewMateria={viewMateria} />
            ) : (
              "Seleccione una materia"
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-52 w-max">
          <CustomSpinner /> <h1>Cargando...</h1>
        </div>
      )}
    </div>
  );
}

export default MySubject;
