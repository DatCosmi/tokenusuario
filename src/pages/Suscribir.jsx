import { useState } from "react";
import BarraSuperior from "../components/BarraSuperior";
import FormularioSuscripcion from "../components/FormularioSuscripcion";
import { Ingresar } from "./Ingresar";

function Suscribir() {
  const [token, setToken] = useState();
  if (!token) {
    {
      return <Ingresar setToken={setToken} />;
    }
  }
  return (
    <>
      <BarraSuperior />
      <FormularioSuscripcion />
    </>
  );
}

export default Suscribir;
