import Container from 'react-bootstrap/Container';
import EventsList from './Events/EventList';

function Home() {

  return (
    <Container className='new-container'>
      <EventsList />
    </Container>
  );
}

export default Home;