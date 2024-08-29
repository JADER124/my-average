import React, { useContext, useState, useEffect } from "react";
import NavUser from "./navUser";
import { UserContext } from "../../context/userContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { SimpleCard, CustomSpinner } from "./cardMaterias";
function MySubject() {
  
  const [vandera, setVandera] = useState(false);
  const { userLoged,fbMaterias,setFbMaterias } = useContext(UserContext);
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
        <div className="grid grid-cols-3 gap-x-6 mx-10 ">
          {fbMaterias.map((materia, index) => {
            return (
              <div className="" key={index}>
                <SimpleCard materia={materia} index={index} />
              </div>
            );
          })}
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
