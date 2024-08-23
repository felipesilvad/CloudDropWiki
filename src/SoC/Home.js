import React from 'react';
import {Helmet} from "react-helmet";
import Container from 'react-bootstrap/Container';
import EventsList from './Events/EventList';

function Home() {

  return (
    <Container className='new-container mt-2'>
      <Helmet>
        <title>Sword of Convallaria Wiki</title>
        <meta name="description" content="SoC Database, All Characters, Skills, Items, Stages, and Bosses Information." />
      </Helmet>
      <div className='black-label-div'>
        Latest Events
      </div>
      <EventsList />
    </Container>
  );
}

export default Home;