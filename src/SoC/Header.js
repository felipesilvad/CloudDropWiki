import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";


function HeaderComponent() {
  const char_img = require('./assets/img/menu_chars.png')
  const skills_img = require('./assets/img/menu_skills.png')
  const event_img = require('./assets/img/menu_events.png')
  const gear_img = require('./assets/img/menu_gears.png')
  const tarot_img = require('./assets/img/menu_tarots.png')
  return (
    <Navbar className='navbar-dark menu-navbar' bg="dark" expand="lg" fixed="top">
      <Container className='container'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto menu-nav">
            <Nav.Link className='nav-link nl-border' href="/">
              <div className='header-link header-link-home'>
                Home
              </div>
            </Nav.Link>
            <Nav.Link className='nav-link nl-border' href="/chars" >
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={char_img} />
              </div>
              <div className='header-link'>
                Characters
              </div>
            </Nav.Link>
            <div className='nav-link nl-border'>
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={skills_img} />
              </div>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Skills"
                menuVariant="dark"
                className='header-link'
              >
                <NavDropdown.Item href="/skills" >Skills</NavDropdown.Item>
                <NavDropdown.Item href="/traits" >Traits</NavDropdown.Item>
                <NavDropdown.Item href="/effects" >Effects</NavDropdown.Item>
              </NavDropdown>
            </div>
            <Nav.Link className='nav-link nl-border' href="/gears" >
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={gear_img} />
              </div>
              <div className='header-link'>
                Gears
              </div>
            </Nav.Link>
            <Nav.Link className='nav-link nl-border' href="/tarots" >
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={tarot_img} />
              </div>
              <div className='header-link'>
                Tarots
              </div>
            </Nav.Link>
            <Nav.Link className='nav-link nl-border' href="/events" >
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={event_img} />
              </div>
              <div className='header-link'>
                Events
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div class="search-box">
          <form name="search-box">
            <input type="text" class="search-input" name="txt" onmouseout="this.value = ''; this.blur();"/>
          </form>
          <FaSearch />

        </div>

      </Container>
    </Navbar>
  );
}

export default HeaderComponent;