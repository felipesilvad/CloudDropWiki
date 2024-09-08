import React from 'react';
import {Container} from 'react-bootstrap';
import EventItem from './EventItem';

function EventsList({side, events}) {
  
  return (
    <Container className='new-container'>
      <div className='d-flex flex-wrap'>
        {events&&(events.map(event => (
          <EventItem event={event} side={side} />
        )))}
      </div>
    </Container>
  )
  
}

export default EventsList;