import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../../context/userContext";

function ProtectedRoutes({children}) {
  const { userLoged} = useContext(UserContext);
  if(userLoged===""){
    return <Navigate to="/"/>
  }
  return children
}

export default ProtectedRoutes