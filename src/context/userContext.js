import {createContext,useState} from 'react'
import { auth, db } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection,addDoc } from "firebase/firestore"

export const UserContext = createContext()

export function UserContextProvider(props) {
  const [userMatch,setUserMatch]=useState(null)
  const login = async (e,email,password) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user.uid)
     
      if(userCredential){
       setUserMatch(userCredential.user)
      }
      
      
    } catch (e) {
      alert(e.code);
    }
    
  };
  const register = async (values) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
      //Tambien deberia iniciar sesion con la funcion SigninWithPasswordAndEmail
      if(user){
        let id = user.user.uid
        const userRef = collection(db,"users")
        addDoc(userRef,{
          uid:id,
          name:values.name,
          email:values.email,
          materias:values.materias,
        })

        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        if(userCredential){
          setUserMatch(userCredential.user)
         }
         return user
      }
    } catch (e) {
      alert(e.code);
    }
  };
  return (
    <UserContext.Provider value={{login,register,userMatch}}>
        {props.children}
    </UserContext.Provider>
  )
}