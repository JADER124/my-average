import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useContext } from "react";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import SignIn from "./components/pages/signIn";
import HomeUser from "./components/pages/homeUser";
import ProtectedRoutes from "./components/validation/protectedRoutes";
import { UserContext } from "./context/userContext";

function App() {
  const { userLoged} = useContext(UserContext);
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/homeUser" element={
              <ProtectedRoutes userLoged={userLoged}>
                <HomeUser/>
              </ProtectedRoutes>
            } />
            
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
