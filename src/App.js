import logo from "./logo.svg";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import "./App.css";
import Home from './components/pages/home'
import Nav from "./components/pages/nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
          <Routes>
            <Route path="/home" element={<Home/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
