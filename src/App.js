import "./App.css";
import { Ingresar } from "./pages/Ingresar";
import Suscribir from "./pages/Suscribir";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Suscribir /> */}
      {/* <Ingresar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ingresar />} />
          <Route path="/Suscribir" element={<Suscribir />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
