import React, { useState, useEffect, useRef } from 'react';
import { query, collection, onSnapshot, orderBy} from "firebase/firestore"; 
import db from '../../firebase';
import {Container} from 'react-bootstrap';
import EventItem from './EventItem';

function EventsList() {
  const [events, setEvents] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/events`)), (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])


  return (
    <Container className='new-container'>
      {events&&(events.map(event => (
        <EventItem event={event} />
      )))}
    </Container>
  )
  
}

export default EventsList;