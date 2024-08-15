import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import EventsList from './Events/EventList';

function Home() {

  return (
    <Container className='new-container'>
      <EventsList />
    </Container>
  );
}

export default Home;