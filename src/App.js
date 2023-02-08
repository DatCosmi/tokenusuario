import "./App.css";
import { Ingresar } from "./pages/Ingresar";
import Suscribir from "./pages/Suscribir";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BarraSuperior from "./components/BarraSuperior";
import Alumnos from "./pages/Alumnos";

function App() {
  return (
    <div className="App">
      {/* <Suscribir /> */}
      {/* <Ingresar /> */}
      <Routes>
        <Route path="/" element={<BarraSuperior />}>
          <Route index element={<Home />} />
          <Route path="alumnos">
            <Route index element={<Alumnos />} />
            <Route path="ingresar" element={<Ingresar />} />
            <Route path="suscribir" element={<Suscribir />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
