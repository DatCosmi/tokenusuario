import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { Ingresar } from "../pages/Ingresar";

function FormularioSuscripcion() {
  const initialState = {
    matricula: "",
    nombre: "",
    tipo: "",
    password: "",
  };

  const [datos, setDatos] = useState(initialState);
  const { matricula, nombre, tipo, password } = datos;

  function handleChange(e) {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(); // file-upload --> express

    formData.append("matricula", datos.matricula);
    formData.append("nombre", datos.nombre);
    formData.append("tipo", datos.tipo);
    formData.append("password", datos.password);

    //const axios = require('axios'); // legacy way

    // Make a request for a user with a given ID
    axios
      .post("http://127.0.0.1:5000/alumnos/agregar", formData)
      .then(function (response) {
        setDatos(initialState);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="matricula">
                <Form.Label>Matrícula</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu matrícula"
                  name="matricula"
                  value={matricula}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="tipo">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el tipo de usuario"
                  name="tipo"
                  value={tipo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  Al chile nosotros si vamos a vender tus datos a los rusos mano
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default FormularioSuscripcion;
