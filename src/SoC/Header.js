import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
// import SearchBar from './Search/SearchBar';
import AccountHeader from './accounts/AccountHeader';
import SignIn from './accounts/SignIn';

function HeaderComponent({userData}) {
  const char_img = require('./assets/img/menu_chars.png')
  const skills_img = require('./assets/img/menu_skills.png')
  const event_img = require('./assets/img/menu_events.png')
  const gear_img = require('./assets/img/menu_gears.png')
  const tarot_img = require('./assets/img/menu_tarots.png')
  const stage_img = require('./assets/img/menu_stages.png')
  const discord = require('./assets/img/discord.png')
  const kofi = require('./assets/img/kofi.png')
  
  return (
    <Navbar className='navbar-dark menu-navbar' bg="dark" expand="lg" fixed="top">
      <Container className='char-container d-flex align-items-center'>
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
                <Image className='menu-icon' src={char_img} alt="char_img" loading="lazy" width="100" height="100"/>
              </div>
              <div className='header-link'>
                Characters
              </div>
            </Nav.Link>
            <div className='nav-link nl-border'>
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={skills_img} alt="skills_img" loading="lazy" width="100" height="100"/>
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
            <div className='nav-link nl-border'>
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={gear_img} alt="gear_img" loading="lazy" width="100" height="100"/>
              </div>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Gears"
                menuVariant="dark"
                className='header-link'
              >
                <NavDropdown.Item href="/gears" >Gears</NavDropdown.Item>
                <NavDropdown.Item href="/engravings" >Engravings</NavDropdown.Item>
              </NavDropdown>
            </div>
            <Nav.Link className='nav-link nl-border' href="/tarots" >
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={tarot_img} alt="tarot_img" loading="lazy" width="100" height="100"/>
              </div>
              <div className='header-link'>
                Tarots
              </div>
            </Nav.Link>
            <div className='nav-link nl-border'>
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={stage_img} alt="stage_img" loading="lazy" width="100" height="100"/>
              </div>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Voyage"
                menuVariant="dark"
                className='header-link'
              >
                <NavDropdown.Item href="/enemies" >Bosses</NavDropdown.Item>
                <NavDropdown.Item href="" disabled >Puzzles</NavDropdown.Item>
                <NavDropdown.Item href="" disabled >Items & Terrain</NavDropdown.Item>
              </NavDropdown>
            </div>
            <Nav.Link className='nav-link nl-border' href="/events" >
              <div className='menu-icon-container'>
                <Image className='menu-icon' src={event_img} alt="event_img" loading="lazy" width="100" height="100"/>
              </div>
              <div className='header-link'>
                Events
              </div>
            </Nav.Link>
          </Nav>
          
          <a target="_blank" href="https://ko-fi.com/clouddropwiki" rel="noreferrer">
            <Image loading="lazy" className='discord-img m-1'  src={kofi} alt="kofi" width="521" height="101"/>
          </a>
          <a target="_blank" href="https://discord.gg/S3F95TpyMW" rel="noreferrer">
            <Image loading="lazy" className='discord-img m-1' src={discord} alt="discord" width="521" height="101"/>
          </a>

          {userData ?
          <AccountHeader userData={userData}  /> 
          : <SignIn />
          }

          </Navbar.Collapse>
        
        {/* <SearchBar /> */}

      </Container>
    </Navbar>
  );
}

export default HeaderComponent;