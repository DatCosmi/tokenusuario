import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import VerificarToken from "./VerificarToken";

const initialState = {
  matricula: "",
  password: "",
};

export const FormularioIngreso = () => {
  const [datos, setDatos] = useState(initialState);
  const { matricula, password } = datos;

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(); // file-upload --> express

    formData.append("matricula", datos.matricula);
    formData.append("password", datos.password);

    //const axios = require('axios'); // legacy way

    // Make a request for a user with a given ID
    axios
      .post("http://127.0.0.1:5000/alumnos/acceder", formData)
      .then(function (response) {
        if (response.data.auth) {
          localStorage.setItem("token", response.data.resultado);
        }
        console.log(response);
        setDatos(initialState);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col></Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicMatricula">
              <Form.Label>Matricula</Form.Label>
              <Form.Control
                name="matricula"
                type="text"
                placeholder="Ingresa tu matricula"
                value={matricula}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Te tenemos bien ubicado y te vamos a vender en la dip web
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <VerificarToken />
        </Col>
      </Row>
    </Container>
  );
};
