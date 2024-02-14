import logo from "./logo.svg";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import "./App.css";
import Home from './components/pages/home'
import Nav from "./components/pages/nav";
import Login from "./components/pages/login";
import Register from "./components/pages/register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
