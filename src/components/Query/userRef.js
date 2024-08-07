import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
export default function UserRef() {
  const [name, setName] = useState("");
  const { userLoged } = useContext(UserContext);
  let uid = userLoged.user.uid;
  useEffect(() => {
    const x = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setName(docSnap.data().name);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    x();
  }, [uid]);
  return <div className="my-5 mx-64 font-semibold italic text-left border-b-2 text-2xl  leading-9 tracking-tight text-gray-900">{name}</div>;
}
