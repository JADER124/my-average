import {createContext} from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'; 

export const UserContext = createContext()

export function UserContextProvider(props) {
  const login = async (e,email,password) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if(userCredential){
       console.log(userCredential.user.uid)
      }
      
      
    } catch (e) {
      alert(e.code);
    }
    
  };
  return (
    <UserContext.Provider value={{login}}>
        {props.children}
    </UserContext.Provider>
  )
}