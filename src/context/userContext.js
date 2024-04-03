import {createContext} from 'react'
export const UserContext = createContext()

export function UserContextProvider(props) {

  return (
    <UserContext.Provider>
        {props.children}
    </UserContext.Provider>
  )
}