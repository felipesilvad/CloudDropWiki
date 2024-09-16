import React from 'react';
import {Container} from 'react-bootstrap';
import EventItem from './EventItem';

function EventsList({side, events}) {
  
  return (
    <Container className='new-container'>
      <div className='d-flex flex-wrap'>
        {events.map((event, i) => (
          <EventItem event={event} side={side} i={i} />
        ))}
      </div>
    </Container>
  )
  
}

export default EventsList;