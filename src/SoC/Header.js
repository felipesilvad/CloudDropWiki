import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HeaderComponent() {

  return (
    <Navbar className='navbar-dark' bg="dark" expand="lg" fixed="top">
      <Container className='container'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/chars" >Characters</Nav.Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Skills"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/skills" >Skills</NavDropdown.Item>
              <NavDropdown.Item href="/traits" >Traits</NavDropdown.Item>
              <NavDropdown.Item href="/effects" >Effects</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/gears" >Gears</Nav.Link>
            <Nav.Link href="/tarots" >Tarots</Nav.Link>
            <Nav.Link href="/events" >Events</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;