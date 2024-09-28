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
      
        <h1 className="sr-only">My Average: Calculadora de promedios</h1>
        <h2 className="sr-only">
          Calcula y Administra tus Promedios Académicos de Forma Fácil
        </h2>
        <p className="sr-only">
          ¿Eres estudiante y te preocupa mantener tus notas bajo control?
          Nuestra plataforma está diseñada para ayudarte a calcular y
          administrar tus promedios ponderados de manera rápida y sencilla. No
          importa si estás cursando una materia complicada o gestionando varias
          asignaturas, con nuestra herramienta podrás saber exactamente dónde te
          encuentras y qué necesitas para alcanzar el éxito académico. Con
          nuestra calculadora de promedios ponderados, solo necesitas ingresar
          tus calificaciones actuales y los porcentajes de cada evaluación. La
          herramienta te mostrará tu promedio actual y, lo más importante, te
          indicará cuánto necesitas en tus próximas evaluaciones para aprobar la
          materia. De esta forma, tendrás una visión clara de tu rendimiento y
          sabrás cuánto esfuerzo debes poner en cada examen o tarea. Nuestra web
          está pensada para estudiantes que buscan mejorar su rendimiento
          académico y tomar decisiones inteligentes sobre sus estudios. Con solo
          unos clics, podrás planificar tus siguientes pasos y evitar sorpresas
          al final del semestre. Ya sea que quieras alcanzar una meta específica
          o simplemente asegurarte de pasar la materia, nuestra herramienta será
          tu mejor aliada. ¡No dejes que las notas te tomen por sorpresa!
          Empieza a calcular y gestionar tu futuro académico hoy mismo.
        </p>
 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route
            path="/mismaterias"
            element={
              <ProtectedRoutes>
                <MySubject />
              </ProtectedRoutes>
            }
          />
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
