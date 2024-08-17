import React, {useState, useEffect} from 'react';
import { query, collection, onSnapshot, orderBy} from "firebase/firestore"; 
import db from '../firebase';
import Container from 'react-bootstrap/Container';
import EventsList from './Events/EventList';
import EventCalendar from './Events/EventCalendar';

function Home() {

  return (
    <Container className='new-container mt-2'>
      <div className='black-label-div'>
        Latest Events
      </div>
      <EventsList />
    </Container>
  );
}

export default Home;