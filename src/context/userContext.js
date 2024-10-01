import { createContext } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc,getDoc } from "firebase/firestore";
import { useLocalStorage } from "../components/customHooks/useLocalStorage";
import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider ,signInWithRedirect} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [fbMaterias, setFbMaterias] = useState(false);
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
  const registerGoogle = async () => {
    try {
      const userGoogle = await signInWithRedirect(auth, provider);
      setUserLoged(userGoogle);
      console.log(userGoogle);
      const docRef = doc(db, "users", userGoogle.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        if (userGoogle) {
          let id = userGoogle.user.uid;
          //const userRef = collection(db,"users")
          setDoc(doc(db, "users", id), {
            name: userGoogle.user.displayName,
            email: userGoogle.user.email,
            materias: [],
          });
        }
      }
      return userGoogle.user;
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
        fbMaterias,
        setFbMaterias,
        registerGoogle,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
