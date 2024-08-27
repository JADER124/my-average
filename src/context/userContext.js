import { createContext } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useLocalStorage } from "../components/customHooks/useLocalStorage";
import React, { useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [updateMateria, setUpdateMateria] = useState(false);
  const [userLoged, setUserLoged] = useLocalStorage("user", "");
  const login = async (e, email, password) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserLoged(userCredential);
      return userCredential.user;
    } catch (e) {
      alert(e.code);
    }
  };
  const register = async (values) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      //Tambien deberia iniciar sesion con la funcion SigninWithPasswordAndEmail
      if (user) {
        let id = user.user.uid;
        //const userRef = collection(db,"users")
        setDoc(doc(db, "users", id), {
          name: values.name,
          email: values.email,
          materias: values.materias,
        });

        return user;
      }
    } catch (e) {
      alert(e.code);
    }
  };
  return (
    <UserContext.Provider
      value={{
        login,
        register,
        userLoged,
        setUserLoged,
        updateMateria,
        setUpdateMateria,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
