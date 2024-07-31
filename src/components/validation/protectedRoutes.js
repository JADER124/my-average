import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({children,userLoged}) {
  if(!userLoged){
    return <Navigate to="/"/>
  }
  return children
}

export default ProtectedRoutes