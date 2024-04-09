import {createContext,useState} from 'react'
import { auth, db } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection,addDoc } from "firebase/firestore"

export const UserContext = createContext()

export function UserContextProvider(props) {
  const [v,setV]=useState(false)
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
       setV(true)
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
        

      }
    } catch (e) {
      alert(e.code);
    }
  };
  return (
    <UserContext.Provider value={{login,register,v}}>
        {props.children}
    </UserContext.Provider>
  )
}