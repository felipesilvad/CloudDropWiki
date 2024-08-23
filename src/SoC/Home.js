import React from 'react';
import {Helmet} from "react-helmet";
import Container from 'react-bootstrap/Container';
import EventsList from './Events/EventList';

function Home() {
  const img = require('./assets/img/character_zzzhuoqiantest.png')

  return (
    <>
      <Helmet>
        <title>Sword of Convallaria Wiki</title>
        <meta name="description" content="SoC Database, All Characters, Skills, Items, Stages, and Bosses Information." />
      </Helmet>
      <div className='header-cool'>
        <div className='overlay-dark'></div>
      </div>
      <Container className='new-container mt-2'>
        <div className='black-label-div'>
          Latest Events
        </div>
        <EventsList />
      </Container>
    </>
  );
}

export default Home;