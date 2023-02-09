import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Outlet } from "react-router-dom";

function BarraSuperior() {
  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Alumnos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <NavDropdown title="Alumnos" id="dropdown-alumnos">
                <NavDropdown.Item as={Link} to="/alumnos">
                  Alumnos Inicio
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/alumnos/ingresar">
                  Alumnos Ingresar
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/alumnos/suscribir">
                  Alumnos Suscribir
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default BarraSuperior;
