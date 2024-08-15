import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import SignIn from "./components/pages/signIn";
import HomeUser from "./components/pages/homeUser";
import MySubject from "./components/pages/mySubject";
import ProtectedRoutes from "./components/validation/protectedRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/mismaterias" element={<MySubject />} />
          <Route
            path="/homeUser"
            element={
              <ProtectedRoutes>
                <HomeUser />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
